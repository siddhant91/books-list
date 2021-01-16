import { render, cleanup, waitFor, screen, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Home from './index';
import { AppProvider } from '../../contexts/AppContext';
import { BookProvider } from '../../contexts/BookContext';
import mockBooksList from '../../../mockData/booksList';

afterEach(cleanup);

const mock = new MockAdapter(axios);

const renderComponent = (data = {}, mockError = false) => {
	act(() => {
		const mockData = data;
		if (mockError) {
			const mockErrorObj = {
				status: 400,
				errorMessage: 'bad Request',
			};
			mock.onGet().reply(400, mockErrorObj);
		} else {
			mock.onGet().reply(200, mockData);
		}
	});

	return (
		<AppProvider>
			<BookProvider>
				<Home />
			</BookProvider>
		</AppProvider>
	);
};

it('Matches snapshot', async () => {
	await act(async () => {
		const { asFragment } = render(renderComponent());
		expect(asFragment()).toMatchSnapshot();
	});
});

it('renders the title ', async () => {
	const { findByText } = render(renderComponent());
	expect(await findByText('Books')).toBeInTheDocument();
});

it('renders the title ', async () => {
	const { findByText } = render(renderComponent());
	expect(await findByText('Books')).toBeInTheDocument();
});

it('fetches the empty data ', async () => {
	render(renderComponent());
	expect(await screen.findByText('Sorry no books to Display')).toBeInTheDocument();
});

it('fetches the data ', async () => {
	render(renderComponent(mockBooksList));
	const bookCards = await screen.findAllByTestId('bokl-card');
	await waitFor(() => {
		expect(bookCards).toHaveLength(1);
	});
});

it('displays generic error and closes Modal', async () => {
	const { findByTestId } = render(renderComponent(mockBooksList, true));
	const errorTextElement = await findByTestId('generic-error');
	await waitFor(() => {
		expect(errorTextElement).toBeInTheDocument();
	});
});
