# DynamicSelectionFilterAccordion

A single-select filter group for search panes, meant for filter values that are loaded dynamically (e.g. from okapi) instead of being defined in a static filter config. It renders an [Accordion](https://github.com/folio-org/stripes-components/tree/main/lib/Accordion) together with a [Selection](https://github.com/folio-org/stripes-components/tree/main/lib/Selection) and wires both to the `activeFilters` and `filterHandlers` of `SearchAndSortQuery`. The accordion shows a clear button as soon as the group has an active filter.

The filter group is stored as an array like all other filter groups, but only ever holds the one selected value.


## Usage

```js
import { DynamicSelectionFilterAccordion } from '@folio/stripes-leipzig-components';

<DynamicSelectionFilterAccordion />

```


## Props
Name | type | description | default | required
--- | --- | --- | --- | ---
`activeFilters` | object | All active filters of the search pane, keyed by filter group. | `{}` | false
`dataOptions` | array | The options of this filter group, each `{ label, value }`. The label has to be a string. | `[]` | false
`filterHandlers` | object | The filter handlers of `SearchAndSortQuery`; `clearGroup` and `state` are used. | - | true
`filterKey` | string | Name of the filter group, e.g. `contact`. Also builds the accordion id `filter-accordion-${filterKey}` and the selection id `${filterKey}-filter`. | - | true
`label` | node | Label of the accordion, already translated. | - | true
`placeholder` | node | Shown in the selection as long as no option is selected. | `' '` | false

All further props are passed on to the underlying `Accordion`, e.g. `closedByDefault`.


## DynamicSelectionFilterAccordion example

```
  const contactOptions = (filterData.contacts || []).map(contact => ({
    value: contact.id,
    label: contact.name,
  }));

  <SearchAndSortQuery {...}>
    {({ activeFilters, getFilterHandlers }) => (
      <AccordionSet>
        <DynamicSelectionFilterAccordion
          activeFilters={activeFilters.state}
          dataOptions={contactOptions}
          filterHandlers={getFilterHandlers()}
          filterKey="contact"
          label={<FormattedMessage id="ui-my-module.filter.contact" />}
        />
      </AccordionSet>
    )}
  </SearchAndSortQuery>

```