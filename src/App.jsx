import HomePage from './pages/HomePage.jsx';
import ErrorBoundary from './components/organisms/ErrorBoundary.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}
