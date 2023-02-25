import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/result")
  };

  return (
    <div>
      <main className="max-w-xl mx-auto mt-48">
        <div className="text-center text-slate-600">
          Upload two .obj files below and our algorithm will tell you if the 3d
          Model has been plagiarised
        </div>
        <Container>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
            <label>Original File: </label>
            <input type="file" name="file1" />
            <label>Second File: </label>
            <input type="file" name="file2" />
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
