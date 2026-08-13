import PropTypes from 'prop-types';

import {
  Accordion,
  FilterAccordionHeader,
} from '@folio/stripes/components';
import { CheckboxFilter } from '@folio/stripes/smart-components';

const CheckboxFilterAccordion = ({
  activeFilters = {},
  dataOptions = [],
  filterHandlers,
  filterKey,
  label,
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
      <CheckboxFilter
        dataOptions={dataOptions}
        name={filterKey}
        onChange={(group) => { filterHandlers.state({ ...activeFilters, [group.name]: group.values }); }}
        selectedValues={groupFilters}
      />
    </Accordion>
  );
};

CheckboxFilterAccordion.propTypes = {
  activeFilters: PropTypes.object,
  dataOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  filterHandlers: PropTypes.shape({
    clearGroup: PropTypes.func.isRequired,
    state: PropTypes.func.isRequired,
  }).isRequired,
  filterKey: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
};

export default CheckboxFilterAccordion;
