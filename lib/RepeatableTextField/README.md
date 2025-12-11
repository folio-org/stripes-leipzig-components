# RepeatableTextField

A helper component for rendering repeatable ([TextField](https://github.com/folio-org/stripes-components/tree/main/lib/TextField)) components using react-final-form-arrays.
The first input can be marked required and custom validation function can be defined.

![RepeatableTextField Screenshot](images/repeatableTextField.png)


## Props

Name | type | description | default | required
--- | --- | --- | --- | ---
`ariaLabel` | string | Aria-label applied to each input field | - | false
`isFirstFieldRequired` | boolean | Marks first field required and undeletable. Note: this does not create an initial field automatically. Set initialValues to [""] if you need an initial required field.  | false | false
`fields` | object | Fields array from react-final-form-arrays | - | true
`placeholder` | string | Placeholder text for each input | '' | false
`fieldValidate` | func | Custom validation function applied to each field | () => {} | false

## RepeatableTextField example with useFieldArray

```js
import { useFieldArray } from 'react-final-form-arrays';
import { RepeatableTextField } from '@folio/stripes-leipzig-components';

const initialValues = {
  repeatableTextField: [''], // ensures first field is visible
};

const { fields } = useFieldArray('repeatableTextField');

<RepeatableTextField
  fields={fields}
  isFirstFieldRequired
/>
```

## RepeatableTextField example with FieldArray

FieldArray requires a name prop to define the field array in the form state.

```js
import { FieldArray } from 'react-final-form';
import { RepeatableTextField } from '@folio/stripes-leipzig-components';

const ValidateUrl = value => {
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/;

  if (!value || urlRegex.test(value)) return undefined;
  return 'Valid url with http:// or https:// required!';
};

<FieldArray
  ariaLabel="Repeatable field"
  component={RepeatableTextField}
  fieldValidate={ValidateUrl}
  name="repeatableTextField"
  placeholder={intl.formatMessage({ id: 'ui-app.placeholder.repeatableTextField' })}
/>
```