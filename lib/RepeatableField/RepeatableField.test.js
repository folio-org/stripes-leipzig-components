import { Form } from 'react-final-form';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import RepeatableField from './RepeatableField';

function createMockFields(initialCount = 1) {
  let fields = Array.from({ length: initialCount }, (_, i) => `field${i}`);
  return {
    map: (cb) => fields.map((name, i) => cb(name, i)),
    remove: jest.fn((index) => fields.splice(index, 1)),
    push: jest.fn(() => {
      const newName = `field${fields.length}`;
      fields.push(newName);
      return newName;
    }),
    getFields: () => fields,
    reset: (count = 1) => { fields = Array.from({ length: count }, (_, i) => `field${i}`); },
  };
}

const urlValidate = value => (/^https?:\/\//.test(value) ? undefined : 'Invalid URL');

const renderRepeatableField = (mockFields, fieldValidate, isRequired, mockPlaceholder) => render(
  <Form
    onSubmit={() => {}}
    render={() => (
      <RepeatableField
        ariaLabel="Test"
        fields={mockFields}
        fieldValidate={fieldValidate}
        isFirstFieldRequired={isRequired}
        placeholder={mockPlaceholder}
      />
    )}
  />
);

describe('RepeatableField', () => {
  it('renders fields and add button', () => {
    renderRepeatableField(createMockFields(1), () => {}, false, 'Enter value');

    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  it('shows required error only occurs once for the first field', async () => {
    const generatedMockFields = createMockFields(2);
    renderRepeatableField(generatedMockFields, urlValidate, true, 'Enter value');

    const inputs = screen.getAllByPlaceholderText('Enter value');
    await userEvent.click(inputs[0]);
    await userEvent.tab();

    expect(screen.getByText(/Required/i)).toBeInTheDocument();

    await userEvent.click(inputs[1]);
    await userEvent.tab();
    // eslint-disable-next-line jest-dom/prefer-in-document
    expect(screen.getAllByText(/Required/i)).toHaveLength(1);
  });

  it('shows url error for invalid input', async () => {
    renderRepeatableField(createMockFields(1), urlValidate, false, 'Enter value');

    const input = screen.getAllByPlaceholderText('Enter value')[0];
    await userEvent.type(input, 'foo');
    await userEvent.tab();

    expect(screen.getByText('Invalid URL')).toBeInTheDocument();
  });

  it('should render default props: empty placeholder and first field with trash ', async () => {
    renderRepeatableField(createMockFields(2));

    expect(screen.getAllByPlaceholderText('')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /trash/i })).toHaveLength(2);
  });
});
