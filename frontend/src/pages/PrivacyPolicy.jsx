import React from 'react'
import { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
    const scriptId = 'getterms-embed-js';

    // Avoid loading the script multiple times
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://gettermscdn.com/dist/js/embed.js';
      script.async = true;

      document.body.appendChild(script);
    }
  }, []);

  return (
        <div
      className="getterms-document-embed"
      data-getterms="nfeLU"
      data-getterms-document="privacy"
      data-getterms-lang="en-us"
      data-getterms-mode="direct"
      data-getterms-env="https://gettermscdn.com"
    ></div>
  )
}

export default PrivacyPolicy