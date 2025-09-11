import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

test('renders product details and links', () => {
  const product = products[0];
  render(<ProductCard {...product} />);

  expect(
    screen.getByRole('heading', { name: product.name })
  ).toBeInTheDocument();
  expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View' })).toHaveAttribute(
    'href',
    `/product/${product.slug}`
  );
});
