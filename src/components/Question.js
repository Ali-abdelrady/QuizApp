import { useQuiz } from "../contexts/QuizContext"
import Options from "./Options"
export default function Question() {
    const { index, questions, answer } = useQuiz();
    const question = questions[index];
    return <div>
        <div>
            <h4>{question.question}</h4>
            <Options question={question} answer={answer} />
        </div>
    </div >
}
