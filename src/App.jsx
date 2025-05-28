import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch('https://opensheet.elk.sh/1XVzAKIEB71DdcHChXd47Ms3NJ6FBpuTs23E0HwXlNaU/quiz_data')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((row, index) => ({
          id: `q${index + 1}`,
          question: row.Question,
          answer: row.Answer,
          category: row.Category,
        }));
        setFlashcards(formatted);
      })
      .catch((err) => {
        console.error("Error fetching data from Google Sheets: ", err);
      });
  }, []);

  const nextCard = () => {
    if (flashcards.length === 0)
        return;
    setShowAnswer(false);
    if (current < flashcards.length - 1)
      setCurrent(current + 1)
    else
      setCurrent(0);
  }

  const prevCard = () => {
    if (flashcards.length === 0)
        return;
    setShowAnswer(false);
    if (current > 0)
      setCurrent(current - 1)
    else
      setCurrent(flashcards.length - 1);
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 px-4 py-10">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Flashcard Quiz</h1>

          {/*This is the flashcard area */}
          {flashcards.length > 0 ? (
            <div 
              className="border border-gray-300 rounded-lg p-6 mb-4 bg-gray-50 hover:bg-gray-100"
              onClick={() => setShowAnswer(!showAnswer)}
            >
            <p className="text-lg">
              {showAnswer ? flashcards[current].answer : flashcards[current].question}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              (Click to {showAnswer ? "hide" : "reveal"} answer)
            </p>
          </div>
          ) : (
            <p className="text-gray-600 mb-6">Loading flashcards...</p>
          )}
          

          <div className="flex justify-between gap-4">
            <button 
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
              onClick={prevCard}  
            >
              Previous
            </button>
            <button 
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
              onClick={nextCard}
            >
              Next
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Card {current + 1} of {flashcards.length}
          </p>
        </div>
      </div>
    </>
  )
}

export default App
