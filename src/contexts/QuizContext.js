import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
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
function QuizProider({ children }) {
    const [state, dispatch] = useReducer(reducer, intitalState)
    const numQuestions = state.questions.length;
    const totalPoints = state.questions.reduce((acc, question) => {
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
    return <QuizContext.Provider value={{ ...state, dispatch, numQuestions, totalPoints }}>
        {children}
    </QuizContext.Provider>
}
function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) throw new Error("The context used outside the Provider");
    return context;
}
export { QuizProider, useQuiz }