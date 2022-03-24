import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { popularProducts } from '../Data';
import Product from './Product';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log('before useEffect');
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://capstone-backendserver.herokuapp.com/api/products?category=${cat}`
            : 'https://capstone-backendserver.herokuapp.com/api/products'
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <>
      <Container>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item.id} />
            ))
          : products.map((item) => <Product item={item} key={item.id} />)}
      </Container>
    </>
  );
};

export default Products;
