
import Footer from './components/footer';
import DrawerComponent from './components/drawerComponent';
import Hero from './components/hero';
import Navigation from './components/navigation';
import About from './components/about';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React, { useRef } from 'react';
import { useDisclosure, Box } from '@chakra-ui/react';
import { ExcelReader } from './components/ExcelReader';
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Box>
      <Navigation ref={btnRef} onOpen={onOpen} />
      <Hero />
      <About/>    
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Box>
  );
}

export default App;