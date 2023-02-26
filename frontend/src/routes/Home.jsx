import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"
import Container from "../components/Container";
import axios from "axios";

const Home = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);
  const [orignalMtl, setOrignalMtl] = useState(null);
  const [secondMtl, setSecondMtl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://127.0.0.1:5000/",
      {
        file1: originalFile,
        file2: secondFile,
        mtl1: orignalMtl,
        mtl2: secondMtl,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.error) {
      setError(response.data.error);
      return;
    }

    console.log(response)
    const { similarity } = response.data;

    navigate(`/result`, { state: { similarity }});
  };

  const handleOriginalFile = (e) => {
    if (e.target.files) {
      setOriginalFile(e.target.files[0]);
    }
  };

  const handleSecondFile = (e) => {
    if (e.target.files) {
      setSecondFile(e.target.files[0]);
    }
  };

  const handleOrignalMtl = (e) => {
    if (e.target.files) {
      setOrignalMtl(e.target.files[0]);
    }
  };

  const handleSecondMtl = (e) => {
    if (e.target.files) {
      setSecondMtl(e.target.files[0]);
    }
  };

  return (
    <div>
      <main className="max-w-xl mx-auto my-20">
        <div className="flex justify-center">
          <ClipLoader loading={loading} />
        </div>
        <div className="text-center text-slate-600">
          Upload two .obj files below and our algorithm will tell you if the 3d
          Model has been plagiarised
        </div>
        <Container>
          {error && (
            <p className="text-center p-2 mb-5 bg-red-100 border-2 border-red-400 rounded-md">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
            <label>Original File: </label>
            <input type="file" onChange={handleOriginalFile} />
            <label>Second File: </label>
            <input type="file" onChange={handleSecondFile} />
            <label>Orignal mtl:</label>
            <input type="file" onChange={handleOrignalMtl}></input>
            <label>Second Mtl: </label>
            <input type= "file" onChange={handleSecondMtl} />
            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white rounded-md p-3"
            >
              Check for Plagiarism
            </button>
          </form>
        </Container>
      </main>
    </div>
  );
};

export default Home;