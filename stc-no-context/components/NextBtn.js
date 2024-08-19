export default function NextBtn({ dispatch, answer, numQuestions, index }) {
    if (answer === null) return null;
    return <button
        className="btn btn-ui "
        onClick={() => dispatch({ type: 'nextQuestion' })}
    >
        {index + 1 === numQuestions ? 'Finish' : 'Next'}
    </button>
}