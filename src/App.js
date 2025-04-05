import React from 'react';
import './App.css';
import MatrixTyping from './components/MatrixTyping';

function App() {
  const messages = {
    en: [
      "The void whispers...",
      "Shadows dance in silence",
      "Time flows like water",
      "Thoughts ripple through space",
      "Light bends around darkness",
      "Echoes of forgotten dreams",
      "The path unwinds before you",
      "Silence speaks in riddles",
      "The moment is eternal"
    ],
    by: [
      "Пустата шапчэ...",
      "Цені танцуюць у цішы",
      "Час цячэ як вада",
      "Думкі пульсуюць у прасторы",
      "Святло згінаецца вакол цемры",
      "Рэха забытых сноў",
      "Шлях разгортваецца перад табой",
      "Ціша гаворыць загадкамі",
      "Момант вечны"
    ]
  };

  return (
    <div className="App">
      <MatrixTyping messages={messages} language="en" />
    </div>
  );
}

export default App; 