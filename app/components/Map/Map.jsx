import React from 'react';
import {Raphael, Paper} from 'react-raphael';
import Shape from './Shape';

export default class Map extends React.Component {
  handleMouseOver(e){
    if(!this._fill){this._fill = this.attr("fill");}
    this.animate({
      fill:Raphael.getColor(),
    }, 500);
  }
  handleMouseOut(e){
    this.animate({fill:this._fill}, 500);
  }

  render(){
    let map = this.props.data;
    let data = [];
    for(let key in map){
      data.push({
        key:key,
        name:map[key].name || "",
        path:map[key].path || "",
        xx:map[key].xx || 0,
        yy:map[key].yy || 0,
        fill:map[key].backColor || "#97d6f5",
        stroke:map[key].borderColor || "#fff",
        textFill:map[key].textFill || "#000",
        textStroke:map[key].textStroke,
      });
    }
    let handleMouseOver = this.handleMouseOver;
    let handleMouseOut = this.handleMouseOut;
    let handleClick = this.props.handleClick;
    return (<Paper width={this.props.width || 1000} height={this.props.height || 1000} viewbox={'150.522 11.305 416.74600000000004 348.17'}>
      {
        data.map(function(ele, pos){
          return (<Shape data={ele} key={pos} mouseover={handleMouseOver} mouseout={handleMouseOut} click={handleClick}/>);
        })
      }

    </Paper>);
  }
}