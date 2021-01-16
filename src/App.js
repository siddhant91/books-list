/**
 * Root Entry of the Application , Wrap the  child components with App level providers here
 * If Any routing is appllicable have the routes file added here than Components directlt
 */
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
