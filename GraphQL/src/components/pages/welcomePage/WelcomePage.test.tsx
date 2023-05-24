import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';
import WelcomePage from './WelcomePage';
import { render, screen } from '@/utils/test-utils';
// Create a mock Redux store
const mockStore = setupStore();

describe('WelcomePage component', () => {
  it('renders the main title with the correct text', () => {
    render(
      <Provider store={mockStore}>
        <WelcomePage />
      </Provider>
    );
    const titleElement = screen.getByTestId('main_title');
    const commonText = screen.getByTestId('common');
    expect(titleElement).not.toBeNull();
    expect(commonText).not.toBeNull();
  });

  it('renders the GraphQL section with the correct content', () => {
    render(
      <Provider store={mockStore}>
        <WelcomePage />
      </Provider>
    );
    const graphQLSection = screen.getByTestId('graph');
    const graphQLDescription = screen.getByTestId('graph-desc');
    expect(graphQLSection).toBeInTheDocument();
    expect(graphQLDescription).toBeInTheDocument();
  });

  it('renders the RS School section with the correct content', () => {
    render(
      <Provider store={mockStore}>
        <WelcomePage />
      </Provider>
    );
    const rsSchoolSection = screen.getByTestId('rs');
    const rsSchoolDescription = screen.getByTestId('rs-desc');
    expect(rsSchoolSection).toBeInTheDocument();
    expect(rsSchoolDescription).toBeInTheDocument();
  });

  it('renders the RS School section with the correct content', () => {
    render(
      <Provider store={mockStore}>
        <WelcomePage />
      </Provider>
    );
    const reactSection = screen.getByTestId('react');
    const reactDescription = screen.getByTestId('react-desc');
    expect(reactSection).toBeInTheDocument();
    expect(reactDescription).toBeInTheDocument();
  });

  it('renders the team section with the correct content', () => {
    render(
      <Provider store={mockStore}>
        <WelcomePage />
      </Provider>
    );
    const teamMember1 = screen.getByAltText(/Jana/i);
    const teamMember2 = screen.getByAltText(/Svetlana/i);
    const teamMember3 = screen.getByAltText(/Vladimir/i);
    expect(teamMember1).toBeInTheDocument();
    expect(teamMember2).toBeInTheDocument();
    expect(teamMember3).toBeInTheDocument();
  });
});
