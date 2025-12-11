import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  render,
  screen,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import RepeatableTextField from './RepeatableTextField';

const urlValidate = value => (/^https?:\/\//.test(value) ? undefined : 'Invalid URL');

const renderRepeatableTextField = (
  ariaLabel = '',
  initialValues = [''],
  fieldValidate = () => {},
  isRequired = false,
  mockPlaceholder = ''
) => render(
  <Form
    initialValues={{ testFields: initialValues }}
    mutators={{ ...arrayMutators }}
    onSubmit={() => {}}
    render={() => (
      <FieldArray name="testFields">
        {({ fields }) => (
          <RepeatableTextField
            ariaLabel={ariaLabel}
            fields={fields}
            fieldValidate={fieldValidate}
            isFirstFieldRequired={isRequired}
            placeholder={mockPlaceholder}
          />
        )}
      </FieldArray>
    )}
  />
);

describe('RepeatableTextField', () => {
  it('renders fields with correct aria-label and placeholder', async () => {
    renderRepeatableTextField('Textfield', [''], () => {}, false, 'Enter value');

    expect(screen.getByLabelText('Textfield #1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('clicking add button should create another textfield', async () => {
    renderRepeatableTextField('Textfield', [''], () => {}, false, 'Enter value');

    expect(screen.getByText(/add/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/add/i));

    expect(screen.getByLabelText('Textfield #1')).toBeInTheDocument();
    expect(screen.getByLabelText('Textfield #2')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Enter value')).toHaveLength(2);
  });

  it('shows required error only occurs once for the first field', async () => {
    renderRepeatableTextField('', ['', ''], urlValidate, true, 'Enter value');

    const inputs = screen.getAllByPlaceholderText('Enter value');

    await userEvent.click(inputs[0]);
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(/Required/i)).toBeInTheDocument();
    });

    await userEvent.click(inputs[1]);
    await userEvent.tab();

    // eslint-disable-next-line jest-dom/prefer-in-document
    expect(screen.getAllByText(/Required/i)).toHaveLength(1);
  });

  it('shows url error for invalid input', async () => {
    renderRepeatableTextField('', [''], urlValidate, false, 'Enter value');

    const input = screen.getAllByPlaceholderText('Enter value')[0];

    await userEvent.type(input, 'foo');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText('Invalid URL')).toBeInTheDocument();
    });
  });

  it('should render default props: empty placeholder and first field with trash', async () => {
    renderRepeatableTextField('', ['', '']);

    expect(screen.getAllByPlaceholderText('')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /trash/i })).toHaveLength(2);
  });

  it('removes field when trash button is clicked', async () => {
    renderRepeatableTextField('Textfield', ['first', 'second', 'third'], () => {}, false, 'Enter value');

    expect(screen.getByLabelText('Textfield #1')).toBeInTheDocument();
    expect(screen.getByLabelText('Textfield #2')).toBeInTheDocument();
    expect(screen.getByLabelText('Textfield #3')).toBeInTheDocument();

    // delete the second field
    const trashButtons = screen.getAllByRole('button', { name: /trash/i });
    await userEvent.click(trashButtons[1]);

    expect(screen.getByLabelText('Textfield #1')).toBeInTheDocument();
    expect(screen.getByLabelText('Textfield #2')).toBeInTheDocument();
    expect(screen.queryByLabelText('Textfield #3')).not.toBeInTheDocument();
  });

  it('custom validation is applied', async () => {
    renderRepeatableTextField('Textfield', ['', ''], urlValidate, false, 'Enter value');

    const inputs = screen.getAllByPlaceholderText('Enter value');

    await userEvent.type(inputs[1], 'no-valid-url');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText('Invalid URL')).toBeInTheDocument();
    });
  });
});
