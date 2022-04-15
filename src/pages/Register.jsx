import React from 'react';
import styled from 'styled-components';
import { publicRequest } from '../requestethods';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
    center;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: white;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;
const Agreement = styled.div`
  font-size: 12px;
  margin-bottom: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 4) {
    errors.name = 'Must be greater than 4 characters';
  }
  if (!values.lastname) {
    errors.lastname = 'Required';
  }

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 4) {
    errors.username = 'Must be greater than 4 characters';
  }

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

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      console.log('onsubmit called');
      console.log(values);
      try {
        const res = await axios.post('https://capstone-backendserver.herokuapp.com/api/auth/register', values);
        console.log(res);

        res.status === 200 && navigate('/');
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>

        <Form onSubmit={formik.handleSubmit}>
          <Input
            name="name"
            type="text"
            id="name"
            placeholder="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <div style={{ color: 'red' }}>{formik.errors.name}</div>
          ) : null}
          <Input
            name="lastname"
            type="text"
            id="lastname"
            placeholder="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
          />
          {formik.errors.lastname ? (
            <div style={{ color: 'red' }}>{formik.errors.lastname}</div>
          ) : null}
          <Input
            name="username"
            type="text"
            id="username"
            placeholder="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username ? (
            <div style={{ color: 'red' }}>{formik.errors.username}</div>
          ) : null}
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
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
          />
          {formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button> <br />
          <Link to="/">
            <Button>LOGIN</Button>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
