import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';

import PageLayout from './index';

afterEach(cleanup);

const mockMenuItems = [
	{
		title: 'Content Management',
		icon: 'fa-window-maximize',
		isAccordion: true,
	},
	{
		title: 'Courses',
		icon: 'fa-file',
		isAccordion: false,
	},
];

const renderComponent = (menuItems = []) => {
	return (
		<PageLayout menuItems={menuItems}>
			<p>this is child node text</p>
		</PageLayout>
	);
};
it('Matches snapshot', () => {
	const { asFragment } = render(renderComponent());
	expect(asFragment()).toMatchSnapshot();
});

it('Renders Logo Img', () => {
	const { getByTestId } = render(renderComponent());
	expect(getByTestId('logo-img')).toBeInTheDocument();
});

it('Renders Chidren', async () => {
	const { findByText } = render(renderComponent());
	expect(await findByText('this is child node text')).toBeInTheDocument();
});

it('Renders Menu Items', async () => {
	const { findByTestId } = render(renderComponent(mockMenuItems));

	const menuElement = await findByTestId('menu-items');
	await waitFor(() => {
		expect(menuElement).toBeInTheDocument();
	});
});

it('toggles the menu State', async () => {
	const { getByTestId } = render(renderComponent());
	const menuToggler = getByTestId('toggle-menu');
	const menuContainer = getByTestId('menu-container');
	fireEvent.click(menuToggler);
	await waitFor(() => {
		expect(menuContainer.classList.contains('open')).toBe(true);
	});
});
