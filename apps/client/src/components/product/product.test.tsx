/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../product/product.component'
import { MemoryRouter } from 'react-router-dom';

test('loads and displays a product by using ProductCard component', async () => {
  const testingProduct = {
    id: 1,
    name: 'Luxury Testing Item',
    description: 'Luxury fake product.',
    image: 'fake-image',
    price: 200
  }
  render(
    <MemoryRouter>
      <ProductCard key={testingProduct.id} product={testingProduct} />
    </MemoryRouter>
  );

  const productName = await screen.findByText('Luxury Testing Item');
  const description = await screen.findByText('Luxury fake product.');
  expect(productName).toBeTruthy();
  expect(description).toBeTruthy();
})