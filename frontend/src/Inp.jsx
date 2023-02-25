import React, { useState } from 'react';
import axios from 'axios';

function Inp() {
  const [formData, setFormData] = useState({
    file1: null,
    file2: null
  });

  function handleChange(event) {
    if (event.target.name === 'file1') {
      setFormData({
        ...formData,
        file1: event.target.files[0]
      });
      console.log(formData.file1);
    }
    else {
        setFormData({
            ...formData,
            file2: event.target.files[0]
        });
        console.log(formData.file2);
    }
  }

  const [reply, setReply] = useState({  });

  async function handleSubmit(event) {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('file1', formData.file1);
    formDataToSend.append('file2', formData.file2);
    try {
      const response = await axios.post('http://127.0.0.1:5000', formDataToSend);
      console.log(response.data);
      setReply(response.data);
      // do something with the response, like show a success message
    } catch (error) {
      console.error(error);
      // handle the error, like showing an error message
    }
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
        <label>
            File1:
            <input type="file" name="file1" onChange={handleChange} />
        </label>
        <label>
            File2:
            <input type="file" name="file2" onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
        </form>
        {reply && (
            <div>
                <p>similarity: {reply.similarity}</p>
            </div>
        )}
    </>
  );
}

export default Inp;
