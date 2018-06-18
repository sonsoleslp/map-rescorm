import React from 'react';
import Map from './Map';
import {spain} from '../../config/map';
import '../../assets/scss/map.scss';
import ReactResizeDetector from 'react-resize-detector';
export default class Mapa extends React.Component {
  constructor(props){
    super(props);
    this.aspectRatio = this.aspectRatio.bind(this);
    this.state = {
      width: 100,
      height: 100,
    }
  }
  render(){
    return <div id="map">
      <Map answers={this.props.answers} data={spain} width={this.state.width} height={this.state.height} handleClick={this.props.onAnswerQuestion}/>
      <ReactResizeDetector handleWidth handleHeight onResize={(w, h)=>{
        this.aspectRatio(w, h);
      }} />
    </div>;
  }

  aspectRatio(width, height) {
    this.setState({ width, height });
  }
}