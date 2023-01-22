import React, { useState, useEffect, useRef } from 'react';

import logo from '../../assets/pngs/planeta_enfermo.png';
import PropTypes from 'prop-types';

import './Loader.css';

const DEFAULT_BEHAVOIRS = ['CENTER', 'BOTTOM_RIGHT', 'LEFT_LONG_2DOWN', 'RIGHT_LONG_2UP'];

const Loader = ({
  fit = false,
  transparant = false,
  placeholder = 'Loading...',
  behavoir = DEFAULT_BEHAVOIRS[2],
  intro = false,
  setStage,
}) => {
  const effectRan = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (effectRan.current === false) {
      setReady(true);
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  const classSelector = () => {
    switch (behavoir) {
      case DEFAULT_BEHAVOIRS[0]:
        return 'loader-container-1';
      case DEFAULT_BEHAVOIRS[1]:
        return 'loader-container-2';
      case DEFAULT_BEHAVOIRS[2]:
        return 'loader-container-3';
      case DEFAULT_BEHAVOIRS[3]:
        break;
      default:
        return 'loader-container-1';
    }
  };

  return ready ? (
    <div
      className={`${classSelector()} ${fit && 'loader-container-1-adjusted'} ${
        transparant && 'noBackground'
      }`}
    >
      <img src={logo} className="earth-logo" alt="logo" />
      {intro ? (
        <button data-aos="flip-right" className="btn btn-link link-color" onClick={setStage}>
          Ver campaña de recolección de basura
        </button>
      ) : (
        <h1 className="loader-txt">{placeholder}</h1>
      )}
    </div>
  ) : (
    <></>
  );
};

// eslint-disable-next-line react/require-default-props
Loader.propTypes = {
  fit: PropTypes.bool,
  type: PropTypes.string,
  transparant: PropTypes.bool,
  placeholder: PropTypes.string,
  behavoir: PropTypes.string,
  intro: PropTypes.bool,
  setStage: PropTypes.func,
};

export default Loader;
