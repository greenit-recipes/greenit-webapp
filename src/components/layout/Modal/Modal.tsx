import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import useIsMobile from 'hooks/isMobile';
import { IoClose } from 'react-icons/io5';

const Modal = (props: any) => {
  const isMobile = useIsMobile();

  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div
        className={`modal ${props.isCenter ? 'modal-is-center' : ''} `}
        onClick={props.onClose}
      >
        <div
          className={`modal-content ${
            isMobile ? 'w-11/12 my-5 mx-5' : 'mt-5 mb-5'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2 className="modal-title">{props.title}</h2>
            <button onClick={props.onClose} id="croix-icon-fermer" className="button absolute right-2">
              <IoClose className="h-10 w-7" />
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button onClick={props.onClose} id="modal-fermer-login-register" className="button">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    // @ts-ignore
    document.getElementById('root'),
  );
};

export default Modal;
