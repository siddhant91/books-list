import { render } from '@testing-library/react';
import Loader from './index';

it('Matches snapshot', () => {
	const { asFragment } = render(<Loader />);
	expect(asFragment()).toMatchSnapshot();
});
