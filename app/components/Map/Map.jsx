import React from 'react';
import {Raphael, Paper} from 'react-raphael';
import Shape from './Shape';
import Label from './Label';

export default class Map extends React.Component {
  handleMouseOver(e){
    if(!this._fill){this._fill = this.attr("fill");}
    this.animate({
      fill:Raphael.getColor(),
    }, 300);
  }
  handleMouseOut(e,fill){
     e.animate({fill}, 300);
  }

  render(){
    let map = this.props.data;
    let data = [];
      let handleMouseOver = this.handleMouseOver;
      let handleMouseOut = this.handleMouseOut;
      let handleClick = this.props.handleClick;
    for(let key in map){
      let value = false;
      if (this.props.answers.indexOf(map[key].name) !== -1) {
        value = true;
      }
      data.push({
        key: key,
        name: map[key].name || "",
        path: map[key].path || "",
        xx: map[key].xx || 0,
        yy: map[key].yy || 0,
        fill: value ? "#17CFC8": (map[key].backColor || "#333333") , // "#97d6f5",
        stroke: map[key].borderColor || "#fff",
        textFill: value ? map[key].textFill || "#000" : 'none',
        textStroke: value ? map[key].textStroke : 'none',
      });
    }
    return (<Paper width={this.props.width || 1000} height={this.props.height || 1000} viewbox={'150.522 11.305 416.74600000000004 348.17'}>
      {
        data.map(function(ele, pos){
          return (<Shape data={ele} key={pos} mouseover={handleMouseOver} mouseout={handleMouseOut} click={handleClick}/>);
        })
      }
        {
            data.map(function(ele, pos){
                return (<Label data={ele} key={pos} mouseover={handleMouseOver} mouseout={handleMouseOut} click={handleClick}/>);
            })
        }
    </Paper>);
  }
}