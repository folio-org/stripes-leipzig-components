import { FormattedMessage } from 'react-intl';

import { screen } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import renderWithIntlConfiguration from '../../test/jest/helpers/renderWithIntlConfiguration';
import DynamicSelectionFilterAccordion from './DynamicSelectionFilterAccordion';

const clearGroup = jest.fn();
const state = jest.fn();

const dataOptions = [
  { label: 'Source A', value: 'source-a' },
  { label: 'Source B', value: 'source-b' },
];

const LABEL = 'Metadata source';

const renderComponent = (props = {}) => renderWithIntlConfiguration(
  <DynamicSelectionFilterAccordion
    activeFilters={{ mdSource: ['source-a'] }}
    dataOptions={dataOptions}
    filterHandlers={{ clearGroup, state }}
    filterKey="mdSource"
    label={LABEL}
    {...props}
  />
);

const getSelection = () => document.getElementById('mdSource-filter');
const openSelection = () => userEvent.click(getSelection());

describe('DynamicSelectionFilterAccordion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the label and all data options', async () => {
    renderComponent();

    expect(screen.getByRole('button', { name: new RegExp(LABEL) })).toBeInTheDocument();

    await openSelection();

    expect(screen.getByRole('option', { name: 'Source A' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Source B' })).toBeInTheDocument();
  });

  test('shows the option of the active filter group', () => {
    renderComponent();

    expect(getSelection()).toHaveTextContent('Source A');
  });

  test('calls the state handler with the selected value', async () => {
    renderComponent();

    await openSelection();
    await userEvent.click(screen.getByRole('option', { name: 'Source B' }));

    expect(state).toHaveBeenCalledWith({ mdSource: ['source-b'] });
  });

  test('keeps the other active filter groups untouched', async () => {
    renderComponent({ activeFilters: { mdSource: [], type: ['journal'] } });

    await openSelection();
    await userEvent.click(screen.getByRole('option', { name: 'Source A' }));

    expect(state).toHaveBeenCalledWith({ mdSource: ['source-a'], type: ['journal'] });
  });

  test('calls the clear handler for the filter group', async () => {
    renderComponent();

    await userEvent.click(screen.getByRole('button', { name: /clearFilterSetLabel/ }));

    expect(clearGroup).toHaveBeenCalledWith('mdSource');
  });

  test('renders no clear button if the group has no active filters', () => {
    renderComponent({ activeFilters: {} });

    expect(screen.queryByRole('button', { name: /clearFilterSetLabel/ })).not.toBeInTheDocument();
  });

  test('renders no option as selected if activeFilters is omitted', () => {
    renderComponent({ activeFilters: undefined });

    expect(getSelection()).not.toHaveTextContent('Source A');
    expect(screen.queryByRole('button', { name: /clearFilterSetLabel/ })).not.toBeInTheDocument();
  });

  test('adds the selected value to an empty filter group', async () => {
    renderComponent({ activeFilters: undefined });

    await openSelection();
    await userEvent.click(screen.getByRole('option', { name: 'Source A' }));

    expect(state).toHaveBeenCalledWith({ mdSource: ['source-a'] });
  });

  test('renders an empty selection if the filter group has no options', async () => {
    renderComponent({ dataOptions: [] });

    expect(screen.getByRole('button', { name: new RegExp(LABEL) })).toBeInTheDocument();

    await openSelection();

    // the selection falls back to its empty message
    expect(screen.getByRole('option')).toHaveTextContent('--');
    expect(screen.queryByRole('option', { name: 'Source A' })).not.toBeInTheDocument();
  });

  test('renders without dataOptions, as they may still be loading', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    renderComponent({ dataOptions: undefined });

    expect(screen.getByRole('button', { name: new RegExp(LABEL) })).toBeInTheDocument();
    expect(consoleError).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });

  test('shows the placeholder as long as no option is selected', () => {
    renderComponent({ activeFilters: undefined, placeholder: 'Select a contact' });

    expect(getSelection()).toHaveTextContent('Select a contact');
  });

  test('hides the placeholder once an option is selected', () => {
    renderComponent({ placeholder: 'Select a contact' });

    expect(getSelection()).toHaveTextContent('Source A');
    expect(getSelection()).not.toHaveTextContent('Select a contact');
  });

  test('accepts a node as label', () => {
    renderComponent({ label: <FormattedMessage id="ui-my-module.filter.mdSource" /> });

    expect(screen.getByRole('button', { name: /ui-my-module.filter.mdSource/ })).toBeInTheDocument();
  });

  test('passes further props on to the accordion', () => {
    renderComponent({ closedByDefault: true });

    expect(screen.getByRole('button', { name: new RegExp(LABEL) })).toHaveAttribute('aria-expanded', 'false');
  });
});
