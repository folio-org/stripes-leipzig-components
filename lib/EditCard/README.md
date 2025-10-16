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
`deleteButtonTooltipText` | node | Text displayed as tooltip for the delete button | undefined | false
`header` | node | Text displayed in the EditCard header | - | true
`onDelete` | func | Function will be executed when the delete button is clicked. If not provided, no delete button will be visible | undefined | false


## EditCard example

```
  const renderCards = () => {
    return fields.map((cards, index) => (
      <EditCard
        key={index}
        deleteButtonTooltipText={<FormattedMessage id="card.remove" />}
        header={<FormattedMessage id="card.title.singular" values={{ amount: index + 1 }} />}
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
