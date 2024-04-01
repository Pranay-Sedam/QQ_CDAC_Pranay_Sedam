import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { saveAs } from 'file-saver';

import './OCRComponent.css';

function OCRComponent() {
  const [imageFile, setImageFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const performOCR = () => {
    if (!imageFile) return;

    Tesseract.recognize(
      imageFile,
      'eng', // language
      { logger: (m) => console.log(m) } // optional logger
    ).then(({ data: { text } }) => {
      setExtractedText(text);
    });
  };

  const downloadAsDoc = (text, fileName) => {
    const htmlContent = `<html><body><p>${text}</p></body></html>`;
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    saveAs(blob, fileName);
  };

  const handleDownloadClick = () => {
    const customFileName = prompt('Enter file name:', 'extracted_text.doc');
    if (customFileName) {
      downloadAsDoc(extractedText, customFileName);
    }
  };

  return (
    <div className="ocr-container">
      <h1>Image to Text OCR</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={performOCR}>Extract Text</button>
      {extractedText && (
        <div className="extracted-text">
          <h2>Extracted Text:</h2>
          <p>{extractedText}</p>
          <button onClick={handleDownloadClick}>Download as Doc</button>
        </div>
      )}
    </div>
  );
}

export default OCRComponent;
