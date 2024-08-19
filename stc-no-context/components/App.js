import Header from "./Header"
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from './StartScreen'
import { act, useEffect, useReducer, useState } from "react"
import Question from "./Question";
import Progress from "./Progress";
import Timer from "./Timer";
import NextBtn from "./NextBtn";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
const intitalState = {
  questions: [],
  status: 'loading',
  index: 0,
  points: 0,
  answer: null,
  secondsRemaining: null,
}
function reducer(state, action) {
  switch (action.type) {
    case 'dataRecevied':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return {
        ...state,
        status: "error",
      };
    case 'startQuiz':
      return {
        ...state,
        status: 'active',
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: 300
      }
    case 'newAnswer':
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status: state.index + 1 === state.questions.length ? "finish" : 'active'
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining ? state.status : 'finish',
      }
    default:
      throw new Error("Action unknown");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, intitalState)
  const { questions, status, index, points, answer, secondsRemaining } = state;
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, question) => {
    return acc + question.points;
  }, 0);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        if (!res.ok) throw new Error('Questions not found');
        const data = await res.json();
        dispatch({ type: 'dataRecevied', payload: data });
      }
      catch (err) {
        dispatch({ type: 'dataFailed' });
      }
    }
    fetchQuestions();
  }, [])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} onStart={() => dispatch({ type: 'startQuiz' })} />}
        {status === 'active' && <>
          <Progress numQuestions={numQuestions} totalPoints={totalPoints} points={points} index={index} />
          <Question question={questions[index]} dispatch={dispatch} answer={answer} />
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextBtn dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} />
          </Footer>
        </>}
        {status === 'finish' && <FinishScreen points={points} totalPoints={totalPoints} dispatch={dispatch} />}
      </Main>
    </div>
  );
}


