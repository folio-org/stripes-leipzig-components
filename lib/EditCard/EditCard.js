import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  Card,
  IconButton,
  Tooltip,
} from '@folio/stripes/components';

const EditCard = ({
  children,
  deleteButtonTooltipText = '',
  header,
  onDelete,
}) => {
  const intl = useIntl();

  const arialLabel = useMemo(
    () => intl.formatMessage({ id: 'stripes-leipzig-components.editCard.delete.card' }), [intl]
  );
  const tooltipId = useMemo(() => uniqueId(`${arialLabel}-`), [arialLabel]);

  const renderDeleteButton = () => {
    return (
      deleteButtonTooltipText ?
        <Tooltip
          id={tooltipId}
          text={deleteButtonTooltipText}
        >
          {({ ref, ariaIds }) => (
            <IconButton
              ref={ref}
              aria-labelledby={ariaIds.text}
              icon="trash"
              onClick={onDelete}
            />
          )}
        </Tooltip>
        :
        <IconButton
          aria-label={arialLabel}
          icon="trash"
          onClick={onDelete}
        />
    );
  };

  return (
    <Card
      headerEnd={onDelete ? renderDeleteButton() : undefined}
      headerStart={<strong>{header}</strong>}
    >
      {children}
    </Card>
  );
};

EditCard.propTypes = {
  children: PropTypes.node.isRequired,
  deleteButtonTooltipText: PropTypes.string,
  header: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default EditCard;
