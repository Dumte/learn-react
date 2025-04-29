import React, { useState, useEffect } from "react";

const Quiz = () => {
  // Mock data for specializations
  const mockSpecializations = [
    { id: "frontend", name: "Frontend Development" },
    { id: "backend", name: "Backend Development" },
    { id: "devops", name: "DevOps" },
    { id: "data-science", name: "Data Science" },
  ];

  // Mock questions for each specialization
  const mockQuestions = {
    frontend: [
      {
        question: "What does JSX stand for in React?",
        options: [
          "JavaScript XML",
          "JavaScript Extension",
          "JavaScript Syntax",
          "JavaScript Xylophone",
        ],
        correctAnswer: "JavaScript XML",
      },
      {
        question: "Which hook is used to perform side effects in React?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: "useEffect",
      },
    ],
    backend: [
      {
        question: "What is the purpose of middleware in Express.js?",
        options: [
          "To connect to databases",
          "To handle requests and responses",
          "To create API routes",
          "To serve static files",
        ],
        correctAnswer: "To handle requests and responses",
      },
    ],
    devops: [
      {
        question: "What is the main purpose of Docker?",
        options: [
          "Virtual machine management",
          "Containerization",
          "Cloud computing",
          "Continuous Integration",
        ],
        correctAnswer: "Containerization",
      },
    ],
    "data-science": [
      {
        question:
          "Which library is primarily used for data manipulation in Python?",
        options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
        correctAnswer: "Pandas",
      },
    ],
  };

  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  // Load questions when specialization changes
  useEffect(() => {
    if (selectedSpecialization) {
      const specializationQuestions = mockQuestions[selectedSpecialization] || [
        {
          question: `Sample question about ${selectedSpecialization}`,
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: "Option 1",
        },
      ];
      setQuestions(specializationQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizCompleted(false);
      setTimeLeft(30);
      setTimerActive(true);
    }
  }, [selectedSpecialization]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or end quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
      setTimerActive(false);
    }
  };

  const restartQuiz = () => {
    setSelectedSpecialization("");
    setQuestions([]);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const calculateRank = () => {
    if (questions.length === 0) return "Beginner";
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Expert";
    if (percentage >= 75) return "Advanced";
    if (percentage >= 50) return "Intermediate";
    return "Beginner";
  };

  // Specialization selection screen
  if (!selectedSpecialization) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
            Welcome to Tech Quiz
          </h1>
          <div className="mb-6">
            <label
              htmlFor="specialization"
              className="block text-lg text-gray-700 mb-3"
            >
              Select your area of specialization:
            </label>
            <select
              id="specialization"
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-lg"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              <option value="">-- Select Specialization --</option>
              {mockSpecializations.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setSelectedSpecialization(selectedSpecialization)}
            disabled={!selectedSpecialization}
            className={`w-full py-3 rounded-lg text-white text-lg font-medium ${
              selectedSpecialization
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz completion screen
  if (quizCompleted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
            Quiz Results
          </h1>
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-purple-600 mb-4">
              {score}/{questions.length}
            </div>
            <div className="text-2xl mb-6">
              Rank: <span className="font-bold">{calculateRank()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
              <div
                className="bg-purple-600 h-4 rounded-full"
                style={{
                  width: `${
                    questions.length ? (score / questions.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <button
            onClick={restartQuiz}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium rounded-lg"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  // Current question
  const currentQuestion = questions[currentQuestionIndex];

  // Main quiz screen
  return (
    <div className="flex flex-col min-h-screen bg-blue-50 p-6">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {
                mockSpecializations.find((s) => s.id === selectedSpecialization)
                  ?.name
              }{" "}
              Quiz
            </h1>
            <div className="flex items-center space-x-6">
              <div
                className={`text-xl font-bold ${
                  timeLeft <= 5 ? "text-red-300" : "text-white"
                }`}
              >
                ⏱️ {timeLeft}s
              </div>
              <div className="text-xl">
                Question {currentQuestionIndex + 1}/{questions.length}
              </div>
              <div className="text-xl font-bold">🏆 {score}</div>
            </div>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-4">
            <div
              className="bg-white h-2 rounded-full"
              style={{
                width: `${
                  questions.length
                    ? ((currentQuestionIndex + 1) / questions.length) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            {currentQuestion?.question || "Loading question..."}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`p-4 text-lg border-2 rounded-xl transition-all duration-200 ${
                  selectedAnswer === option
                    ? "bg-purple-100 border-purple-500 scale-[1.02]"
                    : "border-gray-200 hover:bg-gray-50 hover:border-purple-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation Button */}
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`w-full py-4 rounded-lg text-white text-lg font-medium transition ${
              selectedAnswer
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {currentQuestionIndex < questions.length - 1
              ? "Next Question →"
              : "Finish Quiz 🎉"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
