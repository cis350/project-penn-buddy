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
import { getGroupById } from '../../api/groups';
import { rootURL } from "../../utils/utils";
import NewPost from '../../components/NewPost';

describe('test that destination is in document', () => {
  test('test that destionation is in the document', async () => {
    // render the component
    const { getHistory } = render(
      <MemoryRouter>
        <NewPost userId={1} />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const dest = screen.getByText(/Create Post/);
    expect(dest).toBeInTheDocument();
  });
});
