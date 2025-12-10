import { FormattedMessage } from 'react-intl';

const Required = value => {
  if (value !== null && value !== undefined && value !== '') {
    return undefined;
  }

  return <FormattedMessage id="stripes-leipzig-components.repeatableField.validateRequired" />;
};

export { Required };
