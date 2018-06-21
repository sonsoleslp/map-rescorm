import React from 'react';
import left from '../assets/images/back.svg';
import right from '../assets/images/forward.svg';

export default class GamePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      province: ""

    };
  }

    render() {
        return (
             this.props.easy ? (
              <div id="gamePanel">
                <div className="leftarrow arrow"><button onClick={this.props.onPrevQuestion}><img src={left} alt=""/></button></div>
               <div id="question">
                   {this.props.question}
               </div>
                <div className="rightarrow arrow"><button onClick={this.props.onNextQuestion}><img src={right} alt=""/></button></div>
            </div>) : (
            <div id="gamePanel">
                <input type="text" value={this.state.province} onChange={this.checkProvince.bind(this)}/>
            </div>)
        );
        
    }

    checkProvince(e){
        let province = e.target.value;
        let matches = this.props.checkProvince(province)
        this.setState({province: matches ? '': province});
    }


}