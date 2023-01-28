import React, { useState, useEffect, useRef } from 'react';

import thankful from '../../assets/svgs/thankful.svg';
import sad from '../../assets/svgs/sad.svg';
import searching from '../../assets/svgs/searching.svg';
import impacted from '../../assets/svgs/impacted.svg';
import mainLogo from '../../assets/pngs/planeta_enfermo.png';
import PropTypes from 'prop-types';
import './Loader.css';
import { useTranslation } from 'react-i18next';

const DEFAULT_BEHAVOIRS = ['CENTER', 'BOTTOM_RIGHT', 'LEFT_LONG_2DOWN', 'RIGHT_LONG_2UP'];
const DEFAULT_TYPE_LOADER = ['SAD', 'IMPACTED', 'SEARCHING', 'THANKFUL'];

const Loader = ({
  fit = false,
  transparant = false,
  placeholder = 'Loading...',
  behavoir = DEFAULT_BEHAVOIRS[2],
  intro = false,
  setStage,
  type = 'SAD',
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
        return 'loader-container-4';
      default:
        return 'loader-container-1';
    }
  };

  const { t } = useTranslation();

  const typeSelector = () => {
    const DEFAULT_TYPE_LOADER = ['SAD', 'IMPACTED', 'SEARCHING', 'THANKFUL'];
    switch (type) {
      case DEFAULT_TYPE_LOADER[0]:
        return mainLogo;
      case DEFAULT_TYPE_LOADER[1]:
        return impacted;
      case DEFAULT_TYPE_LOADER[2]:
        return searching;
      case DEFAULT_TYPE_LOADER[3]:
        return thankful;
      default:
        return mainLogo;
    }
  };

  return ready ? (
    <div
      className={`${classSelector()} ${fit && 'loader-container-1-adjusted'} ${
        transparant && 'noBackground'
      }`}
    >
      <img src={typeSelector()} className={intro ? 'earth-logo' : 'earth-logo2'} alt="logo" />
      {intro ? (
        <button data-aos="flip-right" className="btn btn-link link-color" onClick={setStage}>
          {t('introTitle')}
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
