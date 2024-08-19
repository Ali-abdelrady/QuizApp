import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
    const { points, totalPoints, dispatch } = useQuiz();
    const percentage = (points / totalPoints) * 100
    return <div>
        <p className="result" >
            You scored {points} out of {totalPoints} ({Math.ceil(percentage)}%)
        </p>
        <div className="highscore">
            (Hishscore: X points)
        </div>
        <button className="btn btn-ui" onClick={() => dispatch({ type: 'startQuiz' })}>Restart quiz</button>
    </div>;
}