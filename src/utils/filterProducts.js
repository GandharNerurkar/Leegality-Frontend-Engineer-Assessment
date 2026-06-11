export function filterProducts(products, filters) {
  const {
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
    searchTerm,
  } = filters;

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const min = minPrice === '' ? null : Number(minPrice);
  const max = maxPrice === '' ? null : Number(maxPrice);

  return products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    const matchesBrand = selectedBrands.length
      ? selectedBrands.includes(product.brand)
      : true;

    const matchesMin = min === null || product.price >= min;
    const matchesMax = max === null || product.price <= max;

    const haystack = [
      product.title,
      product.brand,
      product.category,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = normalizedSearch
      ? haystack.includes(normalizedSearch)
      : true;

    return (
      matchesCategory &&
      matchesBrand &&
      matchesMin &&
      matchesMax &&
      matchesSearch
    );
  });
}
