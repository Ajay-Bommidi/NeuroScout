import React from 'react';

const BrandFooter = () => {
  return (
    <div className="text-center mt-16 pt-8 border-t border-slate-700/50">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <span>Made with</span>
          <span className="inline-block align-middle">
            <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="neuroscout-gradient-footer" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7F5FFF"/>
                  <stop offset="1" stopColor="#14C8FF"/>
                </linearGradient>
              </defs>
              <ellipse cx="32" cy="32" rx="26" ry="18" fill="url(#neuroscout-gradient-footer)"/>
              <path d="M20 32c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12" stroke="#fff" strokeWidth="2.5" fill="none"/>
              <circle cx="32" cy="32" r="3.5" fill="#fff"/>
              <circle cx="24" cy="32" r="2" fill="#fff"/>
              <circle cx="40" cy="32" r="2" fill="#fff"/>
              <circle cx="28" cy="25" r="1.5" fill="#fff"/>
              <circle cx="36" cy="25" r="1.5" fill="#fff"/>
              <circle cx="28" cy="39" r="1.5" fill="#fff"/>
              <circle cx="36" cy="39" r="1.5" fill="#fff"/>
            </svg>
          </span>
          <span>by</span>
          <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Ajay Bommidi
          </span>
        </div>
        <div className="text-xs text-slate-500 max-w-md">
          <p>© 2024 NeuroScout. Powered by advanced AI technology and multi-provider intelligence.</p>
        </div>
      </div>
    </div>
  );
};

export default BrandFooter;
