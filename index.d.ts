/*
 * Only CheckboxFilterAccordion and DynamicSelectionFilterAccordion are typed so far.
 *
 * As soon as all type declarations for all stripes-leipzig-components are available, this file
 * can be removed and the exports moved to their respective component files.
 * Until then, this file is a workaround to avoid TypeScript errors in consuming modules.
 */

export {
  default as CheckboxFilterAccordion,
  CheckboxFilterAccordionProps,
} from './lib/CheckboxFilterAccordion';
export {
  default as DynamicSelectionFilterAccordion,
  DynamicSelectionFilterAccordionProps,
} from './lib/DynamicSelectionFilterAccordion';
