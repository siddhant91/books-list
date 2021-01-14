import clsx from 'clsx';
import { bool, func, node, oneOf, string } from 'prop-types';
import { useRef } from 'react';

// Styles
import './styles.scss';

function TextInput({
	additionalClasses,
	children,
	readOnly,
	value,
	handleChange,
	handleClearValue,
	type,
	ariaLabel,
	isRequired,
	canClear,
	placeHolder,
	labelKey,
	...props
}) {
	const textInput = useRef(null); //  reference to the input field

	/**
	 * Triggered on click of CLEAR icon.
	 * Clears the input field and sets the focus on the input field.
	 */
	const clearField = () => {
		handleClearValue();
		textInput.current.focus();
	};

	return (
		<div
			className={clsx('bokl-text-input', additionalClasses, {
				disabled: readOnly,
			})}
		>
			<label htmlFor={labelKey} className="d-flex bokl-text-input--label">
				<span>
					<i className="fa fa-search" aria-hidden="true" />
				</span>
				<input
					id={labelKey}
					type={type}
					value={value}
					onChange={handleChange}
					readOnly={readOnly}
					aria-label={ariaLabel}
					required={isRequired}
					aria-required={isRequired}
					data-testid="TextInput"
					ref={textInput}
					className={clsx({
						disabled: readOnly,
					})}
					data-label-key={labelKey}
					{...props}
				/>
			</label>
			{
				/**
				 * Show CLEAR (X) icon only when when
				 * `canClear` is true (default)
				 * AND the input is not blank
				 * AND the field is NOT read-only/disabled.
				 */
				canClear && value.length > 0 && !readOnly && (
					<div
						className="bokl-text-input--clear-icon"
						role="button"
						tabIndex="0"
						aria-pressed="false"
						aria-label="clear-TextInput"
						onClick={clearField}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								clearField();
							}
						}}
						data-testid="clear-TextInput"
					>
						<i className="fa fa-times" aria-hidden="true" />
					</div>
				)
			}
			{children}
		</div>
	);
}

TextInput.propTypes = {
	children: node,
	handleChange: func,
	handleClearValue: func,
	readOnly: bool,
	additionalClasses: string,
	value: string.isRequired,
	type: oneOf(['text', 'email', 'password', 'number', 'tel', 'search']),
	ariaLabel: string,
	isRequired: bool,
	canClear: bool,
	placeHolder: string,
	labelKey: string.isRequired,
};

TextInput.defaultProps = {
	children: null,
	handleChange: () => {},
	handleClearValue: () => {},
	readOnly: false,
	additionalClasses: '',
	type: 'search',
	ariaLabel: 'TextInput',
	isRequired: false,
	canClear: true,
	placeHolder: '',
};

export default TextInput;
