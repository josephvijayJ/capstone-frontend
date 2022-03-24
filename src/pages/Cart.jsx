import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Add, Remove } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestethods';
import { useNavigate } from 'react-router-dom';
const KEY =
  'pk_test_51KdFxaSEBfRbFcW68zi3GLcX7ISrgRQnq8czqESnJ2iPTnh6R9IV9fLZhyVTSYd5nY50uSywR1qRw0SjSnWrkMPU00zhlTXNSQ';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 300;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type == 'filled' ? 'black' : 'transparent'};
  color: ${({ type }) => (type === 'filled' ? 'white' : 'black')};
`;
const TopTexts = styled.div``;
const TopText = styled.a`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
`;
const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  padding: 20px;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.div``;
const ProductId = styled.div``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
const ProductSize = styled.div``;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ProductAmount = styled.p`
  margin: 0px 5px;
  font-size: 30px;
  font-weight: 200;
`;
const ProductPrice = styled.div`
  font-size: 40px;
  margin-top: 10px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
`;
const SummaryItemText = styled.div``;
const SummaryItemPrice = styled.div``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  //on token function
  const onToken = (token) => {
    setStripeToken(token);
  };
  console.log(stripeToken);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        console.log('success');
        navigate('/success', { data: res.data });
      } catch (error) {
        console.log('error while payment success');
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products[0] == null && (
              <h1 style={{ textAlign: ' center' }}>NO ITEMS IN THE CART</h1>
            )}
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color="black" />
                    <ProductSize>
                      <b>Size:</b> M
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    {/* $ {product.price * product.quantity} */}$ 500
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping Cost</SummaryItemText>
              <SummaryItemPrice>$9</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ 5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText type="total">Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>

            <StripeCheckout
              name="Jose Shop"
              image="https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635448_960_720.png"
              billingAddress
              shippingAddress
              description={`Your total  is $${cart.total}`}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
