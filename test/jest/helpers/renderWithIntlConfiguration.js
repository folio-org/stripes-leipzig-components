import { IntlProvider } from 'react-intl';

import { render } from '@folio/jest-config-stripes/testing-library/react';
import stripesComponentsTranslations from '@folio/stripes-components/translations/stripes-components/en';
// eslint-disable-next-line max-len
import stripesSmartComponentsTranslations from '@folio/stripes-smart-components/translations/stripes-smart-components/en';

import localTranslations from '../../../translations/stripes-leipzig-components/en';

const translationSets = [
  {
    prefix: 'stripes-leipzig-components',
    translations: localTranslations,
  },
  {
    prefix: 'stripes-components',
    translations: stripesComponentsTranslations,
  },
  {
    prefix: 'stripes-smart-components',
    translations: stripesSmartComponentsTranslations,
  },
];

function renderWithIntlConfiguration(children, locale = 'en') {
  const allTranslations = {};

  translationSets.forEach((set) => {
    const { prefix, translations } = set;
    Object.keys(translations).forEach(key => {
      allTranslations[`${prefix}.${key}`] = translations[key];
    });
  });

  return render(
    <IntlProvider locale={locale} messages={allTranslations}>
      {children}
    </IntlProvider>
  );
}

export default renderWithIntlConfiguration;
