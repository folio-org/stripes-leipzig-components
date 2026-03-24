import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { MessageBanner } from '@folio/stripes/components';

import css from './NoPermissionMessage.css';

const NoPermissionMessage = ({ message, type = 'warning' }) => (
  <MessageBanner
    className={css.messageContainer}
    contentClassName={css.messageContent}
    type={type}
  >
    <h2><FormattedMessage id="stripes-smart-components.permissionError" /></h2>
    <p>{message ?? <FormattedMessage id="stripes-smart-components.permissionsDoNotAllowAccess" />}</p>
  </MessageBanner>
);

NoPermissionMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default NoPermissionMessage;
