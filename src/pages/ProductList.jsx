import React, { useState } from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import { useParams } from 'react-router-dom';
const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  margin: 20px;
`;
const FilterText = styled.div`
  margin-right: 20px;
  font-size: 20px;
  font-weight: 600;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 10px;
`;
const Option = styled.option``;
const ProductList = () => {
  const params = useParams();
  const category = params.category;
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  console.log(filters);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled selected>
              Color{' '}
            </Option>
            <Option>white </Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>gray</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled selected>
              Size
            </Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>

            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (Asc)</Option>
            <Option value="desc">Price (Desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
