import { render, screen } from '@testing-library/react';
import { ErrorIcon } from './404';

describe('ErrorIcon component', () => {
  it('renders without errors', () => {
    render(<ErrorIcon />);
    const errorIconElement = screen.getByTestId('error-icon');
    expect(errorIconElement).toBeInTheDocument();
  });
});
