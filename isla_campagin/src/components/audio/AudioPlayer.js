import React from 'react';
import PropTypes from 'prop-types';

import ReactAudioPlayer from 'react-audio-player';

function AudioPlayer({ src }) {
  return (
    <div>
      {src ? (
        <ReactAudioPlayer id="ambientalAudio" src={src} volume={0.8} loop title="ambiental" />
      ) : (
        <></>
      )}
    </div>
  );
}

AudioPlayer.propTypes = { src: PropTypes.any };

export default AudioPlayer;
