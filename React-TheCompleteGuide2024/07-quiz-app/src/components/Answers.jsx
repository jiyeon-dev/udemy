import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  // 답변 섞기
  if (shuffledAnswers.current === undefined) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id='answers'>
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let classes = "";
        if (answerState === "answered" && isSelected) {
          classes = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          classes = answerState;
        }

        return (
          <li className='answer' key={answer}>
            <button
              onClick={() => onSelect(answer)}
              className={classes}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
