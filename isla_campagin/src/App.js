/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
// swssw
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Loader, Persona } from './components';
import logo from './assets/pngs/planeta_enfermo.png';
import compass from './assets/svgs/compass.svg';
import leftIcon from './assets/svgs/chevron-left.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import { useTranslation } from 'react-i18next';
import ReactAudioPlayer from 'react-audio-player';
import { Modal } from 'react-responsive-modal';
import AMBIENTAL_1 from './assets/oggs/ambiental.ogg';
import AMBIENTAL_2 from './assets/oggs/raining.ogg';
import onAudioIcon from './assets/svgs/volume-off.svg';
import offAudioIcon from './assets/svgs/volume-up.svg';
import refreshIcon from './assets/svgs/refresh.svg';
import clipboardIcon from './assets/svgs/clipboard.svg';
import sebasImg from './assets/pngs/sebas.png';
import danielImg from './assets/pngs/daniel.png';
import { useMediaQuery } from 'react-responsive';

const DEFAULT_PAGES = ['INTRO', 'HOME', 'INFORMATION', 'ENROLLMENT', 'CONTACT_US'];
const DEFAULT_BEHAVOIRS = ['CENTER', 'BOTTOM_RIGHT', 'LEFT_LONG_2DOWN', 'RIGHT_LONG_2UP'];
const WAZE_APP_LINK = 'waze://?ll=9.972619,-84.045867&navigate=yes';
const WAZE_WEB_LINK = 'https://waze.com/ul?ll=9.972619,-84.045867&navigate=yes';

