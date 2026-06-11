export function getUniqueBrands(products) {
  return [...new Set(products.map((product) => product.brand).filter(Boolean))].sort(
    (left, right) => left.localeCompare(right),
  );
}
