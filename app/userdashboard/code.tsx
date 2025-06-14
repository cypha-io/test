"use client";

import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Optionally auto-close after a few seconds
    // setTimeout(() => setShowPopup(false), 5000);
  }, []);

  return (
    <div>
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: `url('https://img.freepik.com/premium-vector/bitcoin-digital-currency-golden-coin-background_45996-84.jpg') center center / cover no-repeat`,
          }}
        >
          <div
            className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl text-center transform transition-all duration-500 animate-fade-in-up"
            style={{
              minWidth: 320,
              maxWidth: 400,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <div className="flex flex-col items-center">
              <svg
                className="mb-4 animate-spin-slow"
                width="48"
                height="48"
                viewBox="0 0 48 48"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="4"
                  strokeDasharray="31.4 31.4"
                  strokeLinecap="round"
                />
              </svg>
              <h2 className="text-3xl font-extrabold mb-2 text-gray-900 tracking-tight">
                Maintenance
              </h2>
              <p className="text-gray-700 mb-2 text-lg">
                Page will be restored soon.
              </p>
              <span className="text-xs text-gray-400 tracking-wide">
                Thank you for your patience
              </span>
            </div>
          </div>
          <style jsx global>{`
            @keyframes fade-in-up {
              0% {
                opacity: 0;
                transform: translateY(40px) scale(0.95);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .animate-fade-in-up {
              animation: fade-in-up 0.7s cubic-bezier(0.23, 1, 0.32, 1);
            }
            @keyframes spin-slow {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .animate-spin-slow {
              animation: spin-slow 2s linear infinite;
            }
          `}</style>
        </div>
      )}
      {/* ...existing code... */}
    </div>
  );
}


