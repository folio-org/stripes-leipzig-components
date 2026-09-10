import {
  ReactElement,
  ReactNode,
} from 'react';

import {
  AccordionProps,
  FilterAccordionHeaderProps,
} from '@folio/stripes/components';

export type DynamicSelectionFilterAccordionProps<ValueType extends string | number = string> =
  Omit<AccordionProps<FilterAccordionHeaderProps>, 'children' | 'label'> & {
    /** All active filters of the search pane, keyed by filter group */
    activeFilters?: Record<string, ValueType[]>;
    /**
     * The selectable options of this filter group, usually loaded from the backend.
     * `label` has to be a string, because the underlying `Selection` filters on it.
     */
    dataOptions?: {
      value: NoInfer<ValueType>;
      label: string;
    }[];
    /** The filter handlers of `SearchAndSortQuery`, i.e. `getFilterHandlers()` */
    filterHandlers: {
      /** Clears all active filters of the given group */
      clearGroup: (filterKey: string) => void;
      /** Replaces the complete filter state */
      state: (filters: Record<string, ValueType[]>) => void;
    };
    /**
     * Name of the filter group, e.g. `contact`; also builds the accordion id
     * `filter-accordion-${filterKey}` and the selection id `${filterKey}-filter`
     */
    filterKey: string;
    /** Label of the accordion, already translated */
    label: ReactNode;
    /** Shown in the selection as long as no option is selected; defaults to a single space */
    placeholder?: ReactNode;
  };

/**
 * A single-select filter group for search panes, meant for filter values that are loaded
 * dynamically; wired to the `activeFilters` and `filterHandlers` of `SearchAndSortQuery`.
 * The filter group is stored as an array, but only ever holds the one selected value.
 *
 * `ValueType` is inferred from `activeFilters`/`filterHandlers` and defaults to `string`;
 * pass it explicitly for numeric filter values.
 * @example
 * <SearchAndSortQuery {...}>
 *   {({ activeFilters, getFilterHandlers }) => (
 *     <AccordionSet>
 *       <DynamicSelectionFilterAccordion
 *         activeFilters={activeFilters.state}
 *         dataOptions={contactOptions}
 *         filterHandlers={getFilterHandlers()}
 *         filterKey="contact"
 *         label={<FormattedMessage id="ui-my-module.filter.contact" />}
 *       />
 *     </AccordionSet>
 *   )}
 * </SearchAndSortQuery>
 *
 * In a separate filter component both props usually arrive already unwrapped -- pass them
 * through as they are.
 */
declare function DynamicSelectionFilterAccordion<ValueType extends string | number = string>(
  props: DynamicSelectionFilterAccordionProps<ValueType>
): ReactElement;

export default DynamicSelectionFilterAccordion;
