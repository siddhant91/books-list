import { func } from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Components
import TextInput from '../TextInput';

// Styles
import './styles.scss';

function SearchBookForm({ getBooksList }) {
	return (
		<div className="bokl-search-form">
			<Formik
				initialValues={{
					searchText: '',
				}}
				validationSchema={Yup.object({
					searchText: Yup.string().trim().required('please input to search'),
				})}
				onSubmit={(values) => {
					getBooksList(values.searchText);
				}}
			>
				{() => (
					<Form autoComplete="off">
						<TextInput labelKey="Search For Books" name="searchText" placeholder="Search" />
					</Form>
				)}
			</Formik>
		</div>
	);
}

SearchBookForm.propTypes = {
	getBooksList: func.isRequired,
};

SearchBookForm.defaultProps = {};

export default SearchBookForm;
