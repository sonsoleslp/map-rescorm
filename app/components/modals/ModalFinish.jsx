import React from 'react';
import reset from '../../assets/images/reset.svg';
import Modal from 'react-responsive-modal';

export default class ModalFinish extends React.Component {

  render() {
    return (
      <Modal center open={this.props.open} animationDuration={300} onClose={this.props.onClose}  classNames={{modal:"modalView"}}>
        <h2>¡Has terminado!</h2>
        <div>Has acertado {this.props.correct} de {this.props.total} provincias.</div>
        <div className={this.props.progress >= 50 ? 'pass':'fail'}>({Math.round(this.props.progress*100)/100}% de aciertos)</div>
        <br/> <br/>
        {/*<div className="center">
          <img src={reset} onClick={this.props.reset} className={"resetButton"} alt=""/>
          <div className="greyColor">Reiniciar</div>
        </div>*/}
      </Modal>
    );
  }
}
