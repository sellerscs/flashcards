import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);


  useEffect(() => {
    fetch('https://opensheet.elk.sh/1XVzAKIEB71DdcHChXd47Ms3NJ6FBpuTs23E0HwXlNaU/quiz_data')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((row, index) => {
          const choices = [row.Answer, row.Choice1, row.Choice2, row.Choice3];
          // Shuffle choices
          const shuffled = choices.sort(() => Math.random() - 0.5);
          return {
            id: `q${index + 1}`,
            question: row.Question,
            answer: row.Answer,
            category: row.Category,
            choices: shuffled,
          };
        });
        setFlashcards(formatted);
      })
      .catch((err) => {
        console.error("Error fetching data from Google Sheets: ", err);
      });
  }, []);

  const nextCard = () => {
    if (flashcards.length === 0) return;
    setSelectedChoice(null);
    setIsCorrect(null);
    setCurrent((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    if (flashcards.length === 0) return;
    setSelectedChoice(null);
    setIsCorrect(null);
    setCurrent((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };


  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 px-4 py-10">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Flashcard Quiz</h1>

          {/*This is the flashcard area */}
          {flashcards.length > 0 ? (
            <div className="mb-4">
              <p className="text-lg font-medium mb-4">{flashcards[current].question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flashcards[current].choices.map((choice, index) => (
                  <button
                    key={index}
                    className={`w-full px-4 py-2 rounded border text-left ${selectedChoice
                        ? choice === flashcards[current].answer
                          ? "bg-green-200 border-green-400"
                          : choice === selectedChoice
                            ? "bg-red-200 border-red-400"
                            : "bg-gray-100"
                        : "bg-white hover:bg-gray-100"
                      }`}
                    disabled={selectedChoice !== null}
                    onClick={() => {
                      setSelectedChoice(choice);
                      setIsCorrect(choice === flashcards[current].answer);
                    }}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              {selectedChoice && (
                <p className="mt-4 text-sm text-gray-600">
                  {isCorrect ? "✅ Correct!" : `❌ Incorrect. The correct answer is "${flashcards[current].answer}".`}
                </p>
              )}
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
