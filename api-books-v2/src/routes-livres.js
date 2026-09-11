const express = require('express');
const crypto = require('crypto');
const { charger, sauvegarder } = require('./db');
const { validerLivre, creerLivre, appliquerMaj, interroger, maintenant } = require('./livres');
const { authentifier, ecrivain } = require('./middleware');
const couvertures = require('./couvertures');

const routeur = express.Router();

// If-Match: <version> -> 409 si la version envoyee n'est plus celle du serveur.
function enConflit(req, res, actuel) {
  const ifMatch = req.headers['if-match'];
  if (ifMatch !== undefined && Number(String(ifMatch).replace(/"/g, '')) !== actuel.version) {
    res.status(409).json({
      erreur: 'conflit',
      message: 'Ce livre a ete modifie entre temps.',
      serveur: actuel,
      versionAttendue: actuel.version,
    });
    return true;
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* Livres                                                              */
/* ------------------------------------------------------------------ */

// GET /books?page=1&limit=20&q=&status=lu|nonlu&favori=true&sort=titre&order=asc
routeur.get('/books', authentifier(), (req, res) => {
  const { livres } = charger();
  res.json(interroger(livres, req.query));
});

routeur.get('/books/:id', authentifier(), (req, res) => {
  const livre = charger().livres.find((l) => l.id === req.params.id);
  if (!livre) return res.status(404).json({ erreur: 'introuvable', message: 'Livre inconnu.' });
  res.set('ETag', String(livre.version));
  res.json(livre);
});

routeur.post('/books', ecrivain(), (req, res) => {
  const { valeur, erreurs } = validerLivre(req.body ?? {});
  if (erreurs) return res.status(422).json({ erreur: 'validation', champs: erreurs });

  const db = charger();
  const livre = creerLivre(valeur);
  db.livres.push(livre);
  sauvegarder();

  res.status(201).set('ETag', String(livre.version)).json(livre);
});

// PUT /books/:id  —  If-Match: <version> pour la detection de conflit
function majLivre(req, res) {
  const db = charger();
  const index = db.livres.findIndex((l) => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ erreur: 'introuvable', message: 'Livre inconnu.' });

  const actuel = db.livres[index];
  if (enConflit(req, res, actuel)) return undefined;

  const partiel = req.method === 'PATCH';
  const { valeur, erreurs } = validerLivre(req.body ?? {}, partiel);
  if (erreurs) return res.status(422).json({ erreur: 'validation', champs: erreurs });

  const livreMaj = appliquerMaj(actuel, valeur);
  db.livres[index] = livreMaj;
  sauvegarder();

  return res.set('ETag', String(livreMaj.version)).json(livreMaj);
}

routeur.put('/books/:id', ecrivain(), majLivre);
routeur.patch('/books/:id', ecrivain(), majLivre);

routeur.delete('/books/:id', ecrivain(), (req, res) => {
  const db = charger();
  const index = db.livres.findIndex((l) => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ erreur: 'introuvable', message: 'Livre inconnu.' });

  db.livres.splice(index, 1);
  db.notes = db.notes.filter((n) => n.livreId !== req.params.id);
  couvertures.supprimerFichiers(req.params.id);
  sauvegarder();

  res.status(204).end();
});

/* ------------------------------------------------------------------ */
/* Couvertures (v2.1)                                                  */
/* ------------------------------------------------------------------ */

// Image generee ou televersee. Pas d'authentification : une balise <img> n'envoie pas de jeton.
routeur.get('/covers/:fichier', (req, res) => {
  const fichier = couvertures.lireFichier(req.params.fichier);
  if (fichier) {
    return res.type(fichier.type).set('Cache-Control', 'public, max-age=86400').send(fichier.octets);
  }
  const id = req.params.fichier.replace(/\.svg$/, '');
  const livre = req.params.fichier.endsWith('.svg') && charger().livres.find((l) => l.id === id);
  if (!livre) return res.status(404).json({ erreur: 'introuvable', message: 'Couverture inconnue.' });
  res
    .type('image/svg+xml')
    .set('Cache-Control', 'public, max-age=86400')
    .send(couvertures.genererSvg(livre));
});

// POST /books/:id/cover  { image: "data:image/jpeg;base64,..." }  If-Match facultatif
routeur.post('/books/:id/cover', ecrivain(), (req, res) => {
  const db = charger();
  const index = db.livres.findIndex((l) => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ erreur: 'introuvable', message: 'Livre inconnu.' });

  const actuel = db.livres[index];
  if (enConflit(req, res, actuel)) return undefined;

  const lecture = couvertures.lireDataUrl(req.body?.image);
  if (lecture.statut) {
    const { statut, ...corps } = lecture;
    return res.status(statut).json(corps);
  }

  const chemin = couvertures.enregistrerFichier(actuel.id, lecture.type, lecture.octets);
  const origine = actuel.couvertureOrigine === undefined ? actuel.couverture : actuel.couvertureOrigine;
  const livreMaj = appliquerMaj(actuel, { couverture: chemin, couvertureOrigine: origine });
  db.livres[index] = livreMaj;
  sauvegarder();

  return res.set('ETag', String(livreMaj.version)).json(livreMaj);
});

// DELETE /books/:id/cover : retire l'image televersee, retour a la couverture d'origine.
routeur.delete('/books/:id/cover', ecrivain(), (req, res) => {
  const db = charger();
  const index = db.livres.findIndex((l) => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ erreur: 'introuvable', message: 'Livre inconnu.' });

  const actuel = db.livres[index];
  if (enConflit(req, res, actuel)) return undefined;

  couvertures.supprimerFichiers(actuel.id);
  const origine = actuel.couvertureOrigine === undefined ? actuel.couverture : actuel.couvertureOrigine;
  const { couvertureOrigine, ...sansOrigine } = actuel;
  const livreMaj = appliquerMaj(sansOrigine, { couverture: origine });
  db.livres[index] = livreMaj;
  sauvegarder();

  return res.set('ETag', String(livreMaj.version)).json(livreMaj);
});

