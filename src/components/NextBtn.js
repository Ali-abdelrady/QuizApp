import { useQuiz } from "../contexts/QuizContext";

export default function NextBtn() {
    const { answer, dispatch, index, numQuestions } = useQuiz();
    if (answer === null) return null;
    return <button
        className="btn btn-ui "
        onClick={() => dispatch({ type: 'nextQuestion' })}
    >
        {index + 1 === numQuestions ? 'Finish' : 'Next'}
    </button>
}