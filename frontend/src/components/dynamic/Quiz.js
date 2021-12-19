
import"../componentCss/MainComponents/Quiz.css";

import React, { useState, useEffect} from "react";
import { useParams } from "react-router";

import "../componentCss/site.css";
import "../componentCss/MainComponents/Lecture.css";

import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../constants/firebase-config";
import { UpEachWord } from "../../helpers/helpers";


export default function Quiz() {
	const question = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

     //States
  const [questions, setQuestion] = useState({questions:
	[

		{
			questionText: '',
			answerOptions: [
				{ answerText: '', isCorrect: false },
				{ answerText: '', isCorrect: false },
				{ answerText: '', isCorrect: true },
				{ answerText: '', isCorrect: false },
			],
		},
	  ]
	});

  

  //Params
  const {coursename, name } = useParams();
  
  //useEffects
  useEffect(() => {
    getidQuizData();
  }, [coursename]);
  console.log(coursename);

 


  const getidQuizData = async () => {
    const parent_course = coursename
	console.log("function:",parent_course);
    const q = query(collection(db, "quizzes"), where("parent_course", "==", parent_course));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log("sorular",doc.data());
        doc.data() !== undefined
          ? setQuestion(doc.data())
          : setQuestion({ questionText: "olmuyor" });
      });
};

console.log("questions",questions.questions[0]);


 
////////////////////////////////
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
        <div className='wraper'> 
            <div className='quizdiv'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.questions.length}
						</div>
						<div className='question-text'>{questions.questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions.questions[currentQuestion].answerOptions.map((answerOption) => (
							<button className="quizbutton"onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
        </div>
		
	);
}
