import PropTypes from 'prop-types';

import {
  Accordion,
  FilterAccordionHeader,
  Selection,
} from '@folio/stripes/components';

const DynamicSelectionFilterAccordion = ({
  activeFilters = {},
  dataOptions = [],
  filterHandlers,
  filterKey,
  label,
  placeholder = ' ',
  ...props
}) => {
  const groupFilters = activeFilters[filterKey] || [];

  return (
    <Accordion
      displayClearButton={groupFilters.length > 0}
      header={FilterAccordionHeader}
      id={`filter-accordion-${filterKey}`}
      label={label}
      onClearFilter={() => { filterHandlers.clearGroup(filterKey); }}
      separator={false}
      {...props}
    >
      <Selection
        dataOptions={dataOptions}
        id={`${filterKey}-filter`}
        onChange={(value) => { filterHandlers.state({ ...activeFilters, [filterKey]: value ? [value] : [] }); }}
        placeholder={placeholder}
        value={groupFilters[0] || ''}
      />
    </Accordion>
  );
};

DynamicSelectionFilterAccordion.propTypes = {
  activeFilters: PropTypes.object,
  dataOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  filterHandlers: PropTypes.shape({
    clearGroup: PropTypes.func.isRequired,
    state: PropTypes.func.isRequired,
  }).isRequired,
  filterKey: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  placeholder: PropTypes.node,
};

export default DynamicSelectionFilterAccordion;
