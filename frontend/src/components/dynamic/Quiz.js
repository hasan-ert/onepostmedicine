import "../componentCss/MainComponents/Quiz.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserData, getUserRef, updateUserData } from "../../api/user.API";
import "../componentCss/site.css";
import "../componentCss/MainComponents/Lecture.css";

import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { Grid } from "@mui/material";
import { db } from "../../constants/firebase-config";
import { UpEachWord } from "../../helpers/helpers";

export default function Quiz() {
  //States
  const [userRef, setUserRef] = useState();
  const [questions, setQuestion] = useState({
    questions: [
      {
        questionText: "",
        answerOptions: [
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: true },
          { answerText: "", isCorrect: false },
        ],
      },
    ],
  });

  //Params
  const { coursename, name } = useParams();

  //useEffects
  useEffect(() => {
    getidQuizData();
    getUserData().then((res) => {
      setUserRef(res);
    });
  }, [coursename]);

  const getidQuizData = async () => {
    const parent_course = coursename;
    console.log("function:", parent_course);
    const q = query(
      collection(db, "quizzes"),
      where("parent_course", "==", parent_course)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("sorular", doc.data());
      doc.data() !== undefined
        ? setQuestion(doc.data())
        : setQuestion({ questionText: "olmuyor" });
    });
  };

  console.log("questions", questions.questions[0]);

  ////////////////////////////////
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    isPassed();
  }, [showScore]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const isPassed = () => {
    debugger;
    if (score > (2 * questions.questions.length) / 3) {
      let temp = userRef;
      temp.unfinished_courses = userRef.unfinished_courses;
      temp.completed_courses = userRef.completed_courses;

      let unfinished_index = temp.unfinished_courses.indexOf(coursename);
      temp.unfinished_courses.splice(unfinished_index, 1);

      temp.completed_courses = [...temp.completed_courses, coursename];
      updateUserData(temp);
      alert("You passed the course!");
    }
  };

  function renderPage() {
    console.log(questions);
    debugger;
    if (questions.questions.length < 2) {
      return (
        <Grid
          container
          textAlign="center"
          justifyContent={"center"}
          marginTop="40px"
        >
          <h1>There are no quizzes for this course yet. Check it out later.</h1>
        </Grid>
      );
    } else {
      return (
        <div className="wraper">
          <div className="quizdiv">
            {showScore ? (
              <div className="score-section">
                You scored {score} out of {questions.questions.length}
              </div>
            ) : (
              <>
                <div className="question-section">
                  <div className="question-count">
                    <span>Question {currentQuestion + 1}</span>/
                    {questions.questions.length}
                  </div>
                  <div className="question-text">
                    {questions.questions[currentQuestion].questionText}
                  </div>
                </div>
                <div className="answer-section">
                  {questions.questions[currentQuestion].answerOptions.map(
                    (answerOption) => (
                      <button
                        className="quizbutton"
                        onClick={() =>
                          handleAnswerOptionClick(answerOption.isCorrect)
                        }
                      >
                        {answerOption.answerText}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
  }
  return renderPage();
}
