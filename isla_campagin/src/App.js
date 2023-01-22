/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
// swssw
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Support } from './containers';
import { Loader } from './components';
import logo from './assets/pngs/planeta_enfermo.png';
import compass from './assets/svgs/compass.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import ReactAudioPlayer from 'react-audio-player';
import { Modal } from 'react-responsive-modal';
import AMBIENTAL_1 from './assets/oggs/ambiental.ogg';
import AMBIENTAL_2 from './assets/oggs/raining.ogg';
import onAudioIcon from './assets/svgs/volume-off.svg';
import offAudioIcon from './assets/svgs/volume-up.svg';

const DEFAULT_PAGES = ['INTRO', 'HOME', 'INFORMATION', 'ENROLLMENT', 'CONTACT_US'];
const DEFAULT_BEHAVOIRS = ['CENTER', 'BOTTOM_RIGHT', 'LEFT_LONG_2DOWN', 'RIGHT_LONG_2UP'];
const WAZE_APP_LINK = 'waze://?ll=9.972619,-84.045867&navigate=yes';
const WAZE_WEB_LINK = 'waze://?ll=9.972619,-84.045867&navigate=yes';
const DEFAULT_ALERT = <p className="alert-txt">{'Ayúdanos a recuperar la zona'}</p>;
const DEFAULTS_AUDIOS = [AMBIENTAL_1, AMBIENTAL_2];

function App() {
  const appRef = useRef(false);
  const [stage, setStage] = useState(DEFAULT_PAGES[0]);
  const [volume, setVolume] = useState(0.7);
  const [zoomMap, setzoomMap] = useState(10);
  const [loading, setLoading] = useState(true);
  const [play, setPlay] = useState(false);
  const [lang, setLang] = useState(false);
  const [intro, setIntro] = useState(true);
  const [audio, setAudio] = useState(DEFAULTS_AUDIOS[0]);
  const [showModalBtn, setShowModalBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const handleToggleModal = () => setOpen((p) => !p);
  const handleShowButtons = () => setShowModalBtn((p) => !p);

  const notify = () => {
    setTimeout(() => {
      handleShowButtons();
    }, 3000);
    toast.warning(DEFAULT_ALERT, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleToggleAudio = () => {
    setPlay((p) => !p);
  };

  const handleToggleLang = () => {
    i18n.changeLanguage(lang ? 'en' : 'es');
    setLang((l) => !l);
  };

  useEffect(() => {
    if (play) {
      handlePlayAudio();
    } else {
      handleStopAudio();
    }
    return () => {
      handleStopAudio();
    };
  }, [play]);

  const handleShowSection = () => {
    const handleGoTo = (route) => {
      handleToggleModal();
      window.open(route, '_blank');
    };

    switch (stage) {
      case DEFAULT_PAGES[0]:
        return (
          <div className="App-header">
            <></>
          </div>
        );
      case DEFAULT_PAGES[1]:
        return (
          <div className="App-header">
            <div className="action-section">
              <button className="location-btn" onClick={handleToggleModal}>
                <img className="compass-img" src={compass} alt="Ubicación" />
                Ubicación
              </button>
              <Support language />
            </div>

            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {!open ? (
              <img src={logo} className="App-logo" alt="logo" title="Help !!!" />
            ) : (
              <div className="app-img-holder" />
            )}
            <h2 data-aos="fade-up" className="sect1-subtitle">
              Campaña de recolección de basura
            </h2>
            <h1 data-aos="fade-up" className="main-header-title">
              <p className="warning">⚠️</p>Botadero a cielo abierto
            </h1>
            <div className="btns-container" data-aos="zoom-out">
              <button className="btn">Ver toda la información</button>
              <button className="btn btn-primary">Inscribirme a la campaña</button>
              <button className="btn btn-link">Contáctenos</button>
            </div>
            {open ? (
              <Modal open={open} onClose={handleToggleModal} center>
                <Loader fit transparant placeholder="" behavoir={DEFAULT_BEHAVOIRS[2]} />
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://maps.google.com/maps?q=Las%20Isla%20de%20Moravia&t=&z=${zoomMap}&ie=UTF8&iwloc=&output=embed`}
                  frameborder="0"
                  marginheight="0"
                  marginwidth="0"
                  onl
                ></iframe>
                {showModalBtn ? (
                  <div className="go-to-container">
                    <button
                      className="btn waze-btn"
                      onClick={() =>
                        handleGoTo('https://waze.com/ul?ll=9.972619,-84.045867&navigate=yes')
                      }
                    >
                      Waze
                    </button>
                    <button
                      className="btn btn-primary google-btn"
                      onClick={() => handleGoTo('waze')}
                    >
                      Google Maps
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </Modal>
            ) : (
              <></>
            )}
          </div>
        );
      case DEFAULT_PAGES[2]:
        break;
      case DEFAULT_PAGES[3]:
        break;
      case DEFAULT_PAGES[4]:
        break;
      default:
        return (
          <div className="App-header">
            <div className="action-section">
              <button className="location-btn" onClick={handleToggleModal}>
                <img className="compass-img" src={compass} alt="Ubicación" />
                Ubicación
              </button>
              <Support language />
            </div>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        );
    }
  };

  const handlePlayAudio = () => {
    const x = document.getElementById('ambientalAudio');
    x.play();
  };

  const handleStopAudio = () => {
    const x = document.getElementById('ambientalAudio');
    x.pause();
  };

  useEffect(() => {
    if (appRef.current === false) {
      AOS.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100,
      });
      setTimeout(() => {
        setTimeout(() => {
          notify();
        }, 2000);
      }, 3000);
    }
    return () => {
      AOS.refresh();
      appRef.current = true;
    };
  }, []);

  const handleGoHome = () => {
    setStage(DEFAULT_PAGES[1]);
    setLoading(false);
    setIntro(false);
    setAudio(true);
    handlePlayAudio();
    handleToggleAudio();
  };

  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <ReactAudioPlayer id="ambientalAudio" src={audio} volume={volume} loop />
      <div className="general-actions-container">
        <button className="btn audio-btn" id="btn-audio" onClick={handleToggleAudio} type="button">
          <img src={!play ? onAudioIcon : offAudioIcon} alt="" />
        </button>
        <button className="btn audio-btn" id="btn-audio" onClick={handleToggleLang} type="button">
          <p>{lang ? 'EN' : 'ES'}</p>
        </button>
      </div>
      {!loading ? (
        handleShowSection()
      ) : (
        <div className="loading-wrapper">
          <Loader
            fit
            transparant
            behavoir={DEFAULT_BEHAVOIRS[1]}
            placeholder="fff"
            intro={intro}
            setStage={handleGoHome}
          />
        </div>
      )}
    </div>
  );
}

export default App;
