import { render, fireEvent, cleanup } from '@testing-library/react';

import { Formik, Form } from 'formik';

import TextInput from './index';

afterEach(cleanup);

const renderComponent = ({ initialSearchText = '', readOnly = false } = {}) => {
	return (
		<Formik
			initialValues={{
				searchText: initialSearchText,
			}}
			onSubmit={(values) => {
				console.log(values.searchText);
			}}
		>
			{() => (
				<Form autoComplete="off">
					<TextInput
						labelKey="Search For Books"
						name="searchText"
						placeholder="Search"
						readOnly={readOnly}
					>
						<p>Text</p>
					</TextInput>
				</Form>
			)}
		</Formik>
	);
};
it('Matches snapshot', () => {
	const { asFragment } = render(renderComponent());
	expect(asFragment()).toMatchSnapshot();
});

it('Renders children props', () => {
	const { getByText } = render(renderComponent());
	expect(getByText('Text')).toBeInTheDocument();
});

it('Renders value props correctly', () => {
	const { getByTestId } = render(renderComponent({ initialSearchText: 'testSearch' }));
	expect(getByTestId('TextInput').value).toBe('testSearch');
});

it('should disable the TextInput', () => {
	const { getByTestId } = render(renderComponent({ readOnly: true }));
	expect(getByTestId('TextInput').readOnly).toBeTruthy();
});

it('Handles change in TextInput input element', async () => {
	const { getByTestId, findByTestId } = render(renderComponent({}));
	const element = getByTestId('TextInput');
	fireEvent.change(element, { target: { value: 'Value' } });
	const newInput = await findByTestId('TextInput');
	expect(newInput.value).toBe('Value');
});

it('Handles canClear button interactions', async () => {
	const { getByTestId, findByTestId } = render(
		renderComponent({ initialSearchText: 'testSearch' }),
	);
	const element = getByTestId('clear-TextInput');
	fireEvent.click(element);
	const newInput = await findByTestId('TextInput');
	expect(newInput.value).toBe('');
});

it('Handles canClear button interactions with Enter Key', async () => {
	const { getByTestId, findByTestId } = render(
		renderComponent({ initialSearchText: 'testSearch' }),
	);
	const element = getByTestId('clear-TextInput');
	fireEvent.keyPress(element, { key: 'Enter', keyCode: 13 });
	const newInput = await findByTestId('TextInput');
	expect(newInput.value).toBe('');
});
