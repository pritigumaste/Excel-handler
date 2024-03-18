// ExcelReader.js
import * as XLSX from 'xlsx';

export const ExcelReader = (file, callback) => {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(worksheet, {header:1});
    console.log(sheetData)
    callback(sheetData); // Pass the processed data back via callback
  };
  
  reader.readAsArrayBuffer(file);
};
