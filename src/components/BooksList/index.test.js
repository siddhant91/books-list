import { render, screen, cleanup } from '@testing-library/react';

import BooksList from './index';

afterEach(cleanup);

const renderComponent = (booksData = []) => {
	return <BooksList booksData={booksData} />;
};

it('Matches snapshot', () => {
	const { asFragment } = render(renderComponent());
	expect(asFragment()).toMatchSnapshot();
});

it('renders efault title', async () => {
	render(renderComponent());
	expect(await screen.findByText('All Books')).toBeInTheDocument();
});

it('renders no book to display text', async () => {
	render(renderComponent());
	expect(await screen.findByText('Sorry no books to Display')).toBeInTheDocument();
});

it('renders books list', async () => {
	const mockData = [
		{
			volumeInfo: {
				title: 'XYZ',
				authors: ['A', 'B'],
				publisher: 'ABC',
				publishedDate: '2021-01-16',
			},
		},
	];
	render(renderComponent(mockData));
	const bookCards = await screen.findAllByTestId('bokl-card');
	expect(bookCards).toHaveLength(1);
});
