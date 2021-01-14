import { render } from '@testing-library/react';
import Card from './index';

it('Matches snapshot', () => {
	const { asFragment } = render(<Card> this is a Card</Card>);
	expect(asFragment()).toMatchSnapshot();
});

it('Renders children props', () => {
	const { getByText } = render(
		<Card>
			<p>Test Card</p>
		</Card>,
	);
	expect(getByText('Test Card')).toBeDefined();
});