function App() {
  const { t, i18n } = useTranslation();
  const appRef = useRef(false);
  const isMobile = useMediaQuery({ query: '(max-width: 720px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 900px)' });
  const [stage, setStage] = useState(DEFAULT_PAGES[0]);
  const [volume, setVolume] = useState(0.5);
  const [zoomMap, setZoomMap] = useState(7);
  const [loading, setLoading] = useState(true);
  const [loadRedZone, setloadRedZone] = useState(false);
  const [play, setPlay] = useState(false);
  const [lang, setLang] = useState(i18n.language !== 'en');
  const [intro, setIntro] = useState(true);
  const DEFAULTS_AUDIOS = [AMBIENTAL_1, AMBIENTAL_2];
  const DEFAULT_STRING_ALERT_2 = t('address');
  const DEFAULT_ALERT_2 = (
    <p className="alert-txt">
      {DEFAULT_STRING_ALERT_2}
      <button className="btn clipboard-btn" onClick={(e) => handleClipboard(e)}>
        <img className="clipboard-icon" src={clipboardIcon} alt="Copiar la dirección" />
        {t('copy')}
      </button>
    </p>
  );
  const [audio, setAudio] = useState(DEFAULTS_AUDIOS[0]);
  const [showModalBtn, setShowModalBtn] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleClipboard(e) {
    e.preventDefault();
    navigator.clipboard.writeText(DEFAULT_STRING_ALERT_2);
  }

  const handleToggleModal = () => {
    setOpen((p) => !p);
  };
  const handleShowButtons = () => setShowModalBtn((p) => !p);

  const notify = () => {
    const DEFAULT_ALERT = <p className="alert-txt">{t('helpAlert')}</p>;
    setTimeout(() => {
      handleShowButtons();
    }, 1000);
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

  const handleResfreshMap = () => {
    setZoomMap(7);
    setTimeout(() => {
      setZoomMap(11);
      setTimeout(() => {
        setZoomMap(13);
        setTimeout(() => {
          handleShowPlaceInfo();
          setZoomMap(17);
          setTimeout(() => {
            setloadRedZone(true);
          }, 1500);
        }, 4000);
      }, 3000);
    }, 3000);
  };

  const handleShowSection = () => {
    const handleGoTo = (route) => {
      handleShowButtons();
      handleToggleModal();
      window.open(route, '_blank');
    };

    const handleGoToStage = (stage) => {
      setStage(stage);
    };

    const DEFAULT_SEBAS_SALAS = {
      name: 'Sebastián Salas',
      email: 'sebashian961@gmail.com',
      tel: '+506 6069-6931',
      icon: sebasImg,
      role: t('sebasRole'),
    };
    const DEFAULT_DANIEL_BARQUERO = {
      name: 'Daniel Barquero',
      email: 'dbarquero@moravia.go.cr',
      tel: '+506 6481-1421',
      icon: danielImg,
      role: t('danielRole'),
    };

    switch (stage) {
      case DEFAULT_PAGES[0]: // INTRO
        return <div className="App-header" />;
      case DEFAULT_PAGES[1]: // HOME
        return (
          <div className="App-header">
            <div className="action-section">
              <button className="location-btn" onClick={handleToggleModal}>
                <img className="compass-img" src={compass} alt="Ubicación" />
                {t('location')}
              </button>
            </div>

            <ToastContainer
              position="bottom-center"
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
            <h2 data-aos="fade-right" className="sect1-subtitle">
              {t('homeHeaderSubTitle')}
            </h2>
            <h1 data-aos="fade-right" className="main-header-title">
              <p className="warning">⚠️</p>
              {t('homeHeaderTitle')}
            </h1>
            <div className="btns-container" data-aos={!isTablet ? 'zoom-out' : ''}>
              <button className="btn" onClick={() => handleGoToStage(DEFAULT_PAGES[2])}>
                {t('allDetails')}
              </button>
              <button className="btn btn-primary" onClick={() => handleGoToStage(DEFAULT_PAGES[3])}>
                {t('enrollment')}
              </button>
              <button className="btn btn-link" onClick={() => handleGoToStage(DEFAULT_PAGES[4])}>
                {t('contactUs')}
              </button>
            </div>
            {open ? (
              <Modal open={open} onClose={handleToggleModal} center>
                <Loader fit transparant placeholder="" behavoir={DEFAULT_BEHAVOIRS[3]} />
                <div className="card">
                  {zoomMap > 12 ? (
                    <button
                      title="Refresh map"
                      className="btn btn-refresh"
                      onClick={handleResfreshMap}
                    >
                      <img src={refreshIcon} alt="" />{' '}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                {zoomMap === 17 && loadRedZone ? (
                  <div title="Zona afectada" className="card-red-zone" />
                ) : (
                  <></>
                )}
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://maps.google.com/maps?q=XXC3+Q4W,%20San%20Jos%C3%A9%20Province,%20San%20Vicente,%20Costa%20Rica&t=&z=${zoomMap}&ie=UTF8&iwloc=&output=embed`}
                  frameborder="0"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
                {showModalBtn ? (
                  <div className="go-to-container" data-aos="fade-up">
                    <button
                      title="Drive with waze"
                      className="btn waze-btn"
                      onClick={() => handleGoTo(!isMobile ? WAZE_WEB_LINK : WAZE_APP_LINK)}
                    >
                      Waze
                    </button>
                    <button
                      title="Drive with google maps"
                      className="btn btn-primary google-btn"
                      onClick={() =>
                        handleGoTo(
                          `https://www.google.com/maps/place/XXC3%2BQ4W+Salon+Comunal+de+la+Isla,+San+Jos%C3%A9+Province,+San+Vicente,+Costa+Rica/@9.9724185,-84.0464675,18z/data=!4m14!1m7!3m6!1s0x8fa0e45aa3293347:0xd790e4defe645815!2sXXC2%2BP2W+Urbanizaci%C3%B3n+Lomas+de+Moravia,+La+Isla,+San+Jos%C3%A9,+San+Vicente,+Costa+Rica!8m2!3d9.9718678!4d-84.0499374!16s%2Fg%2F11clr_jzkw!3m5!1s0x8fa0e44ff5286883:0xfb4084c1e5da7f90!8m2!3d9.9719751!4d-84.0471757!16s%2Fg%2F11cnbr17ws?hl=en-US&gl=US`
                        )
                      }
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
      case DEFAULT_PAGES[2]: // INFORMATION
        return (
          <div className="App-header">
            <div className="action-section">
              <button className="location-btn" onClick={() => handleGoToStage(DEFAULT_PAGES[1])}>
                <img className="compass-img" src={leftIcon} alt="Go back to home" />
                {t('goBack')}
              </button>
            </div>

            <ToastContainer
              position="bottom-center"
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
            <h1 data-aos="fade-right" className="main-header-title">
              {t('generalInfo')}
            </h1>
            <div className="btns-container" data-aos={!isTablet ? 'zoom-out' : ''}>
              <p>{t('inProgress')}</p>
            </div>
          </div>
        );
      case DEFAULT_PAGES[3]: // ENROLLMENT
        return (
          <div className="App-header">
            <div className="action-section">
              <button className="location-btn" onClick={() => handleGoToStage(DEFAULT_PAGES[1])}>
                <img className="compass-img" src={leftIcon} alt="Go back to home" />
                {t('goBack')}
              </button>
            </div>

            <ToastContainer
              position="bottom-center"
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
            <h1 data-aos="fade-right" className="main-header-title">
              {t('calendarYourDate')}
            </h1>
            <div className="btns-container" data-aos={!isTablet ? 'zoom-out' : ''}>
              <p>{t('inProgress')}</p>
            </div>
          </div>
        );
      case DEFAULT_PAGES[4]: // CONTACT_US
        return (
          <div className="App-header">
            <div className="action-section">
              <button className="location-btn" onClick={() => handleGoToStage(DEFAULT_PAGES[1])}>
                <img className="compass-img" src={leftIcon} alt="Go back to home" />
                {t('goBack')}
              </button>
            </div>

            <ToastContainer
              position="bottom-center"
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
            <h1 data-aos="fade-right" className="main-header-title">
              {t('hosts')}
            </h1>
            <div className="btns-container" data-aos={!isTablet ? 'zoom-out' : ''}>
              <Persona userData={DEFAULT_SEBAS_SALAS} />
              <Persona userData={DEFAULT_DANIEL_BARQUERO} />
            </div>
          </div>
        );
      default:
        return (
          <div className="App-header">
            <div className="action-section">
              <button className="location-btn" onClick={handleToggleModal}>
                <img className="compass-img" src={compass} alt="Ubicación" />
                {t('location')}
              </button>
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

  const handleShowPlaceInfo = () => {
    toast.info(DEFAULT_ALERT_2, {
      position: 'bottom-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleGoHome = () => {
    setStage(DEFAULT_PAGES[1]);
    setAudio(DEFAULTS_AUDIOS[1]);
    setLoading(false);
    setIntro(false);
    handlePlayAudio();
    setPlay(true);
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

  useEffect(() => {
    let ref;
    if (showModalBtn) {
      setTimeout(() => {
        handleShowPlaceInfo();
      }, 1000);
      ref = setTimeout(() => {
        setZoomMap(9);
        setTimeout(() => {
          setZoomMap(11);
          setTimeout(() => {
            setZoomMap(13);
            setTimeout(() => {
              setZoomMap(17);
              setTimeout(() => {
                setloadRedZone(true);
              }, 1500);
            }, 4000);
          }, 4000);
        }, 4000);
      }, 4000);
    } else {
      setZoomMap(7);
      clearInterval(ref);
    }
    return () => {};
  }, [showModalBtn]);

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
      }, 4000);
    }
    return () => {
      AOS.refresh();
      appRef.current = true;
    };
  }, []);

  return (
    <div className="App">
      {audio ? (
        <ReactAudioPlayer id="ambientalAudio" src={audio} volume={volume} loop title="ambiental" />
      ) : (
        <></>
      )}
      <div className="general-actions-container">
        <button className="btn audio-btn" id="btn-audio" onClick={handleToggleAudio} type="button">
          <img src={!play ? onAudioIcon : offAudioIcon} alt="" />
        </button>
        <button className="btn audio-btn" id="btn-audio" onClick={handleToggleLang} type="button">
          <p>{!lang ? 'EN' : 'ES'}</p>
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
