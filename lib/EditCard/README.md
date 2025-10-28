# EditCard
## Usage

```js
import { EditCard } from '@folio/stripes-leipzig-components';

<EditCard />

```


## Props
Name | type | description | default | required
--- | --- | --- | --- | ---
`children` | node | The content inside the EditCard. | - | true
`deleteButtonTooltipText` | string | Text displayed as tooltip for the delete button | '' | false
`header` | string | Text displayed in the EditCard header | - | true
`onDelete` | func | Function will be executed when the delete button is clicked. If not provided, no delete button will be visible | undefined | false


## EditCard example

```
  const renderCards = () => {
    return fields.map((cards, index) => (
      <EditCard
        key={index}
        deleteButtonTooltipText={intl.formatMessage({ id: 'card.remove'})}
        header={intl.formatMessage({ id: 'card.title.singular', values={{ amount: index + 1 }}})}
        onDelete={() => fields.remove(index)}
      >
        <Field
          component={CardField}
          index={index}
          name={`${name}[${index}]`}
          selectCard={selectedCard => handleCardSelected(fields, index, selectedCard)}
        />
      </EditCard>
    ));
  };

  return (
    <div id="form-cards">
      {renderCards()}
    </div>
  );

```
