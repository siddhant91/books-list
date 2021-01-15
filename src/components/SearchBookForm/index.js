// import clsx from 'clsx';
// import { bool, func, node, oneOf, string } from 'prop-types';
import { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Network
import NetworkUtils from '../../network';

// Components
import TextInput from '../TextInput';

// Contexts
import { AppContext } from '../../contexts/AppContext';
import { BookContext } from '../../contexts/BookContext';

// Styles
import './styles.scss';

function SearchBookForm() {
	const [, setLoaderVisible] = useContext(AppContext);
	const [, setBooksList] = useContext(BookContext);
	const getBooks = async ({ searchText }) => {
		try {
			setLoaderVisible(true);
			const result = await NetworkUtils.makeApiRequest({
				url: '',
				params: {
					q: searchText,
				},
			});

			const { responseData } = result;
			if (responseData) {
				const { items = [] } = responseData;
				if (items.length) {
					setBooksList(items);
				}
			}
		} catch (e) {
			console.log(e);
		} finally {
			setLoaderVisible(false);
		}
	};

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
					getBooks(values);
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

SearchBookForm.propTypes = {};

SearchBookForm.defaultProps = {};

export default SearchBookForm;
