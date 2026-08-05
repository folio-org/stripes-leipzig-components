import { screen } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import renderWithIntlConfiguration from '../../test/jest/helpers/renderWithIntlConfiguration';
import CheckboxFilterAccordion from './CheckboxFilterAccordion';

const clearGroup = jest.fn();
const state = jest.fn();

const dataOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

const LABEL = 'Status';

const renderComponent = (props = {}) => renderWithIntlConfiguration(
  <CheckboxFilterAccordion
    activeFilters={{ status: ['active'] }}
    dataOptions={dataOptions}
    filterHandlers={{ clearGroup, state }}
    filterKey="status"
    label={LABEL}
    {...props}
  />
);

describe('CheckboxFilterAccordion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the label and all data options', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: new RegExp(LABEL) })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Inactive' })).toBeInTheDocument();
  });

  test('checks the options of the active filter group', () => {
    renderComponent();

    expect(screen.getByRole('checkbox', { name: 'Active' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Inactive' })).not.toBeChecked();
  });

  test('calls the state handler with the changed group', async () => {
    renderComponent();

    await userEvent.click(screen.getByRole('checkbox', { name: 'Inactive' }));

    expect(state).toHaveBeenCalledWith({ status: ['active', 'inactive'] });
  });

  test('keeps the other active filter groups untouched', async () => {
    renderComponent({ activeFilters: { status: [], type: ['journal'] } });

    await userEvent.click(screen.getByRole('checkbox', { name: 'Active' }));

    expect(state).toHaveBeenCalledWith({ status: ['active'], type: ['journal'] });
  });

  test('calls the clear handler for the filter group', async () => {
    renderComponent();

    await userEvent.click(screen.getByRole('button', { name: /clearFilterSetLabel/ }));

    expect(clearGroup).toHaveBeenCalledWith('status');
  });

  test('renders no clear button if the group has no active filters', () => {
    renderComponent({ activeFilters: {} });

    expect(screen.queryByRole('button', { name: /clearFilterSetLabel/ })).not.toBeInTheDocument();
  });

  test('passes further props on to the accordion', () => {
    renderComponent({ closedByDefault: true });

    expect(screen.getByRole('button', { name: new RegExp(LABEL) })).toHaveAttribute('aria-expanded', 'false');
  });
});
