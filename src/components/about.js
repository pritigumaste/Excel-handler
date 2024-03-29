import React, { Component } from 'react';
import {OutTable, ExcelRenderer } from 'react-excel-renderer';
import { Flex, Spacer, Text, Input, Button, VStack, Icon, Box } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import { Card } from '@chakra-ui/react'
//import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import './style.css';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';


class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null,
      secondRowValues: [], // New state property
      selectedColumns: {},
      filteredRows: null,
      showPieChart: false
    };
    this.fileInput = React.createRef();
  }

  renderFile = (fileObj) => {
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows,
          //extracting second row
          secondRowValues: resp.rows.length > 1 ? resp.rows[0] : []
        });
      }
    });
  }

  handleChange = (index, isChecked) => {
    this.setState(prevState => ({
      selectedColumns: {
        ...prevState.selectedColumns,
        [index]: isChecked,
      }
    }));
  }
  
  handleDisplaySelectedColumns = () => {
    const { rows, selectedColumns } = this.state;
    if (rows) {
      const filteredRows = rows.map(row => 
        row.filter((_, index) => selectedColumns[index])
      );
      this.setState({ filteredRows });
    }
  };
  
  togglePieChartDisplay = () => {
    this.setState(prevState => ({
      showPieChart: !prevState.showPieChart,
    }));
  };
  
  fileHandler = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      // Check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
        this.setState({
          isFormInvalid: false
        });
        this.renderFile(fileObj);
      } else {
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        });
      }
    }
  }

  render() {
    const { dataLoaded, cols, secondRowValues, filteredRows } = this.state;

    // const pieChartData = {
    //   labels: this.state.cols.filter((_, index) => this.state.selectedColumns[index]).map(col => col.name),
    //   datasets: [{
    //     data: this.state.filteredRows.map(row => /* Logic to aggregate/count data for each selected column */),
    //     backgroundColor: [/* Array of color strings for each data point */],
    //   }],
    // };

    return (
      <Flex
        direction="column"
        minH="70vh"
        alignItems="center"
        justifyContent="space-between"
        w="full"
        py="16"
      >

<Box
          p="4"
          mb="8"
          bg="blackAlpha.200" // Light blue background
          borderRadius="lg"
          borderWidth="1px"
          borderColor="blue.200" // Light blue border
          textAlign="center"
          width="full" // Takes the full width of its parent
          maxWidth="md" // Maximum width
        >
          <label htmlFor='file-upload'>
            <Icon as={FaUpload} boxSize={14} color="blue.600" mb="5" cursor="pointer" />
          </label>
          <Input
            id='file-upload'
            type="file"
            onChange={this.fileHandler}
            accept=".xlsx, .xls"
            style={{ display: 'none' }}
            ref={this.fileInput}
          />
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            Let's get started!
          </Text>
          <Text color="gray.600">Upload an Excel file to proceed.</Text>
        </Box>
        {/* <Box textAlign="center">
          <label htmlFor='file-upload'>
            <Icon as={FaUpload} boxSize={14} color="blue.600" mb="5" cursor="pointer" />
          </label>
          <Input
            id='file-upload'
            type="file"
            onChange={this.fileHandler}
            accept=".xlsx, .xls"
            style={{ display: 'none' }}
            ref={this.fileInput}
          />
          <Text>Let's get started! Upload an Excel file to proceed.</Text>
        </Box> */}
        <Spacer />
        {this.state.dataLoaded && 
        
        <Box overflowX="auto" mt="4">
            <table className="ExcelTable2007">
              <thead>
                {this.state.cols.map((col, index) => <th key={index}>{col.name}</th>)}
              </thead>
              <tbody>
                {this.state.rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, index) => <td key={index}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        
        }

        {/* Render checkboxes for the second row's values */}
      {this.state.dataLoaded && this.state.secondRowValues.length > 0 && (
        <Box mt="4" width="full" textAlign="center">
          <Text fontSize="lg" mb="2">Choose the columns you want to display:</Text>
          {this.state.secondRowValues.map((value, index) => (
            <label key={index}>
              <input type="checkbox" value={value} 
              onChange={e => this.handleChange(index, e.target.checked)}
              /> {value}
              <br />
            </label>
          ))}
          <Button mt="4" colorScheme="blue" onClick={this.handleDisplaySelectedColumns}>Display Selected Columns</Button>
          <Button mt="4" colorScheme="blue" onClick={this.togglePieChartDisplay}>Display Pie Chart</Button>
        </Box>
      )}
     
      {/* Display the table based on selected columns */}
      {dataLoaded && filteredRows && (
        <Box overflowX="auto" mt="4">
          <table className="ExcelTable2007">
            <thead>
              {cols.map((col, index) => this.state.selectedColumns[index] && <th key={index}>{col.name}</th>)}
            </thead>
            <tbody>
              {filteredRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}

       {/* {this.state.showPieChart && (
        <Box mt="4">
          <Pie data={pieChartData} />
        </Box>
      )} */}
    <div id="excel_data" class="mt-5"></div>
    </Flex>
  );

  }
}

export default About;