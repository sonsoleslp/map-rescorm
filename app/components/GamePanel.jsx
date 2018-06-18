import React from 'react';
import left from '../assets/images/back.svg';
import right from '../assets/images/forward.svg';

export default class GamePanel extends React.Component {

    render() {
        return (
            <div id="gamePanel">
               <div className="leftarrow arrow"><button onClick={this.props.onPrevQuestion}><img src={left} alt=""/></button></div>
               <div id="question">
                   {this.props.question}
               </div>
                <div className="rightarrow arrow"><button onClick={this.props.onNextQuestion}><img src={right} alt=""/></button></div>
            </div>
        );
    }

}