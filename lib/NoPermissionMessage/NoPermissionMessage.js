import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Headline,
  MessageBanner,
} from '@folio/stripes/components';

import css from './NoPermissionMessage.css';

const NoPermissionMessage = ({ className, message, type = 'warning' }) => (
  <MessageBanner
    className={className ?? css.messageStyling}
    type={type}
  >
    <Headline size="large" tag="h2"><FormattedMessage id="stripes-smart-components.permissionError" /></Headline>
    <p>{message ?? <FormattedMessage id="stripes-smart-components.permissionsDoNotAllowAccess" />}</p>
  </MessageBanner>
);

NoPermissionMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  type: PropTypes.string,
};

export default NoPermissionMessage;
