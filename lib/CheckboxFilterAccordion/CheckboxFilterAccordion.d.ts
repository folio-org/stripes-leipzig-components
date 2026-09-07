import {
  ReactElement,
  ReactNode,
} from 'react';

import {
  AccordionProps,
  FilterAccordionHeaderProps,
} from '@folio/stripes/components';

export type CheckboxFilterAccordionProps<ValueType extends string | number = string> =
  Omit<AccordionProps<FilterAccordionHeaderProps>, 'children' | 'label'> & {
    /** All active filters of the search pane, keyed by filter group */
    activeFilters?: Record<string, ValueType[]>;
    /**
     * The selectable options of this filter group. `label` is deliberately wider than the
     * `string` in stripes-types -- `CheckboxFilter` does accept a node.
     */
    dataOptions?: {
      value: NoInfer<ValueType>;
      label: ReactNode;
      readOnly?: boolean;
      disabled?: boolean;
    }[];
    /** The filter handlers of `SearchAndSortQuery`, i.e. `getFilterHandlers()` */
    filterHandlers: {
      /** Clears all active filters of the given group */
      clearGroup: (filterKey: string) => void;
      /** Replaces the complete filter state */
      state: (filters: Record<string, ValueType[]>) => void;
    };
    /** Name of the filter group, e.g. `status`; also builds the accordion id `filter-accordion-${filterKey}` */
    filterKey: string;
    /** Label of the accordion, already translated */
    label: ReactNode;
  };

/**
 * A checkbox filter group for search panes, wired to the `activeFilters` and
 * `filterHandlers` of `SearchAndSortQuery`.
 *
 * `ValueType` is inferred from `activeFilters`/`filterHandlers` and defaults to `string`;
 * pass it explicitly for numeric filter values.
 * @example
 * <SearchAndSortQuery {...}>
 *   {({ activeFilters, getFilterHandlers }) => (
 *     <AccordionSet>
 *       <CheckboxFilterAccordion
 *         activeFilters={activeFilters.state}
 *         dataOptions={statusOptions}
 *         filterHandlers={getFilterHandlers()}
 *         filterKey="status"
 *         label={<FormattedMessage id="ui-my-module.filter.status" />}
 *       />
 *     </AccordionSet>
 *   )}
 * </SearchAndSortQuery>
 *
 * In a separate filter component both props usually arrive already unwrapped -- pass them
 * through as they are.
 */
declare function CheckboxFilterAccordion<ValueType extends string | number = string>(
  props: CheckboxFilterAccordionProps<ValueType>
): ReactElement;

export default CheckboxFilterAccordion;
