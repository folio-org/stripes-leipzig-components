/*
 * Compile-time only: makes sure the declarations of the filter accordions stay usable the
 * way the UI modules use them. Never executed -- `yarn typecheck` is the assertion.
 */
import {
  CheckboxFilterAccordion,
  CheckboxFilterAccordionProps,
  DynamicSelectionFilterAccordion,
  DynamicSelectionFilterAccordionProps,
} from '../..';

type ActiveFilters = Record<string, string[]>;

interface FilterHandlers {
  clearGroup: (key: string) => void;
  state: (filters: ActiveFilters) => void;
}

declare const activeFilters: ActiveFilters;
declare const filterHandlers: FilterHandlers;

type NumericActiveFilters = Record<string, number[]>;

declare const numericActiveFilters: NumericActiveFilters;
declare const numericFilterHandlers: {
  clearGroup: (key: string) => void;
  state: (filters: NumericActiveFilters) => void;
};

export const Minimal = () => (
  <CheckboxFilterAccordion
    filterHandlers={filterHandlers}
    filterKey="status"
    label="Status"
  />
);

export const Checkbox = () => (
  <CheckboxFilterAccordion
    activeFilters={activeFilters}
    dataOptions={[{ value: 'active', label: 'Active' }]}
    filterHandlers={filterHandlers}
    filterKey="status"
    label={<span>Status</span>}
  />
);

export const Dynamic = () => (
  <DynamicSelectionFilterAccordion
    activeFilters={activeFilters}
    dataOptions={[{ value: 'abc', label: 'Some contact' }]}
    filterHandlers={filterHandlers}
    filterKey="contact"
    label="Contact"
    placeholder="Select a contact"
  />
);

/** Accordion props are passed through */
export const PassedThrough = () => (
  <CheckboxFilterAccordion
    closedByDefault
    filterHandlers={filterHandlers}
    filterKey="status"
    id="my-own-id"
    label="Status"
    separator
  />
);

/** Numeric filter values need an explicit type argument */
export const Numeric = () => (
  <DynamicSelectionFilterAccordion<number>
    activeFilters={numericActiveFilters}
    dataOptions={[{ value: 2024, label: '2024' }]}
    filterHandlers={numericFilterHandlers}
    filterKey="year"
    label="Year"
  />
);

/** dataOptions labels may be nodes, as shown in the README */
export const NodeLabels = () => (
  <CheckboxFilterAccordion
    activeFilters={activeFilters}
    dataOptions={[{ value: 'active', label: <b>Active</b> }]}
    filterHandlers={filterHandlers}
    filterKey="status"
    label="Status"
  />
);

/** The prop types are exported for consumers that wrap the components */
export type WrapperProps = CheckboxFilterAccordionProps & DynamicSelectionFilterAccordionProps;

/*
 * Negative cases: each line must stay an error. If a declaration silently degrades to `any`
 * -- which is what a broken import inside a .d.ts does while `skipLibCheck` is on -- the error
 * disappears and TypeScript reports the unused directive instead.
 */
// @ts-expect-error unknown props are rejected
export const Unknown = () => <CheckboxFilterAccordion filterHandlers={filterHandlers} filterKey="s" label="l" nope />;
// @ts-expect-error filterHandlers is required
export const MissingHandlers = () => <CheckboxFilterAccordion filterKey="s" label="l" />;
// @ts-expect-error filterKey is required
export const MissingKey = () => <CheckboxFilterAccordion filterHandlers={filterHandlers} label="l" />;
export const WithChildren = () => (
  // @ts-expect-error children are supplied by the component
  <CheckboxFilterAccordion filterHandlers={filterHandlers} filterKey="s" label="l">
    <i>nope</i>
  </CheckboxFilterAccordion>
);
