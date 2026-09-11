import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { ErreurAuth } from '@/domain/erreurs';
import { FormulaireConnexion } from '@/features/auth/FormulaireConnexion';

describe('FormulaireConnexion', () => {
  it('names the empty fields and sends nothing', async () => {
    const onConnexion = jest.fn(async () => {});
    await renderWithTheme(<FormulaireConnexion onConnexion={onConnexion} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Se connecter' }));

    expect(await screen.findByText("L'email est obligatoire")).toBeTruthy();
    expect(screen.getByText('Le mot de passe est obligatoire')).toBeTruthy();
    expect(onConnexion).not.toHaveBeenCalled();
  });

  it('submits the trimmed email and the password as typed', async () => {
    const onConnexion = jest.fn(async () => {});
    await renderWithTheme(<FormulaireConnexion onConnexion={onConnexion} />);

    await fireEvent.changeText(screen.getByLabelText('Email'), ' editeur@booklist.fr ');
    await fireEvent.changeText(screen.getByLabelText('Mot de passe'), 'editeur123');
    await fireEvent.press(screen.getByRole('button', { name: 'Se connecter' }));

    await waitFor(() =>
      expect(onConnexion).toHaveBeenCalledWith('editeur@booklist.fr', 'editeur123'),
    );
  });

  it('shows a refused login in words, without revealing which field is wrong', async () => {
    const onConnexion = jest.fn(async () => {
      throw new ErreurAuth('identifiants_invalides', 'Email ou mot de passe incorrect.', 401);
    });
    await renderWithTheme(<FormulaireConnexion onConnexion={onConnexion} />);

    await fireEvent.changeText(screen.getByLabelText('Email'), 'x@y.z');
    await fireEvent.changeText(screen.getByLabelText('Mot de passe'), 'faux');
    await fireEvent.press(screen.getByRole('button', { name: 'Se connecter' }));

    expect(await screen.findByText(/Email ou mot de passe incorrect/)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeTruthy();
  });
});
