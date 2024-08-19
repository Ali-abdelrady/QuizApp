import Header from "./Header"
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from './StartScreen'
import Question from "./Question";
import Progress from "./Progress";
import Timer from "./Timer";
import NextBtn from "./NextBtn";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const { status } = useQuiz();
  return (
      <div className="app">
        <Header />
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen />}
          {status === 'active' && <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextBtn />
            </Footer>
          </>}
          {status === 'finish' && <FinishScreen />}
        </Main>
      </div>
  );
}


