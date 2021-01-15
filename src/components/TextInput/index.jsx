import clsx from 'clsx';
import { bool, node, oneOf, string } from 'prop-types';
import { useRef } from 'react';
import { useField, useFormikContext } from 'formik';

// Styles
import './styles.scss';

function TextInput({
	additionalClasses,
	children,
	readOnly,
	type,
	ariaLabel,
	canClear,
	placeHolder,
	labelKey,
	...props
}) {
	const textInput = useRef(null); //  reference to the input field
	const [field, meta] = useField(props);
	const { value = '' } = field;
	const { touched, error } = meta;
	const isInValid = touched && error;
	const { setFieldValue } = useFormikContext();

	/**
	 * Triggered on click of CLEAR icon.
	 * Clears the input field and sets the focus on the input field.
	 */
	const clearField = () => {
		setFieldValue(field.name, '');
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
					aria-label={ariaLabel}
					data-testid="TextInput"
					ref={textInput}
					className={clsx({
						disabled: readOnly,
					})}
					{...field}
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
			{isInValid && <p className="bokl-text-input--error-text">{error}</p>}
			{children}
		</div>
	);
}

TextInput.propTypes = {
	children: node,
	readOnly: bool,
	additionalClasses: string,
	type: oneOf(['text', 'email', 'password', 'number', 'tel', 'search']),
	ariaLabel: string,
	canClear: bool,
	placeHolder: string,
	labelKey: string.isRequired,
};

TextInput.defaultProps = {
	children: null,
	readOnly: false,
	additionalClasses: '',
	type: 'search',
	ariaLabel: 'TextInput',
	canClear: true,
	placeHolder: '',
};

export default TextInput;
