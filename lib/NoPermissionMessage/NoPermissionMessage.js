import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Headline,
  Layout,
  MessageBanner,
} from '@folio/stripes/components';

import css from './NoPermissionMessage.css';

const NoPermissionMessage = ({ message, type = 'warning' }) => (

  <MessageBanner
    className={css.messageContainer}
    type={type}
  >
    <Layout className="textCentered centerContent">
      <Headline size="large" tag="h2"><FormattedMessage id="stripes-smart-components.permissionError" /></Headline>
      <p>{message ?? <FormattedMessage id="stripes-smart-components.permissionsDoNotAllowAccess" />}</p>
    </Layout>
  </MessageBanner>
);

NoPermissionMessage.propTypes = {
  message: PropTypes.node,
  type: PropTypes.string,
};

export default NoPermissionMessage;
