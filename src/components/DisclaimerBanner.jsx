import React, { useState, useEffect } from 'react';
import { X, Github, AlertTriangle } from 'lucide-react';

const DisclaimerBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the banner
    const dismissed = localStorage.getItem('poe2-disclaimer-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('poe2-disclaimer-dismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-yellow-900 border-b border-yellow-700 px-6 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-200">
              <p className="mb-2">
                <strong>Personal Project Notice:</strong> This tool was created for personal use and is optimized for my specific playstyle and goals. 
                While I've made it public, please understand that it may not suit everyone's needs perfectly.
              </p>
              <p>
                You can report bugs or suggest improvements on{' '}
                <a 
                  href="https://github.com/Levisaxos/poe2-campaign-tracker/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-100 hover:text-white underline inline-flex items-center space-x-1"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Issues</span>
                </a>
                , but I cannot guarantee that I will implement all requests or provide ongoing support.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-yellow-400 hover:text-yellow-200 transition-colors flex-shrink-0 ml-4"
            title="Dismiss this notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;