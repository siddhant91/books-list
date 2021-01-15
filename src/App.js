// Components
import Home from './pages/home';

// Providers
import { AppProvider } from './contexts/AppContext';
import { BookProvider } from './contexts/BookContext';

function App() {
	return (
		<AppProvider>
			<div className="App">
				<BookProvider>
					<Home />
				</BookProvider>
			</div>
		</AppProvider>
	);
}

export default App;
