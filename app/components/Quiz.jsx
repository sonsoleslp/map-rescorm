import React from 'react';
import './../assets/scss/quiz.scss';

import * as Utils from '../vendors/Utils.js';
import {addObjectives, resetObjectives, finishApp, objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import QuizHeader from './QuizHeader.jsx';
import Mapa from './Map/Mapa';
import GamePanel from './GamePanel';
import Progress from './Progress';
import Timer from './Timer';
import ModalStart from './modals/ModalStart';
import ModalFinish from './modals/ModalFinish';

import maplogo from '../assets/images/map.svg';


export default class Quiz extends React.Component {
  constructor(props){
    super(props);
    let quiz = this.props.quiz;
    let questions = [...quiz.questions];

    // Adaptive behaviour
    // Sort questions based on difficulty
   /* let adaptive_sorted = false;
    if((this.props.config.adaptive === true) && (typeof props.user_profile === "object") && (typeof props.user_profile.learner_preference === "object") && (typeof props.user_profile.learner_preference.difficulty === "number")){
      let difficulty = props.user_profile.learner_preference.difficulty;
      if((difficulty >= 0) && (difficulty <= 10)){
        for(let i = 0; i < questions.length; i++){
          if((typeof questions[i].difficulty !== "number") || (questions[i].difficulty < 0) || (questions[i].difficulty > 10)){
            questions[i].difficulty = 5;
          }
          questions[i].suitability = (10 - Math.abs((questions[i].difficulty - difficulty))) / 10;
        }
        questions.sort(function(a, b){ return b.suitability - a.suitability; });
        adaptive_sorted = true;
      }
    }*/

   /* if(adaptive_sorted === false){
      questions = Utils.shuffleArray(questions);
    }
    */

    let difficulty = props.user_profile.learner_preference.difficulty;
    console.log(difficulty);
    if((typeof this.props.config.n === "number") && (this.props.config.n >= 1)){
      // Limit number of questions
      questions = questions.slice(0, Math.min(this.props.config.n, questions.length));
    }

    quiz.questions = questions;

    this.state = {
        start: false,
        showFinishModal: true,
        quiz: {...quiz, questions},
        current_question_index: 0,
        answeredQuestions: new Array(quiz.questions.length),
    };
  }
  componentDidMount(){
    // Create objectives (One per question included in the quiz)
    let objectives = [];
    let nQuestions = this.state.quiz.questions.length;
    for(let i = 0; i < nQuestions; i++){
      objectives.push(new Utils.Objective({id:("Question" + (i + 1)), progress_measure:(1 / nQuestions), score:(1 / nQuestions)}));
    }
    this.props.dispatch(addObjectives(objectives));

  }
  onNextQuestion(){
    let isLastQuestion = (this.state.current_question_index === this.state.quiz.questions.length - 1);
    let index =  isLastQuestion ? 0 : (this.state.current_question_index + 1);
    const allTrue = arr => arr.filter(a=>a===1).length === arr.length;
    if (allTrue(this.state.answeredQuestions)) {
        this.props.dispatch(finishApp(true));
    }
    this.setState({current_question_index: index});

  }
    onPrevQuestion(){
        let isFirstQuestion = (this.state.current_question_index === 0);
        this.setState({current_question_index: isFirstQuestion ? (this.state.quiz.questions.length - 1) : (this.state.current_question_index - 1)});
    }

    onAnswerQuestion(e){
        // Calculate score

        let submittedAnswer = e;
        let correctAnswer = this.state.quiz.questions[this.state.current_question_index];
        let scorePercentage = 0;
        let answeredQuestions = [...this.state.answeredQuestions];

        if (this.props.finish || answeredQuestions[this.state.current_question_index] === 1) { //!== undefined Solo 1 oportunidad
          return;
        }

        if (submittedAnswer === correctAnswer) {
          scorePercentage = 1;
        }
        // Send data via SCORM
        let objective = this.props.tracking.objectives["Question" + (this.state.current_question_index+1)];

        this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
        // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));
        // Mark question as answered
        answeredQuestions[this.state.current_question_index] = scorePercentage;
        this.setState({answeredQuestions});
        if (scorePercentage === 1) {
            let onNextQuestion = this.onNextQuestion.bind(this);
            onNextQuestion();
        }

    }
  onResetQuiz(){
    this.setState({current_question_index:0, showFinishModal: false,
      answeredQuestions: new Array(this.state.quiz.questions.length)});
    this.props.dispatch(resetObjectives());
  }
  render(){
    let currentQuestion = this.state.quiz.questions[this.state.current_question_index ];
    let isLastQuestion = (this.state.current_question_index === this.state.quiz.questions.length);

    let objective = this.props.tracking.objectives["Question" + (this.state.current_question_index)];
    let onNextQuestion = this.onNextQuestion.bind(this);
    let onPrevQuestion = this.onPrevQuestion.bind(this);
    let onResetQuiz = this.onResetQuiz.bind(this);
    let onAnswerQuestion = this.onAnswerQuestion.bind(this);
    let guessed = [];
    this.state.quiz.questions.map((q, i)=>{
      if (this.state.answeredQuestions[i] === 1) {
        guessed.push(q);
      }
    });
    let start = this.state.start && !this.props.finish;
    return (
      <div className="quiz">
        <div id="nav">
          <img src={maplogo} id="logo" alt=""/><span id="brandName"><span> map</span><span className="mainColor">GAME</span></span>
          <div id="navBarRightContainer">
            {start ? <Timer config={this.props.config} finish={this.props.finish} timeUp={()=>{this.props.dispatch(finishApp(true))}}/> : null}
            {start ? <Progress progress={this.props.tracking.progress_measure}/>: null}
          </div>
        </div>
        {start ? <GamePanel question={currentQuestion}
                   onPrevQuestion={onPrevQuestion}
                   onNextQuestion={onNextQuestion}
                   finish={this.props.finish}/> : null}
        <Mapa onAnswerQuestion={onAnswerQuestion} answers={guessed} finish={this.props.finish}/>
        <ModalStart open={!this.state.start} start={()=>{this.setState({start: true})}} onClose={()=>null}/>
        <ModalFinish open={this.props.finish && this.state.showFinishModal} correct={this.state.answeredQuestions.filter(a=>a===1).length} progress={this.props.tracking.progress_measure*100} total={this.state.quiz.questions.length} reset={onResetQuiz.bind(this)} onClose={()=>{this.setState({showFinishModal: false})}}/>
      </div>
    );
  }
}