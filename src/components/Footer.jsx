// src/components/Footer.jsx
import React from 'react';
import { ExternalLink, Github, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Creator Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Creator</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Created by Levisaxos</p>
              <div>
                <a 
                  href="https://github.com/Levisaxos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <a 
                  href="https://claude.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-gray-500 hover:text-gray-400 transition-colors text-xs"
                >
                  <span>Built with assistance from Claude AI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Source Attribution */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Source</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Based on the comprehensive guide from:</p>
              <a 
                href="https://maxroll.gg/poe2/getting-started/comprehensive-league-start-leveling-guide" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                <span>Maxroll.gg PoE2 Guide</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Legal</h3>
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
                <Shield className="w-4 h-4" />
                <span>MIT License</span>
              </div>
              <p className="text-gray-500 text-xs">
                This tool is not affiliated with or endorsed by Grinding Gear Games.
              </p>
              <p className="text-gray-500 text-xs">
                Path of Exile is a trademark of Grinding Gear Games.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Levisaxos. This project is open source under the MIT License.
            </p>
            <p className="text-gray-500 text-xs">
              No user data is collected or stored by this application.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;