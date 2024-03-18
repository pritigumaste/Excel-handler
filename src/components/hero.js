//MAIN starting of the UI page

import {
    Box,
    Button,
    Flex,
    Image,
    Spacer,
    Text,
    useMediaQuery,
  } from '@chakra-ui/react';
  import React from 'react';
  import excel_image from 'D:/VSCode-Workspace/my-app/src/assets/excel_image.jpeg';
  
  const Hero = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    return (
      <Flex
        alignItems="center"
        w="full"
        px={isLargerThanLG ? '16' : '6'}
        py="16"
        minHeight="90vh"
        justifyContent="space-between"
        flexDirection={isLargerThanLG ? 'row' : 'column'}
      >
        <Box mr={isLargerThanLG ? '6' : '0'} w={isLargerThanLG ? '60%' : 'full'}>
          <Text
            fontSize={isLargerThanLG ? '5xl' : '4xl'}
            fontWeight="bold"
            mb="4"
          >
            {' '}
            Excel Sheet Handler Tool
          </Text>
  
          <Text mb="6" fontSize={isLargerThanLG ? 'lg' : 'base'} opacity={0.7}>
            Excel Handler tool is your one stop to manage excel operations with a click! Click on the Demo below to understand the magic we 
            can create using this tool!
          </Text>
  
          <Button
            w="200px"
            colorScheme="blue"
            variant="solid"
            h="50px"
            size={isLargerThanLG ? 'lg' : 'md'}
            mb={isLargerThanLG ? '0' : '10'}
            onClick={(e) => {
              e.preventDefault();
              window.location.href='';
              }}
          >
            Demo
          </Button>
        </Box>
        <Spacer />

        <Flex
        w={isLargerThanLG ? '40%' : 'full'}
        mb={isLargerThanLG ? '0' : '6'}
        alignItems="right"
        justifyContent="right"
      >
        <Image src={excel_image} alt="Chakra Team" w="full" />
      </Flex>

       
      </Flex>
    );
  };
  
  export default Hero;