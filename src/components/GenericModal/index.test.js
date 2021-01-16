import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import GenericModal from './index';

afterEach(cleanup);
const handleClose = jest.fn();
const renderComponent = ({ modalStatus = false } = {}) => {
	return (
		<GenericModal handleClose={handleClose} modalStatus={modalStatus} closeIconLabel="close Icon">
			child text
		</GenericModal>
	);
};

it('Matches snapshot', () => {
	const { asFragment } = render(renderComponent());
	expect(asFragment()).toMatchSnapshot();
});

it('Renders children props', () => {
	const { getByText } = render(renderComponent({ modalStatus: true }));
	expect(getByText('child text')).toBeInTheDocument();
});

it('Handles Close Click', async () => {
	const { getByTestId } = render(renderComponent({ modalStatus: true }));
	const button = getByTestId('close-icon');
	fireEvent.click(button);
	await waitFor(() => {
		expect(handleClose).toHaveBeenCalledTimes(1);
	});
});
