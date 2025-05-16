import React, { useState } from "react";
import "./Quiz.css";

const questions = [
  {
    question: "Which of the following is a common sign of a phishing email?",
    options: [
      "Proper grammar and spelling",
      "Unexpected attachments",
      "Known sender and context",
      "Secure https link",
    ],
    answer: 1,
  },
  {
    question: "What should you do if you suspect a phishing email?",
    options: [
      "Forward it to everyone",
      "Click all the links to check",
      "Report to IT/Security team",
      "Reply and ask for confirmation",
    ],
    answer: 2,
  },
];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (index) => {
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    setSubmitted(true);
  };

  const nextQuestion = () => {
    setCurrent(current + 1);
    setSelected(null);
    setSubmitted(false);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="quiz-container">
      {current < questions.length ? (
        <>
          <h2 className="quiz-title">Phishing Awareness Quiz</h2>
          <div className="quiz-box">
            <p className="question">{questions[current].question}</p>
            <ul className="options">
              {questions[current].options.map((option, index) => (
                <li
                  key={index}
                  className={`option ${selected === index ? "selected" : ""}`}
                  onClick={() => handleOptionClick(index)}
                >
                  {option}
                </li>
              ))}
            </ul>
            {!submitted ? (
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={selected === null}
              >
                Submit
              </button>
            ) : (
              <>
                <p
                  className={`result ${
                    selected === questions[current].answer ? "correct" : "wrong"
                  }`}
                >
                  {selected === questions[current].answer
                    ? "Correct!"
                    : "Incorrect"}
                </p>
                <button className="next-btn" onClick={nextQuestion}>
                  Next Question
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="quiz-result">
          <h2>Quiz Completed!</h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <button className="restart-btn" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
