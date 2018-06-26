import React from 'react';
import play from '../../assets/images/play.svg';
import Modal from 'react-responsive-modal';

export default class ModalStart extends React.Component {

  render() {
    return (
      <Modal center open={this.props.open} animationDuration={300} showCloseIcon={false} classNames={{modal:"modalStart modalView"}} onClose={this.props.onClose}>
        <h1>¡Bienvenid@ al juego de las provincias!</h1>
        {this.props.easy ? (
          <p>
            En este juego tienes que situar en el mapa las provincias que se te indican en la parte superior derecha de la pantalla.
          </p>):(
          <p>
            En este juego tienes que escribir en la esquina superior derecha de la pantalla la provincia resaltada en el mapa.
          </p>)
        }
          <p>
          Haz clic en el botón para empezar. ¡Tienes 10 minutos!
          </p>

        <div className="center"><img src={play} onClick={this.props.start} className={"playButton"} alt=""/></div>
        <p className="credits">Juego creado por <a href="https://github.com/sonsoleslp">@sonsoleslp</a> empleando <a href="https://github.com/agordillo/RESCORM">RESCORM</a></p>
      </Modal>
    );
  }
}
