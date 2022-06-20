import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Get ready to be entertained/i);
  expect(linkElement).toBeInTheDocument();
});
