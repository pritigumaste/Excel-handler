import React, { useState } from 'react';
import { ExcelReader } from './ExcelReader'; // Make sure the path is correct
import { Flex, Spacer, Text, useMediaQuery, Input, Button, VStack , Grid} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
//import { useCallback, useEffect, useRef, useState } from "react";
//import { read, utils, writeFileXLSX  } from 'xlsx';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

const AboutUs = () => {
  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)');
  const array = [
    {
      id: 1,
      text: ' Lets get started! Upload a a excel file to proceed.',
      icon: FaUpload,
    }];
  const [file, setFile] = useState(null);
  const [sheetData, setSheetData] = useState([]);

  function handleChange (event) {
    setFile(event.target.files[0]);
  };

  const handleDisplay = () => {
    if (!file) {
      alert('Please select a Excel file first!');
      return;
    }
    if (file) {
      ExcelReader(file, setSheetData); // Use setSheetData to update state with the Excel data
    }
  };

  const handleProcess = () => {
    if (!file) {
      alert('Please select a Excel file first!');
      return;
    }
  };

  return (

    <Flex
    minH="70vh"
    alignItems="center"
    justifyContent="space-between"
    w="full"
    py="16"
    px={isLargerThanMD ? '16' : '6'}
    flexWrap="wrap"
    flexDirection={isLargerThanMD ? 'row' : 'column'}
  >
    {array.map((arr) => (
      <>
        <Flex
          height="300px"
          bg="blackAlpha.200"
          width={isLargerThanMD ? '32%' : 'full'}
          shadow="md"
          p="6"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          flexDirection="column"
          textAlign="center"
          mb={isLargerThanMD ? '0' : '4'}
          border="1px solid #C4DDFF"
        >
          <Icon as={arr.icon} boxSize={14} color="blue.600" mb="5" />
          <Text>{arr.text}</Text>
        </Flex>

        <Spacer />

        <VStack
      align="stretch"
      w={isLargerThanMD ? '43%' : 'full'}
      p="6"
      textAlign="center"
      justifyContent="center"
    >
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Choose File to Upload
      </Text>
      <Input type="file" onChange={handleChange} accept=".xlsx, .xls" />
      
      <Button colorScheme="blue" mt="4" onClick={(handleDisplay)}>
        Display
      </Button>
      <Button colorScheme="blue" mt="4" onClick={(handleProcess)}>
        Process Data
      </Button>
     </VStack>
    {/* <button onClick={exportFile}>Export XLSX</button>
  <div ref={tbl} dangerouslySetInnerHTML={{ __html }} />
</> */}
     </>
     
    ))}
    <div className="custom-table" align = "center">
    <Grid height="100vh" placeItems="center" justifyContent="center">
    {sheetData.length > 0 && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {sheetData[0] && sheetData[0].map((cell, index) => (
                <th key={index}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheetData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    
    </Grid>
      </div>

    <div id="excel_data" class="mt-5"></div>
    </Flex>
  );
};

export default AboutUs;
