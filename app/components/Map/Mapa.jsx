import React from 'react';
import Map from './Map';
import {spain} from '../../config/map';
import '../../assets/scss/map.scss';

export default class Mapa extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render(){
    return <div id="map">
      <Map data={spain} width={'100%'} height={'calc(100% - 200px)'} handleClick={this.handleClick}/>
    </div>;
  }

  handleClick(){

  }

  componentDidMount(){


  }
}