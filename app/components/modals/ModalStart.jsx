import React from 'react';
import play from '../../assets/images/play.svg';
import Modal from 'react-responsive-modal';

export default class ModalStart extends React.Component {

  render() {
    return (
      <Modal center open={this.props.open} animationDuration={300} showCloseIcon={false} classNames={{modal:"modalView"}} onClose={this.props.onClose}>
        <h2>Bienvenid@ al juego de las provincias</h2>
        <h3>Haz click en el botón para empezar</h3>
        <div className="center"><img src={play} onClick={this.props.start} className={"playButton"} alt=""/></div>
      </Modal>
    );
  }
}
