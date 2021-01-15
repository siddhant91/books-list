// Network
import { useContext } from 'react';

// Components
import PageLayout from '../../components/PageLayout';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import BooksList from '../../components/BooksList';
import SearchBookForm from '../../components/SearchBookForm';
// Context
import { AppContext } from '../../contexts/AppContext';
// Styles
import './styles.scss';

const Home = () => {
	const [loaderVisible] = useContext(AppContext);
	const menuItems = [
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
						<SearchBookForm />
						<BooksList />
					</div>
				</div>
			</PageLayout>
		</div>
	);
};

export default Home;
