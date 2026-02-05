# Monthpicker
## Usage

```js
import { Monthpicker } from '@folio/stripes-leipzig-components';

<Monthpicker />

```


## Props
Name | type | description | default | required
--- | --- | --- | --- | ---
`backendDateFormat` | string | Format for saving year and month.<ul><li>Year: 4 digits (`yyyy`)</li><li>Month: 2 digits (`MM`)</li></ul> | 'yyyy-MM' | false
`dateFormat` | string | Format for display year and month.<ul><li>Year: 4 digits (`yyyy`)</li><li>Month: 2 digits (`MM`)</li></ul> | Intl.DateTimeFormat(intl.locale, { year: 'numeric', month: '2-digit' }) | false
`isRequired` | bool | If true, TextField (containing year and month) will be required | false | false
`name`| string | Name of the field, required for form integration | "" | true |
`textLabel` | string | Visible field label | "" | false


## Validation
- If `isRequired` is true, leaving the field empty will trigger a "required" error.
- Invalid input of month/year (depending on the `dateFormat` or on generated format based on intl.local) will trigger a "date invalid" error.
  - generated format:
  ```
  new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(new Date())
  ```


## Monthpicker example

```
<Monthpicker
  backendDateFormat="yyyy-MM"
  dateFormat="MM/yyyy"
  isRequired
  name="fieldName"
  textLabel="Label Monthpicker"
/>
```

## Monthpicker example using Redux-form/Final Form

```
import { Form } from 'react-final-form';

<Form
  onSubmit={onSubmit}
  render={({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <Monthpicker
        backendDateFormat="yyyy-MM"
        dateFormat="MM.yyyy"
        name="startMonth"
        textLabel="Start Month"
      />
      <button type="submit">Submit</button>
    </form>
  )}
/>
```
