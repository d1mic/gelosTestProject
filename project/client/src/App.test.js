import { render, screen } from '@testing-library/react';
import App from './App';
import Page404 from './components/ui/404';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Get ready to be entertained/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders 404 page', () => {
  render(<Page404></Page404>)
})
