import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import {
  FacebookOutlined,
  Instagram,
  Twitter,
  Pinterest,
  LocationOn,
  Phone,
  MailOutline,
} from '@mui/icons-material';
const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.div`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  background-color: #${(props) => props.color};
  color: white;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const Label = styled.div`
  margin-left: 20px;
`;
const Payment = styled.img``;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>JOSE.</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ipsam
          possimus sed dolore incidunt voluptates molestiae quo, quis facilis
          dolores, doloribus aliquam perferendis beatae vel, velit iste nihil
          quae recusandae.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookOutlined />
          </SocialIcon>

          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Trendy Kurtas</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOn />
          <Label>7/94, Netaji Puram KG Chavadi</Label>
        </ContactItem>
        <ContactItem>
          <Phone />
          <Label>7/94, Netaji Puram KG Chavadi</Label>
        </ContactItem>
        <ContactItem>
          <MailOutline />
          <Label>7/94, Netaji Puram KG Chavadi</Label>
        </ContactItem>
        <ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
