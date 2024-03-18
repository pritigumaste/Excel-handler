import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelHandler = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const renderTable = () => {
    if (excelData.length === 0) return null;

    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-4">
          <thead className="thead-dark">
            {excelData.slice(0, 1).map((headerRow, rowIndex) => (
              <tr key={rowIndex}>
                {headerRow.map((cell, cellIndex) => (
                  <th key={cellIndex}>{cell}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {excelData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Excel Handler Tool</h1>
          <p className="text-center">Upload an Excel file to display its data.</p>
          <div className="card">
            <div className="card-header"><strong>Select Excel File</strong></div>
            <div className="card-body">
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="excel_file" onChange={handleFileChange} />
                <label className="custom-file-label" htmlFor="excel_file">Choose file</label>
              </div>
            </div>
          </div>
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

export default ExcelHandler;
