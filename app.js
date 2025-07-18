import React, { useState } from 'react';

const quizData = [
  { text: "クジラは魚類である", answer: false },
  { text: "ライオンはネコ科の動物である。", answer: true },
  { text: "ペンギンは空を飛べる。", answer: false },
  { text: "ダチョウは空を飛べる。", answer: false },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswer = (userAnswer) => {
    const correct = userAnswer === quizData[currentIndex].answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    if(correct) setScore(score + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setCurrentIndex(currentIndex + 1);
  };

  if (currentIndex >= quizData.length) {
    return (
      <div id="quiz-app">
        <h2>クイズ終了！</h2>
        <p>あなたのスコアは {score} / {quizData.length} です。</p>
      </div>
    );
  }

  return (
    <div id="quiz-app">
      <h2>{quizData[currentIndex].question}</h2>

      {!showFeedback ? (
        <div className="btn-grid">
          <button onClick={() => handleAnswer(true)}>〇</button>
          <button onClick={() => handleAnswer(false)}>×</button>
        </div>
      ) : (
        <>
          <div id="feedback" className={isCorrect ? "correct" : "incorrect"}>
            {isCorrect ? "正解！" : "不正解…"}
          </div>
          <button style={{ marginTop: 20 }} onClick={handleNext}>
            {currentIndex + 1 === quizData.length ? "結果を見る" : "次の問題へ"}
          </button>
        </>
      )}
    </div>
  );
}

