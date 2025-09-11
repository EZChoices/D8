import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import About from '@/app/about/page';
import ContactPage from '@/app/contact/page';
import ShopPage from '@/app/shop/page';
import { products } from '@/lib/products';

describe('app pages', () => {
  test('home page displays hero content', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /pure delta-8/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse Products' })).toHaveAttribute(
      'href',
      '/shop'
    );
  });

  test('about page renders heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  test('contact page shows form', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('shop page lists products', () => {
    render(<ShopPage />);
    expect(screen.getByRole('heading', { name: 'Shop' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: products[0].name })
    ).toBeInTheDocument();
  });
});
