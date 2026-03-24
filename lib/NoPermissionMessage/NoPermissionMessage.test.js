import { screen } from '@folio/jest-config-stripes/testing-library/react';

import renderWithIntlConfiguration from '../../test/jest/helpers/renderWithIntlConfiguration';
import NoPermissionMessage from './NoPermissionMessage';

jest.unmock('react-intl');

describe('NoPermissionMessage', () => {
  describe('default rendering', () => {
    beforeEach(() => {
      renderWithIntlConfiguration(<NoPermissionMessage />);
    });

    test('renders the permission error headline', () => {
      expect(screen.getByRole('heading', { name: /permission error/i })).toBeInTheDocument();
    });

    test('renders the default permission error message', () => {
      expect(screen.getByText(/Sorry - your permissions do not allow access to this page/i)).toBeInTheDocument();
    });

    test('renders with default type warning', () => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('custom rendering', () => {
    test('renders the custom message and type instead of the default values', () => {
      const customMessage = 'You need special access for this feature.';
      const customType = 'error';
      renderWithIntlConfiguration(<NoPermissionMessage message={customMessage} type={customType} />);

      expect(screen.getByText(customMessage)).toBeInTheDocument();
      expect(screen.queryByText(/Sorry - your permissions do not allow access to this page./i)).not.toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