/* ------------------------------------------------------------------ */
/* Notes                                                               */
/* ------------------------------------------------------------------ */

routeur.get('/books/:id/notes', authentifier(), (req, res) => {
  const db = charger();
  if (!db.livres.some((l) => l.id === req.params.id)) {
    return res.status(404).json({ erreur: 'introuvable', message: 'Livre inconnu.' });
  }
  const notes = db.notes
    .filter((n) => n.livreId === req.params.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  res.json(notes);
});

routeur.post('/books/:id/notes', ecrivain(), (req, res) => {
  const db = charger();
  if (!db.livres.some((l) => l.id === req.params.id)) {
    return res.status(404).json({ erreur: 'introuvable', message: 'Livre inconnu.' });
  }

  const contenu = typeof req.body?.contenu === 'string' ? req.body.contenu.trim() : '';
  if (contenu.length === 0 || contenu.length > 1000) {
    return res.status(422).json({
      erreur: 'validation',
      champs: { contenu: 'contenu obligatoire, 1000 caracteres maximum' },
    });
  }

  const note = {
    id: crypto.randomUUID(),
    livreId: req.params.id,
    contenu,
    createdAt: maintenant(),
  };
  db.notes.push(note);
  sauvegarder();

  res.status(201).json(note);
});

routeur.delete('/books/:livreId/notes/:noteId', ecrivain(), (req, res) => {
  const db = charger();
  const index = db.notes.findIndex(
    (n) => n.id === req.params.noteId && n.livreId === req.params.livreId,
  );
  if (index === -1) return res.status(404).json({ erreur: 'introuvable', message: 'Note inconnue.' });

  db.notes.splice(index, 1);
  sauvegarder();
  res.status(204).end();
});

module.exports = routeur;
