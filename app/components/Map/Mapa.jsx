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
      scale: 1,
    };
    this.scale = this.scale.bind(this);
  }
  render(){
    return <div className="mapContainer">
      <div id="map" style={{transform: 'scale(' + this.props.scale + ')'}}>
      <Map finish={this.props.finish} answers={this.props.answers} data={spain} width={this.state.width} height={this.state.height} handleClick={this.props.onAnswerQuestion}/>

     {/* <div id="zoomButtons">
        <div className="zoomButton" id="closer" onClick={()=>{this.scale(true)}}>+</div>
        <div className="zoomButton" id="farther" onClick={()=>{this.scale(false)}}>-</div>
      </div>*/}
    </div><ReactResizeDetector handleWidth handleHeight onResize={(w, h)=>{
      this.aspectRatio(w, h);
    }} /></div>;
  }

  aspectRatio(width, height) {
    this.setState({ width, height });
  }
  scale(up = true) {
    let scale = this.state.scale + 0.2 * (up ? 1 : -1);
    if (scale > 5) {
      scale = 5;
    } else if (scale < 1) {
      scale = 1;
    }
    this.setState({ scale })
  }
}