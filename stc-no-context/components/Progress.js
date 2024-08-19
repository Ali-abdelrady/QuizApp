export default function Progress({ index, numQuestions, totalPoints, points }) {
    return <header className="progress">
        <progress max={numQuestions} value={index} />
        <span>Question <strong>{index + 1} </strong> / {numQuestions}</span>
        <span><strong>{points} </strong> / {totalPoints}</span>
    </header>
}