import React from 'react';
import '@testing-library/jest-dom/extend-expect';

// import testing library functions
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import Profile from '../../pages/Profile';
import Post from "../../pages/Post";

test('test that Welcome to Your Profile! is in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter initialEntries={[`/group/3`]}>
      <Post name="Nicky" userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Welcome to Your Profile!/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});
