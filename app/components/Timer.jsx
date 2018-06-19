import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            time: this.props.config.time,
        }
        this.timeout;
        this.timeinterval;
        this.handleTimeInterval = this.handleTimeInterval.bind(this);
    }
    render(){
        let millis = (this.state.time/1000)
        let min = Math.floor(millis/60);
        let sec = millis-min*60
        return  (
            <div id="timerContainer">
                <span id="timer">{min}m {sec}s</span>
            </div>
        );
    }
    componentDidMount(){
        this.timeinterval = setInterval(this.handleTimeInterval, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timeinterval);
    }

    handleTimeInterval(){
        let time =  this.state.time-1000;
        this.setState({time});
        if (time <= 0) {
          this.props.timeUp();
            clearInterval(this.timeinterval);
        }
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.finish && nextProps.finish) {
            clearInterval(this.timeinterval);
        }
    }
}