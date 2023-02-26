import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import Container from "../components/Container";
import axios from "axios";

const Home = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post(
      "http://127.0.0.1:5000/",
      {
        file1: originalFile,
        file2: secondFile,
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

    const { similarity, image_gen } = response.data;
    setLoading(false);
    navigate(`/result`, { state: { similarity, image_gen } });
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

  return (
    <div>
      <main className="max-w-xl mx-auto my-16">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
            Placky
          </h1>
          <h2 className="text-lg">Plagiarism Checker for 3D Objects</h2>
        </div>
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid place-items-center h-full bg-black/[.6]">
              <BounceLoader loading={loading} color="#b49bfc" />
            </div>
          </div>
        )}
        <div className="text-center text-slate-600 font-semibold">
          Upload two .obj files below and our algorithm will tell you if the 3d
          Model has been plagiarized
        </div>
        <Container>
          {error && (
            <p className="text-center p-2 mb-5 bg-red-100 border-2 border-red-400 rounded-md">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
            <label>Original File: </label>
            <input
              type="file"
              onChange={handleOriginalFile}
              className="
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
            />
            <label>Second File: </label>
            <input
              type="file"
              onChange={handleSecondFile}
              className="
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
            "
            />
            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white rounded-md p-3
              bg-gradient-to-r from-indigo-300 to-purple-400
              "
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
