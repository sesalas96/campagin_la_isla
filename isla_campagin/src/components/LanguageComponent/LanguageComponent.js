import React, { useState } from 'react';

import { ReactComponent as Globe } from '../../assets/svgs/question-circle.svg';

// import PropTypes from 'prop-types';

import './LanguageComponent.css';

const LanguageComponent = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState({});

  const languages = [
    { name: 'English', lang: 'en', globe: <Globe /> },
    // { label: 'Spanish', lang: 'es' },
    // { label: t('Global.Italian'), lang: 'it' },
    // { label: t('Global.German'), lang: 'de' },
    // { label: t('Global.French'), lang: 'fr' },
    // { label: t('Global.Swedish'), lang: 'sv' },
    // { label: t('Global.Danish'), lang: 'da' },
    // { label: t('Global.Norwegian'), lang: 'nn-NO' },
    // { label: t('Global.Portuguese'), lang: 'pt' },
  ];

  const onWorkflowChange = (e) => {
    setSelectedWorkflow(e.value);
  };

  return (
    <div>
      {/* <Dropdown
        className="lang-dropdown"
        value={selectedWorkflow}
        options={languages}
        onChange={onWorkflowChange}
        optionLabel="name"
        placeholder={<Globe />}
        filterPlaceholder={<Globe />}
      /> */}
    </div>
  );
};

LanguageComponent.propTypes = {};

export default LanguageComponent;
