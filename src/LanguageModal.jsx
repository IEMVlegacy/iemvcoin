import React, { useEffect, useState } from 'react';
import { applyTranslations, getSavedLanguage, saveLanguage } from './i18n';
import './LanguageModal.css';

const LanguageModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = getSavedLanguage();
    if (!saved) setVisible(true);
    else applyTranslations(saved);
  }, []);

  const choose = (lang) => {
    saveLanguage(lang);
    applyTranslations(lang);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="lang-modal-backdrop">
      <div className="lang-modal">
        <h3>Choose your language</h3>
        <p>Select the site language to continue.</p>
        <div className="lang-actions">
          <button className="btn btn-primary" onClick={() => choose('en')}>English</button>
          <button className="btn btn-outline" onClick={() => choose('pt')}>Português</button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
