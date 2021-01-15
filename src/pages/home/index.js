// Network
import { useContext, useState } from 'react';

// Components
import PageLayout from '../../components/PageLayout';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BooksList from '../../components/BooksList';
// Context
import { AppContext } from '../../contexts/AppContext';
// Styles
import './styles.scss';

const Home = () => {
	const [loaderVisible] = useContext(AppContext);
	const [searchText, setSearchText] = useState('');
	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};
	const resetSearchvalue = () => {
		setSearchText('');
	};
	const menuItems = [
		{
			title: 'Content Management',
			icon: '',
			isAccordion: true,
			accordionContent: [],
		},
		{
			title: 'Courses',
			icon: '',
			isAccordion: false,
		},
	];
	return (
		<div className="bokl-homepage">
			<PageLayout menuItems={menuItems}>
				{loaderVisible && <Loader />}
				<div className="bokl-homepage--content">
					<div className="bokl-homepage--content__title d-flex flex-column flex-lg-row justify-content-between">
						<h1>Books</h1>
						<Button>Create New Book</Button>
					</div>
					<div className="bokl-homepage--content__main">
						<TextInput
							labelKey="Search For Books"
							value={searchText}
							placeholder="Search"
							handleChange={handleSearchChange}
							handleClearValue={resetSearchvalue}
						/>
						<BooksList />
					</div>
				</div>
			</PageLayout>
		</div>
	);
};

export default Home;
