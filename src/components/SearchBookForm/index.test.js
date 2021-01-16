import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import SearchBookForm from './index';

afterEach(cleanup);

const renderComponent = (fn) => {
	return <SearchBookForm getBooksList={fn} />;
};
it('Matches snapshot', () => {
	const fn = jest.fn();
	const { asFragment } = render(renderComponent(fn));
	expect(asFragment()).toMatchSnapshot();
});

it('Handles validation of TextInput input element on Submit', async () => {
	const fn = jest.fn();
	const { getByTestId, findByText } = render(renderComponent(fn));
	const button = await findByText('Submit');
	fireEvent.click(button);
	await waitFor(() => {
		expect(fn).toHaveBeenCalledTimes(0);
		const error = getByTestId('TextInput-error');
		expect(error).toBeInTheDocument();
	});
});

it('Handles form Submission', async () => {
	const fn = jest.fn();
	const { getByTestId, findByTestId, findByText } = render(renderComponent(fn));
	const element = getByTestId('TextInput');
	const button = await findByText('Submit');
	fireEvent.change(element, { target: { value: 'testSearch' } });
	const newInput = await findByTestId('TextInput');
	expect(newInput.value).toBe('testSearch');
	fireEvent.click(button);
	await waitFor(() => {});
});
