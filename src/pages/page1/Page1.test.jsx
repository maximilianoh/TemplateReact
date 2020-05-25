import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Page1 from './Page1';

test('Test', async () => {
  const { queryAllByTestId, container } = render(<Page1 />);
  await waitFor(() => queryAllByTestId('Page1'));
  expect(container.textContent).toBe('page 1');
});

test('Test', async () => {
  const { queryAllByTestId, container } = render(<Page1 msg="Example" />);
  await waitFor(() => queryAllByTestId('Page1'));
  expect(container.textContent).toBe('Example');
});
