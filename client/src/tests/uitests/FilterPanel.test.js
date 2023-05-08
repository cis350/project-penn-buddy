/**
* @jest-environment jsdom
*/
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, fireEvent, cleanup, waitFor, act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FilterPanel from '../../components/FilterPanel.js';

afterEach(cleanup);

describe('FilterPanel', () => {
  const setSelectedLocations = jest.fn();
  const setSelectedDate = jest.fn();
  const setLocationKeyword = jest.fn();
  const props = {
    selectedLocations: new Set(),
    setSelectedLocations,
    selectedDate: null,
    setSelectedDate,
    setLocationKeyword,
    locationKeyword: null,
  };

  test('renders FilterPanel component', async () => {
    render(
      <MemoryRouter>
        <FilterPanel {...props} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Filter by:/)).toBeInTheDocument();
    expect(screen.getByText(/Main Airports:/)).toBeInTheDocument();
    expect(screen.getByText(/Other Destinations:/)).toBeInTheDocument();
    expect(screen.getByText(/Trip Date:/)).toBeInTheDocument();
  });

  test('checks and unchecks airport checkboxes', async () => {
    render(
      <MemoryRouter>
        <FilterPanel {...props} />
      </MemoryRouter>,
    );
    const jfkCheckbox = screen.getByLabelText('JFK Airport');
    const ewrCheckbox = screen.getByLabelText('EWR Airport');
    const phlCheckbox = screen.getByLabelText('PHL Airport');
    const ttnCheckbox = screen.getByLabelText('TTN Airport');

    fireEvent.click(jfkCheckbox);
    fireEvent.click(ewrCheckbox);
    fireEvent.click(phlCheckbox);
    fireEvent.click(ttnCheckbox);

    expect(jfkCheckbox.checked).toBe(true);
    expect(ewrCheckbox.checked).toBe(true);
    expect(phlCheckbox.checked).toBe(true);
    expect(ttnCheckbox.checked).toBe(true);

    fireEvent.click(jfkCheckbox);
    fireEvent.click(ewrCheckbox);
    fireEvent.click(phlCheckbox);
    fireEvent.click(ttnCheckbox);

    expect(jfkCheckbox.checked).toBe(false);
    expect(ewrCheckbox.checked).toBe(false);
    expect(phlCheckbox.checked).toBe(false);
    expect(ttnCheckbox.checked).toBe(false);
  });

  test('fills in the destination text field', async () => {
    render(
      <MemoryRouter>
        <FilterPanel {...props} />
      </MemoryRouter>,
    );

    const destinationInput = screen.getByLabelText(/Destination/);

    fireEvent.change(destinationInput, { target: { value: 'Test Location' } });
    expect(destinationInput.value).toBe('Test Location');
  });

  test('fills in the date text field with valid date', async () => {
    render(
      <MemoryRouter>
        <FilterPanel {...props} />
      </MemoryRouter>,
    );

    const dateInput = screen.getByLabelText(/MM-DD-YYYY/);

    fireEvent.change(dateInput, { target: { value: '04-10-2023' } });
    expect(dateInput.value).toBe('04-10-2023');
  });
});
