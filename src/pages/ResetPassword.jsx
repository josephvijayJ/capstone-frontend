import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { publicRequest } from '../requestethods';

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

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  let token = params.token;
  const [notify, setNotify] = useState('');
  const resetPasswordhandler = async () => {
    if (password.length <= 0) {
      console.log('characters is required');
      return;
    }
    let values = {
      password: password,
      token: token,
    };
    try {
      const res = await publicRequest.put('/auth/resetpassword', values);
      navigate('/');
      res.status == 200 && setNotify(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContainerHead>
      <Container>
        <Label>Reset Password</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <Button onClick={resetPasswordhandler}>change password</Button>
      </Container>
      {notify && <p>Password Changed Successfully</p>}
    </ContainerHead>
  );
};

export default ResetPassword;
