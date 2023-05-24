import { render, screen } from '@testing-library/react';
import { AppFooter } from './Footer';

describe('AppFooter component', () => {
  it('renders the year text with the correct year value', () => {
    render(<AppFooter />);
    const yearTextElement = screen.getByText('©2023'); // Replace '©2023' with the expected year value
    expect(yearTextElement).toBeInTheDocument();
  });
});
