import React from 'react';
const TIME = 10000;
export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            time: TIME,
        }
        this.timeout;
        this.timeinterval;
        this.handleTimeout = this.handleTimeout.bind(this);
        this.handleTimeInterval = this.handleTimeInterval.bind(this);
    }
    render(){
        return  (
            <div id="timerContainer">
                <span id="timer">{this.state.time/1000} s</span>
            </div>
        );
    }
    componentDidMount(){
        this.timeout = setTimeout(this.handleTimeout, TIME);
        this.timeinterval = setInterval(this.handleTimeInterval, 1000);
    }
    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearInterval(this.timeinterval);
    }
    handleTimeout(){
        this.props.timeUp();
    }
    handleTimeInterval(){
        let time =  this.state.time-1000;
        console.log(time)
        this.setState({time});
        if (time <= 0) {
            clearInterval(this.timeinterval);
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(this.props.finish, nextProps.finish)
        if (!this.props.finish && nextProps.finish) {
            clearInterval(this.timeinterval);
            clearTimeout(this.timeout);
        }
    }
}