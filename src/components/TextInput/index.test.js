import { fireEvent, render } from '@testing-library/react';
import TextInput from './index';

it('Matches snapshot', () => {
	const { asFragment } = render(<TextInput labelKey="text" value="value" canClear={false} />);
	expect(asFragment()).toMatchSnapshot();
});

it('Renders children props', () => {
	const { getByText } = render(
		<TextInput labelKey="text" value="value" canClear={false}>
			<p>Text</p>
		</TextInput>,
	);
	expect(getByText('Text')).toBeDefined();
});

it('Renders value props correctly', () => {
	const { getByTestId } = render(<TextInput labelKey="text" value="value" canClear={false} />);
	expect(getByTestId('TextInput').value).toBe('value');
});

it('Has default handle props', () => {
	TextInput.defaultProps.handleChange();
	TextInput.defaultProps.handleClearValue();
	expect(TextInput.defaultProps.handleChange).toBeDefined();
	expect(TextInput.defaultProps.handleClearValue).toBeDefined();
});

it('should disable the TextInput', () => {
	const { getByTestId } = render(<TextInput value="hello" readOnly labelKey="text" />);
	expect(getByTestId('TextInput').readOnly).toBeTruthy();
});

it('Handles change in TextInput input element', () => {
	const fn = jest.fn();
	const { getByTestId } = render(
		<TextInput labelKey="text" value="" canClear={false} handleChange={fn} />,
	);
	const element = getByTestId('TextInput');
	fireEvent.change(element, { target: { value: 'Value' } });
	expect(fn).toHaveBeenCalledTimes(1);
});

it('Handles canClear button interactions', () => {
	const fn = jest.fn();
	const { getByTestId } = render(<TextInput value="value" labelKey="text" handleClearValue={fn} />);
	const element = getByTestId('clear-TextInput');
	fireEvent.click(element);
	fireEvent.keyPress(element, { key: 'Enter', keyCode: 13 });
	expect(fn).toHaveBeenCalledTimes(2);
});
