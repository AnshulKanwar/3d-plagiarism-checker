import { useLocation } from "react-router-dom";
import Container from "../components/Container";
import Scene from "../components/Model";
import model1 from "../../../backend/uploads/model1.obj";
import model2 from "../../../backend/uploads/model2.obj";

const Result = () => {
  const { state: { similarity } } = useLocation()

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
              <Scene model={model1} />
            </div>
          </div>
          <div className="text-center">
            <span className="font-bold text-lg">Second</span>
            <div className="rounded-md overflow-hidden">
              <Scene model={model2} />
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h1 className="text-xl font-bold my-2">Similarities</h1>
          <div className="grid grid-cols-2 grid-rows-3 gap-5">
            <div className="bg-slate-300 w-full aspect-square"></div>
            <div className="bg-slate-300 w-full aspect-square"></div>
            <div className="bg-slate-300 w-full aspect-square"></div>
            <div className="bg-slate-300 w-full aspect-square"></div>
            <div className="bg-slate-300 w-full aspect-square"></div>
            <div className="bg-slate-300 w-full aspect-square"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;
