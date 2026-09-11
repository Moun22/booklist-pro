/**
 * Couvertures (v2.1) : generation d'une couverture SVG deterministe par livre,
 * et stockage des couvertures televersees par les libraires.
 *   GET    /covers/:fichier      -> image (svg generee ou fichier televerse)
 *   POST   /books/:id/cover      -> { image: "data:image/png;base64,..." }
 *   DELETE /books/:id/cover      -> retour a la couverture d'origine
 */
const fs = require('fs');
const path = require('path');

const DOSSIER = path.join(__dirname, '..', 'data', 'covers');
const TAILLE_MAX_OCTETS = 300 * 1024;
const TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

const TEINTES = [
  ['#1F3A5F', '#EAF0F7'],
  ['#5B2333', '#F7ECEF'],
  ['#2F4F3E', '#EBF3EE'],
  ['#6B4E16', '#F8F2E4'],
  ['#3D3A63', '#EEEDF6'],
  ['#4A4A4A', '#F1F1F1'],
];

function empreinte(texte) {
  let h = 0;
  for (const c of String(texte)) h = (h * 31 + c.charCodeAt(0)) % 2147483647;
  return h;
}

function echapper(texte) {
  return String(texte)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function couperEnLignes(texte, max = 14) {
  const lignes = [];
  let courante = '';
  for (const mot of String(texte).split(' ')) {
    if ((courante + ' ' + mot).trim().length > max && courante) {
      lignes.push(courante);
      courante = mot;
    } else {
      courante = (courante + ' ' + mot).trim();
    }
  }
  if (courante) lignes.push(courante);
  return lignes.slice(0, 4);
}

function genererSvg(livre) {
  const [fond, encre] = TEINTES[empreinte(livre.id) % TEINTES.length];
  const lignes = couperEnLignes(livre.titre);
  const titre = lignes
    .map((l, i) => `<text x="40" y="${200 + i * 44}" font-size="34">${echapper(l)}</text>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
<rect width="400" height="600" fill="${fond}"/>
<rect x="20" y="20" width="360" height="560" fill="none" stroke="${encre}" stroke-opacity="0.5" stroke-width="2"/>
<g fill="${encre}" font-family="Georgia, 'Times New Roman', serif" font-weight="bold">${titre}</g>
<text x="40" y="520" fill="${encre}" font-family="Helvetica, Arial, sans-serif" font-size="20">${echapper(livre.auteur)}</text>
<text x="40" y="552" fill="${encre}" fill-opacity="0.7" font-family="Helvetica, Arial, sans-serif" font-size="16">${echapper(livre.editeur || '')} ${livre.annee}</text>
</svg>`;
}

function cheminGenere(livre) {
  return `/covers/${livre.id}.svg`;
}

/**
 * Lit une image en data URL. Retourne { type, octets } ou { erreur, statut }.
 */
function lireDataUrl(image) {
  const correspondance = /^data:([a-z]+\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/i.exec(
    typeof image === 'string' ? image : '',
  );
  if (!correspondance) {
    return { statut: 422, erreur: 'validation', champs: { image: 'data URL base64 attendue' } };
  }
  const type = correspondance[1].toLowerCase();
  if (!TYPES[type]) {
    return {
      statut: 415,
      erreur: 'format_non_supporte',
      message: `Format ${type} refuse : png, jpeg ou webp attendu.`,
    };
  }
  const octets = Buffer.from(correspondance[2].replace(/\s/g, ''), 'base64');
  if (octets.length === 0) {
    return { statut: 422, erreur: 'validation', champs: { image: 'image vide' } };
  }
  if (octets.length > TAILLE_MAX_OCTETS) {
    return {
      statut: 413,
      erreur: 'image_trop_lourde',
      message: `Image de ${Math.round(octets.length / 1024)} Ko : ${TAILLE_MAX_OCTETS / 1024} Ko maximum. Redimensionnez avant l'envoi.`,
    };
  }
  return { type, octets };
}

function enregistrerFichier(livreId, type, octets) {
  fs.mkdirSync(DOSSIER, { recursive: true });
  supprimerFichiers(livreId);
  const nom = `${livreId}.${TYPES[type]}`;
  fs.writeFileSync(path.join(DOSSIER, nom), octets);
  return `/covers/${nom}`;
}

function supprimerFichiers(livreId) {
  if (!fs.existsSync(DOSSIER)) return;
  for (const nom of fs.readdirSync(DOSSIER)) {
    if (nom.startsWith(`${livreId}.`)) fs.unlinkSync(path.join(DOSSIER, nom));
  }
}

function lireFichier(nom) {
  if (!/^[A-Za-z0-9-]+\.(png|jpg|webp|svg)$/.test(nom)) return null;
  const chemin = path.join(DOSSIER, nom);
  if (!fs.existsSync(chemin)) return null;
  const extension = path.extname(nom).slice(1);
  const type = Object.keys(TYPES).find((t) => TYPES[t] === extension) || 'image/svg+xml';
  return { type, octets: fs.readFileSync(chemin) };
}

module.exports = {
  genererSvg,
  cheminGenere,
  lireDataUrl,
  enregistrerFichier,
  supprimerFichiers,
  lireFichier,
  TAILLE_MAX_OCTETS,
};
