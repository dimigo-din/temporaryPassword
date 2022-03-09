import { useState } from 'react';
import { styled } from '@stitches/react';
import inlogo from './inlogo.svg';
import { ToastContainer, toast } from 'react-toastify';

import './pretendardvariable.css';
import 'react-toastify/dist/ReactToastify.css';
import api from './api';

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  background: 'rgb(237 237 237)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
const Box = styled('form', {
  width: '33.3%',
  height: '60%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center'
});
const Logo = styled('img', {
  width: '60px',
  height: '60px'
});
const Fields = styled('input', {
  width: '100%',
  height: '50px',
  background: '#fff',
  outline: 'none',
  border: '1px solid #D1D3DD',
  boxSizing: 'border-box',
  borderRadius: '10px',
  textAlign: 'center',
  fontFamily: 'Pretendard Variable',
  '&::placeholder': {
    color: '#D2D6DB'
  }
});
const SubmitBtn = styled('input', {
  width: '100%',
  height: '50px',
  background: '#E83C77',
  borderRadius: '10px',
  outline: 'none',
  border: 'none',
  color: '#fff',
  fontFamily: 'Pretendard Variable',
  fontWeight: '600',
  fontSize: '18px',
  cursor: 'pointer'
});

const App = () => {
  const [id, setId] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const setTmpPwd = (e: any) => {
    e.preventDefault();

    if(!id || !code || !password) return toast.error("필드를 확인해주세요.");

    api.post('/auth/setPwd', {
      Headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        code,
        password
      })
    })
    .then(data => {
      toast.success(data.data.message);
    });
  }

  return (
    <Container>
      <ToastContainer />
      <Box onSubmit={setTmpPwd}>
        <Logo src={inlogo} />
        <Fields
        type='text'
        placeholder='아이디'
        value={id}
        onChange={({ target: { value } }) => {setId(value);}} />
        <Fields
        type='text'
        placeholder='인증코드'
        value={code}
        onChange={({ target: { value } }) => {setCode(value);}} />
        <Fields
        type='password'
        placeholder='임시 비밀번호 생성'
        value={password}
        onChange={({ target: { value } }) => {setPassword(value);}} />
        <Fields
        type='password'
        placeholder='비밀번호 확인'
        value={confirm}
        onChange={({ target: { value } }) => {setConfirm(value);}} />
        <SubmitBtn
        type="submit"
        value="설정" />
      </Box>
    </Container>
  );
}

export default App;
