/**
* @jest-environment jsdom
*/
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import History from '../../pages/History';
import { getGroupById } from '../../api/groups';
import { rootURL } from "../../utils/utils";

describe('test that destination is in document', () => {
  test('test that destionation is in the document', async () => {
    // render the component
    const { getHistory } = render(
      <MemoryRouter>
        <History userId={1} />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const dest = screen.getByText(/History/);
    expect(dest).toBeInTheDocument();
  });
});
