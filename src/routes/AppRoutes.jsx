import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const ProductListPage = lazy(() =>
  import('../pages/ProductListPage/ProductListPage'),
);
const ProductDetailPage = lazy(() =>
  import('../pages/ProductDetailPage/ProductDetailPage'),
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
