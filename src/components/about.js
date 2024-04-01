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
      secondRowValues: [], 
      selectedColumns: {},
      filteredRows: null,
      showPieChart: false,
      showColumns: false
    };
    this.fileInput = React.createRef();
    this.chartRef = React.createRef();
    this.preparePieChartData = this.preparePieChartData.bind(this);
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
    })
    )
  }
  
  handleDisplaySelectedColumns = () => {
    const { rows, selectedColumns } = this.state;
    this.setState({
      showColumns: true,
      showPieChart: false, 
    });
    if (rows) {
      const filteredRows = rows.map(row => 
        row.filter((_, index) => selectedColumns[index])
      );
      this.setState({ filteredRows });
    }
    
  };
  
  

  // componentDidUpdate(prevProps, prevState) {
  //   // Check if the selectedColumns state has changed
  //   if (this.state.selectedColumns !== prevState.selectedColumns) {
  //     this.preparePieChartData();
  //   }
  // }
  
  preparePieChartData = () => {
    const { rows, selectedColumns } = this.state;
  
    
    const selectedIndices = Object.keys(selectedColumns).filter(index => selectedColumns[index]).map(Number);
  
    if (rows && selectedIndices.length > 0) {
     
      const labelIndex = selectedIndices[0];
      let data = {};
      let chartLabels = [];
      let chartData = [];
      
      
      if (selectedIndices.length === 1) {
        data = rows.slice(1).reduce((acc, row) => {
          const label = row[labelIndex];
          acc[label] = (acc[label] || 0) + 1;
          return acc;
        }, {});
      } 
     
      else {
        const dataIndex = selectedIndices[1];
        data = rows.slice(1).reduce((acc, row) => {
          const label = row[labelIndex];
          const value = parseFloat(row[dataIndex]);
          if (!isNaN(value)) { 
            acc[label] = (acc[label] || 0) + value;
          }
          return acc;
        }, {});
      }
  
      chartLabels = Object.keys(data);
      chartData = Object.values(data);
  
      
      const backgroundColors = chartLabels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
  
      
      this.setState({
        showColumns: false,
        showPieChart: true,
         
        pieChartData: {
          labels: chartLabels,
          datasets: [{
            data: chartData,
            backgroundColor: backgroundColors,
          }]
        },
        filteredRows: null
      });
    } else {
      console.warn('Please select at least one column for the pie chart.');
    }
  }
  
  downloadChart = () => {
    
    if (this.chartRef && this.chartRef.current) {
      const canvas = this.chartRef.current.canvas;
      const imageUrl = canvas.toDataURL('image/png');
      
    
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = 'pie-chart.png'; 
  
     
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  
  
  fileHandler = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      
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
          bg="blackAlpha.200"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="blue.200" 
          textAlign="center"
          width="full" 
          maxWidth="md" 
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
        <Box mt="4" 
          p="4"
          mb="8"
          bg="blackAlpha" 
          borderRadius="lg"
          borderWidth="1px"
          //borderColor="blue.200" // Light blue border
          textAlign="left"
          width="full"
          maxWidth="md" 
        >
          <Text fontSize="lg" mb="2" color= "blue.600">Choose the columns you want to display:</Text>
          {this.state.secondRowValues.map((value, index) => (
            <label key={index}>
              <input type="checkbox" value={value} 
              onChange={e => this.handleChange(index, e.target.checked)}
              /> {value}
              <br />
            </label>
          ))}
          <Button mt="4" colorScheme="blue" onClick={this.handleDisplaySelectedColumns}  mr="4">Display Selected Columns</Button>
          <Button mt="4" colorScheme="blue" onClick={this.preparePieChartData}>Display Pie Chart</Button>
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

    {this.state.showPieChart && this.state.pieChartData && (
      <Box mt="4" display="flex" flexDirection="column" alignItems="center">
        {/* //<Pie data={this.state.pieChartData} /> */}
        <Pie ref={this.chartRef} data={this.state.pieChartData} />

        <Button colorScheme="blue" onClick={this.downloadChart} mt="10" ml="6" mr="10">Download Chart</Button>
       </Box>
    )}
  
  

    <div id="excel_data" class="mt-5"></div>
    </Flex>
  );

  }
}

export default About;