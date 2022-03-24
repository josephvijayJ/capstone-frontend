import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { publicRequest } from '../requestethods';
import axios from 'axios';
import { useFormik } from 'formik';
const ContainerHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  border: 1px solid black;
  padding: 40px;
  margin-top: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.h4``;
const Input = styled.input`
  margin-top: 10px;
  padding: 10px;
`;

const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const Forgetpassword = () => {
  const [notify, setNotify] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: async (values) => {
      console.log('onsubmit called');
      console.log(values);
      try {
        const res = await publicRequest.post('/auth/forgetpassword', values);
        console.log(res);
        res.status == 200 && setNotify(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ContainerHead>
      <Container>
        <Label>Forget password</Label>
        <Input
          name="email"
          type="email"
          id="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Button onClick={formik.handleSubmit}>Submit</Button>
        {notify && (
          <p style={{ color: 'red' }}>
            Please Check and follow the Mail Instructions
          </p>
        )}
      </Container>
    </ContainerHead>
  );
};

export default Forgetpassword;
