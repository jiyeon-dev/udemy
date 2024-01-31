import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  let timer = 10000; // 답이 선택된 경우 타이머 업데이트를 위해 변수 추가, 질문에 설정한 시간의 기본 최대값

  if (answer.selectedAnswer) timer = 1000; // 답변 선택했을 때 Timeout 시간
  if (answer.isCorrect !== null) timer = 2000; // 답변 선택했을 때 결과 보여주는 시간

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer ? "correct" : "wrong",
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  // 답변 여부
  const answerState =
    answer.selectedAnswer && answer.isCorrect !== null
      ? answer.isCorrect
      : answer.selectedAnswer !== ""
      ? "answered"
      : "";

  return (
    <div id='question'>
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
