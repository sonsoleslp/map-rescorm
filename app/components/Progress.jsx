import React from 'react';

export default class Progress extends React.Component {
    render(){
        let pctg = (Math.round(this.props.progress*100));
        return  [
            <span key="0" id="progressNumber">{pctg} %</span>,
            <div key="1" id="progressBar"> <div id="completedProgress" style={{width: pctg + 'px'}}/>
            </div>
        ];
    }
}