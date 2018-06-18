import React from 'react';
import Map from './Map';
import {spain} from '../../config/map';
import '../../assets/scss/map.scss';
import ReactResizeDetector from 'react-resize-detector';
export default class Mapa extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.aspectRatio = this.aspectRatio.bind(this);
    this.state = {
      width: 100,
      height: 100,
    }
  }
  render(){
    return <div id="map">
      <Map data={spain} width={this.state.width} height={this.state.height} handleClick={this.handleClick}/>
      <ReactResizeDetector handleWidth handleHeight onResize={(w,h)=>{
        this.aspectRatio(w,h);
      }} />
    </div>;
  }

  handleClick(){

  }

  componentDidMount(){

  }

  aspectRatio(width, height) {
    this.setState({ width, height });
  }
}