import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/Navbar';

test('opens and closes the mobile menu', async () => {
  const user = userEvent.setup();
  render(<Navbar />);

  // mobile menu closed initially
  expect(screen.queryByText('D8', { selector: 'span' })).not.toBeInTheDocument();

  const openBtn = screen.getByRole('button');
  await user.click(openBtn);
  expect(screen.getByText('D8', { selector: 'span' })).toBeInTheDocument();

  const closeBtn = screen.getAllByRole('button')[1];
  await user.click(closeBtn);
  expect(screen.queryByText('D8', { selector: 'span' })).not.toBeInTheDocument();
});
