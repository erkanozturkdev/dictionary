"use client";

interface Question {
  id: string | number;
  question: string;
  answer: string;
  // ... diğer gerekli alanlar
}

export default function QuestionList({
  questions,
  currentQuestionIndex,
  goToQuestion,
}: {
  questions: Question[];
  currentQuestionIndex: number;
  goToQuestion: (index: number) => void;
}) {
  return (
    <div className="sticky top-0 bg-black p-4">
      <h2 className="text-3xl text-white mb-4">Soru Listesi</h2>
      <div className="flex flex-wrap">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`mx-1 p-2 rounded-lg ${
              currentQuestionIndex === index
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-white"
            } transition duration-300`}
            onClick={() => goToQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
