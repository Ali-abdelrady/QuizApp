import { useQuiz } from "../contexts/QuizContext";

export default function Progress() {
    const { index, numQuestions, points, totalPoints } = useQuiz();
    return <header className="progress">
        <progress max={numQuestions} value={index} />
        <span>Question <strong>{index + 1} </strong> / {numQuestions}</span>
        <span><strong>{points} </strong> / {totalPoints}</span>
    </header>
}