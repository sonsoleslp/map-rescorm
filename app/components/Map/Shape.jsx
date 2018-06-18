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
      color:{
        fill:props.data.fill,
        stroke:props.data.stroke,
        textFill:props.data.textFill,
        textStroke:props.data.textStroke,
      },
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
    let {text, path, color} = this.state;
    return (<Set>
      <Path click={()=>{this.props.click(this.props.data.name);}} d={path} load={this.handleLoad.bind(this)} attr={{fill:color.fill, stroke:color.stroke}} mouseover={this.props.mouseover} mouseout={this.props.mouseout}/>
      <Text click={()=>{this.props.click(this.props.data.name);}} x={text.x} y={text.y} text={text.text} attr={{fill:color.textFill, stroke:color.textStroke}}/>

    </Set>);
  }
}