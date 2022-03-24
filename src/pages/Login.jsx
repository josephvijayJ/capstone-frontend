import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import axios from 'axios';
import { publicRequest } from '../requestethods';
import { useNavigate, Link } from 'react-router-dom';
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 30%;
  background-color: white;
  padding: 20px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
const Reg = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be greater than 6 characters';
  }

  return errors;
};
const Login = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      console.log('onsubmit called');

      try {
        const res = await publicRequest.post('/auth/login', values);
        console.log(res);

        localStorage.setItem('token', res.data.accessToken);
        res.status == 200 && navigate('/home');
      } catch (error) {
        console.log(error);
        setStatus('Invalid credentials');
      }
    },
  });

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          ></Input>
          {formik.errors.email ? (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          ) : null}
          <Input
            name="password"
            type="password"
            id="password"
            placeholder="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          ></Input>
          {formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
          <Button type="Submit">LOGIN</Button>
          <Link to="/forgetpassword">
            <Reg>FORGOT PASSWORD ?</Reg>
          </Link>
          <Link to="/register">
            {' '}
            <Reg>CREATE A NEW ACCOUNT(Register)</Reg>
          </Link>
          {<p style={{ color: 'red', textAlign: 'center' }}>{status}</p>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
