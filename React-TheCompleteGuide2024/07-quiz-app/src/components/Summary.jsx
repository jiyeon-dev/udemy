import quizCompleteImage from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function Summary({ userAnswers }) {
  const stats = {
    skipped: 0,
    correctly: 0,
    incorrectly: 0,
  };
  userAnswers.map((answer, index) => {
    if (answer === null) stats.skipped += 1;
    else if (QUESTIONS[index].answers[0] === answer) stats.correctly += 1;
    else stats.incorrectly += 1;
  });

  const skippedAnswer = Math.round((stats.skipped / userAnswers.length) * 100);
  const correctAnswer = Math.round(
    (stats.correctly / userAnswers.length) * 100
  );
  const incorrectAnswer = Math.round(
    (stats.incorrectly / userAnswers.length) * 100
  );

  return (
    <div id='summary'>
      <img src={quizCompleteImage} />
      <h2>Quiz Completed!</h2>

      <div id='summary-stats'>
        <p>
          <span className='number'>{skippedAnswer}%</span>
          <span className='text'>skipped</span>
        </p>
        <p>
          <span className='number'>{correctAnswer}%</span>
          <span className='text'>answered correctly</span>
        </p>
        <p>
          <span className='number'>{incorrectAnswer}%</span>
          <span className='text'>answered incorrectly</span>
        </p>
      </div>

      <ol>
        {userAnswers.map((answer, index) => {
          const classes =
            answer === null
              ? "skipped"
              : answer === QUESTIONS[index].answers[0]
              ? "correct"
              : "wrong";

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className='question'>{QUESTIONS[index].text}</p>
              <p className={`user-answer ${classes}`}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
