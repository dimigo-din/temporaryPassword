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
  transition: 'all 0.3s ease',
  '&::placeholder': {
    color: '#D2D6DB'
  },
  '&:focus, &:hover': {
    border: '2px solid rgb(175 175 175)'
  },
  '&.err': {
    border: '2px solid #E83C77'
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

  const [isErr, setIsErr] = useState<boolean>(false);

  const setTmpPwd = (e: any) => {
    e.preventDefault();

    if(!id || !code || !password) {
      setIsErr(true);
      return toast.error("필드를 확인해주세요.");
    }
    if(password !== confirm) {
      setIsErr(true);
      return toast.error("비밀번호를 확인해주세요.");
    }

    api.post('/auth/setPwd', {id, code, password}, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.status === 200) return toast.success(res.data.message);
      if(res.data.message) return toast.error(res.data.message);
      return toast.error("서버에서 에러가 발생했어요.\n나중에 다시 시도해주세요.");
    })
    .catch(err => {
      setIsErr(true);
      if(err.response.data.message) toast.error(err.response.data.message);
      else toast.error("서버에서 에러가 발생했어요.\n나중에 다시 시도해주세요.");
      return Promise.reject(err);
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
        onChange={({ target: { value } }) => {setId(value);}}
        className={isErr ? 'err' : ''} />
        <Fields
        type='text'
        placeholder='인증코드'
        value={code}
        onChange={({ target: { value } }) => {setCode(value);}}
        className={isErr ? 'err' : ''} />
        <Fields
        type='password'
        placeholder='임시 비밀번호 생성'
        value={password}
        onChange={({ target: { value } }) => {setPassword(value);}}
        className={isErr ? 'err' : ''} />
        <Fields
        type='password'
        placeholder='비밀번호 확인'
        value={confirm}
        onChange={({ target: { value } }) => {setConfirm(value);}}
        className={isErr ? 'err' : ''} />
        <SubmitBtn
        type="submit"
        value="설정" />
      </Box>
    </Container>
  );
}

export default App;
