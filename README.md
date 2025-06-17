# Flashcard Quiz App

A simple React-based flashcard quiz application that dynamically loads quiz questions from a publicly shared Google Sheet using the [OpenSheet](https://opensheet.elk.sh/) API. Users can cycle through flashcards, click to reveal answers, and test their knowledge in a clean, responsive UI.

## Features

- Loads flashcard data from a Google Sheet
- Click to toggle between question and answer
- Randomized multiple-choice options (internally shuffled)
- Previous/Next card navigation
- Responsive, mobile-friendly design with TailwindCSS

## Tech Stack

- React
- TailwindCSS
- OpenSheet API for Google Sheets integration

## Google Sheet Data Format

Your sheet should have the following columns (case-sensitive):

| Question | Answer | Choice1 | Choice2 | Choice3 |
|----------|--------|---------|---------|---------|
| What is 2+2? | 4 | 3 | 5 | 2 |

Your app fetches from the following URL (replace with your own if needed):
https://opensheet.elk.sh/1XVzAKIEB71DdcHChXd47Ms3NJ6FBpuTs23E0HwXlNaU/quiz_data


## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/flashcard-quiz.git
cd flashcard-quiz
```
2. Install dependencies:

```bash
npm install
```
3. Start the development server:

```bash
npm run dev
```

## How It Works

- On load, the app fetches flashcard data from the provided Google Sheet.
- Flashcards are displayed one at a time.
- Clicking the card toggles between showing the question and the answer.
- Navigation buttons allow cycling forward and backward through the deck.

## Customization

1. Update the Google Sheet link in the fetch() call inside App.jsx.
2. Ensure your new sheet uses the correct column headers.

To modify styles, edit index.css or customize the Tailwind classes directly in the component.

## Error Handling

If the app fails to load flashcards, an error will be printed to the console. Make sure:
- Your Google Sheet is published to the web and accessible.
- The sheet format matches the expected structure.
