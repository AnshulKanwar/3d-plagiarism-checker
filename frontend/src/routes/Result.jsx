import { useParams } from "react-router-dom";
import Container from "../components/Container";

const Result = () => {

  const { similarity } = useParams()

  return (
    <main className="max-w-xl mx-auto mt-48">
      <Container>
        <div className="text-center">
          <h1 className="text-red-500 text-2xl font-bold mb-5">Plagiarised</h1>
          <p>
            Both the models are <u>{similarity * 100}%</u> similar
          </p>
        </div>
      </Container>
    </main>
  );
};

export default Result;
