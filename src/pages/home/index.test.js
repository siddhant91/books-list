import { render, cleanup } from '@testing-library/react';

import Home from './index';
import { AppProvider } from '../../contexts/AppContext';
import { BookProvider } from '../../contexts/BookContext';

afterEach(cleanup);

const renderComponent = () => {
	return (
		<AppProvider>
			<BookProvider>
				<Home />
			</BookProvider>
		</AppProvider>
	);
};

it('Matches snapshot', () => {
	const { asFragment } = render(renderComponent());
	expect(asFragment()).toMatchSnapshot();
});

it('renders the title ', async () => {
	const { findByText } = render(renderComponent());
	expect(await findByText('Books')).toBeInTheDocument();
});

it('renders the title ', async () => {
	const { findByText } = render(renderComponent());
	expect(await findByText('Books')).toBeInTheDocument();
});
