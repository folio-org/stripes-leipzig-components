# RepeatableField

A helper component for rendering repeatable form inputs using react-final-form-arrays.
The first input can be marked required and custom validation function can be defined.

## Props

Name | type | description | default | required
--- | --- | --- | --- | ---
`ariaLabel` | string | Aria-label applied to each input field | - | false
`isFirstFieldRequired` | boolean | Marks first field required and undeletable. Note: this does not create an initial field automatically. Set initialValues to [""] if you need an initial required field.  | false | false
`fields` | object | Fields array from react-final-form-arrays | - | true
`placeholder` | string | Placeholder text for each input | '' | false
`fieldValidate` | func | Custom validation function applied to each field | () => {} | false

## RepeatableField example with useFieldArray

```js
import { useFieldArray } from 'react-final-form-arrays';
import { RepeatableField } from '@folio/stripes-leipzig-components';

const initialValues = {
  repeatableField: [''], // ensures first field is visible
};

const { fields } = useFieldArray('repeatableField');

<RepeatableField
  fields={fields}
  isFirstFieldRequired
/>
```

## RepeatableField example with FieldArray

FieldArray requires a name prop to define the field array in the form state.

```js
import { FieldArray } from 'react-final-form';
import { RepeatableField } from '@folio/stripes-leipzig-components';

const ValidateUrl = value => {
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/;

  if (!value || urlRegex.test(value)) return undefined;
  return 'Valid url with http:// or https:// required!';
};

<FieldArray
  ariaLabel="Repeatable field"
  component={RepeatableField}
  fieldValidate={ValidateUrl}
  name="repeatableField"
  placeholder={intl.formatMessage({ id: 'ui-app.placeholder.repeatableField' })}
/>
```