export default function QuizStarter({ numQuestions, onStart }) {
    return <>
        <h2>Welcome to The React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastery</h3>
        <button className="btn btn-ui" onClick={onStart}>Let's start!</button>
    </>
}