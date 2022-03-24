import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  letter-spacing: 5px;
`;

const Announcement = () => {
  return <Container>Super Deal !!! Dont left it out .....</Container>;
};

export default Announcement;
