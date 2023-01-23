import React from 'react';
import PropTypes from 'prop-types';

import './Persona.css';

const Persona = ({ userData }) => {
  return (
    <div className="avatar-wrapper">
      <div className="avatar-img-container">
        <img className="avatar-img" src={userData?.icon} alt={`Imagen de ${userData?.name}`} />
      </div>
      <div className="data-img-container">
        <p className="data-name">{userData?.name}</p>
        <p className="data-role">{userData?.role}</p>
        <p className="data-extra">{userData?.email}</p>
        <p className="data-extra">{userData?.tel}</p>
      </div>
    </div>
  );
};

Persona.propTypes = { userData: PropTypes.object };

export default Persona;
