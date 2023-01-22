import React from 'react';

import PropTypes from 'prop-types';

import './Support.css';
import { LanguageComponent } from '../../components';

const Support = ({ language, support }) => {
  return <div className="support-container">{language && <LanguageComponent />}</div>;
};

Support.propTypes = {
  language: PropTypes.bool.isRequired,
  support: PropTypes.bool.isRequired,
};

export default Support;
