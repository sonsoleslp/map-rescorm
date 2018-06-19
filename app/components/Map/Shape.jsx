import React from 'react';
import {Set, Path, Text} from 'react-raphael';

export default class Shape extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text:{
        x:0 + (props.data.xx || 0),
        y:0 + (props.data.yy || 0),
        text:props.data.name,
      },
      path:props.data.path,

    };
  }
  handleLoad(path){
    let props = this.props;

    let box = path.getBBox();
    let center = {
      x:box.x + box.width / 2,
      y:box.y + box.height / 2,
    };
    let text = this.state.text;
    text.x = center.x + (props.data.xx || 0);
    text.y = center.y + (props.data.yy || 0);
    this.setState({
      text:text,
    });
  }
  render(){
    let {text, path} = this.state;
      let color={
          fill:this.props.data.fill,
          stroke:this.props.data.stroke,
          textFill:this.props.data.textFill,
          textStroke:this.props.data.textStroke,
      };
      let mouseout = this.props.mouseout;
      let mouseover = this.props.mouseover;
    return (<Set>
      <Path click={()=>{this.props.click(this.props.data.name);}} d={path} load={this.handleLoad.bind(this)} attr={{fill:color.fill, stroke:color.stroke, 'stroke-width': "0.5"}} mouseover={mouseover}  mouseout={function(){mouseout(this,color.fill)}}/>
      {/*<Text click={()=>{this.props.click(this.props.data.name);}} x={text.x} y={text.y} text={text.text} attr={{fill:color.textFill, stroke:color.textStroke}}/>*/}

    </Set>);
  }
}