import { useState } from 'react';
import { styled } from '@stitches/react';
import inlogo from './inlogo.svg';

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  background: '#E5E5E5',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
const Box = styled('div', {
  width: '33.3%',
  height: '50%'
})

const App = () => {

  return (
    <Container>
      <Box></Box>
    </Container>
  );
}

export default App;
