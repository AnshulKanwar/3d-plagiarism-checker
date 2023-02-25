import React, { useState } from 'react';

function Temp() {
  const [filePath, setFilePath] = useState('');

  function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setFilePath(event.target.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <p>Selected file: {filePath}</p>
    </div>
  );
}



