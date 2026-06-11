import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen label="Loading page" />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
