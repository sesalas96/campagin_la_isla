import React from 'react';
import PropTypes from 'prop-types';

import { useMediaQuery } from 'react-responsive';
import './Persona.css';

const Persona = ({ userData }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 720px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 900px)' });
  return (
    <div className="avatar-wrapper">
      <div className="avatar-img-container">
        <img className="avatar-img" src={userData?.icon} alt={`Imagen de ${userData?.name}`} />
      </div>
      <div className="data-img-container">
        <p data-aos={!isMobile || !isTablet ? 'fade-left' : ''} className="data-name">
          {userData?.name}
        </p>
        <p data-aos={!isMobile || !isTablet ? 'fade-left' : ''} className="data-role">
          {userData?.role}
        </p>
        <p data-aos={!isMobile || !isTablet ? 'fade-left' : ''} className="data-extra">
          {userData?.email}
        </p>
        <p data-aos={!isMobile || !isTablet ? 'fade-left' : ''} className="data-extra">
          {userData?.tel}
        </p>
      </div>
    </div>
  );
};

Persona.propTypes = { userData: PropTypes.object };

export default Persona;
