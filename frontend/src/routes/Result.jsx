import { useLocation } from "react-router-dom";
import Container from "../components/Container";
import Scene from "../components/Model";

const Result = () => {
  const { state: { similarity,image_gen } } = useLocation()

  return (
    <div className="my-20">
      <main className="max-w-3xl mx-auto">
        <Container>
          <div className="text-center">
            {similarity >= 0.7 ? (
              <h1 className="text-red-500 text-2xl font-bold mb-5">
                Plagiarised
              </h1>
            ) : (
              <h1 className="text-green-500 text-2xl font-bold mb-5">
                Not Plagiarised
              </h1>
            )}
            <p>
              Both the models are <u>{similarity * 100}%</u> similar
            </p>
          </div>
        </Container>
        <div className="flex mt-10 gap-1 justify-center">
          <div className="text-center">
            <span className="font-bold text-lg">Original</span>
            <div className="rounded-md overflow-hidden">
              <Scene model={"http://127.0.0.1:5000/uploads/model1.obj"} />
            </div>
          </div>
          <div className="text-center">
            <span className="font-bold text-lg">Second</span>
            <div className="rounded-md overflow-hidden">
              <Scene model={"http://127.0.0.1:5000/uploads/model2.obj"} />
            </div>
          </div>
        </div>
        {image_gen &&(
        <div className="mt-20">
          <h1 className="text-xl font-bold my-2">Similarities</h1>
          <div className="grid grid-cols-1 gap-5">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <img
                className="bg-slate-300 h-96  w-auto"
                src={`http://127.0.0.1:5000/results/${idx}.jpg`}
              ></img>
            ))}
          </div>
        </div>
        )}
      </main>
    </div>
  );
};

export default Result;
