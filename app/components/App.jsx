import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import * as SAMPLES from '../config/samples.js';

import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
import Quiz from './Quiz.jsx';

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.quiz = {...SAMPLES.quiz_example};
  }
  render(){
    let appHeader = "";
    let appContent = "";

    // if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
      appHeader = (
        <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
      );
      if(this.props.wait_for_user_profile !== true){
        appContent = (
          <Quiz finish={!((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false))} dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.quiz} config={GLOBAL_CONFIG} I18n={I18n}/>
        );
      }
    // } else {
    //   appContent = (
    //     <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={this.quiz} config={GLOBAL_CONFIG} I18n={I18n}/>
    //   );
    // }

    return (
      <div id="container">
        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        {/*appHeader*/}
        {appContent}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);