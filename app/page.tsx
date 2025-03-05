"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

declare global {
  interface Window {
    TradingView: {
      widget: new (options: {
        container_id: string;
        autosize: boolean;
        symbol: string;
        interval: string;
        timezone: string;
        theme: string;
        style: string;
        locale: string;
        toolbar_bg: string;
        enable_publishing: boolean;
        allow_symbol_change: boolean;
        save_image: boolean;
        hide_top_toolbar: boolean;
        backgroundColor: string;
      }) => void;
    };
  }
}

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      console.log("TradingView script loaded");
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: "tradingview_chart",
          autosize: true,
          symbol: "BITSTAMP:BTCUSD",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#000000",
          enable_publishing: false,
          allow_symbol_change: true,
          save_image: false,
          hide_top_toolbar: true,
          backgroundColor: "transparent",
        });
      } else {
        console.error("TradingView is not available on window");
      }
    };
    script.onerror = () => {
      console.error("Failed to load TradingView script");
    };
    document.body.appendChild(script);
  }, []);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Logged in successfully");
    router.push("/userdashboard");
  };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Signed up successfully");
    router.push("/userdashboard");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ToastContainer />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <img
          src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
          alt="Bitcoin Logo"
          width="100"
          height="100"
        />
        <h1 className="text-4xl font-bold">Welcome to Bitvest.org</h1>
        <p className="text-lg text-center sm:text-left">
          Discover the future of finance with Bitcoin. Secure, decentralized, and global.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => setShowSignup(true)}
          >
            Sign Up
          </button>
        </div>
        <section className="features mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="card">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/security-checked.png" alt="Secure Transactions" className="icon" />
              <h3 className="text-xl font-semibold">Secure Transactions</h3>
              <p>Experience the security of blockchain technology.</p>
            </div>
            <div className="card">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/globe.png" alt="Global Reach" className="icon" />
              <h3 className="text-xl font-semibold">Global Reach</h3>
              <p>Send and receive Bitcoin anywhere in the world.</p>
            </div>
            <div className="card">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/decentralized-network.png" alt="Decentralized Network" className="icon" />
              <h3 className="text-xl font-semibold">Decentralized Network</h3>
              <p>Join a network that is not controlled by any single entity.</p>
            </div>
          </div>
        </section>
        <section className="chart mt-8 w-full">
          <div id="tradingview_chart" className="w-full h-96 border border-solid border-gray-300 rounded-lg"></div>
        </section>
      </main>
      <footer className="row-start-3 flex items-center justify-center">
        <p>&copy; 2025 Bitvest. All rights reserved.</p>
      </footer>
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
                <FaUser className="mr-2 text-gray-500" />
                <input
                  className="w-full px-3 py-2 bg-transparent border-none focus:outline-none text-black"
                  type="text"
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  placeholder="Username or Email"
                  required
                />
              </div>
              <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
                <FaLock className="mr-2 text-gray-500" />
                <input
                  className="w-full px-3 py-2 bg-transparent border-none focus:outline-none text-black"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-300 rounded-lg text-black"
                  onClick={() => setShowLogin(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
                <FaUser className="mr-2 text-gray-500" />
                <input
                  className="w-full px-3 py-2 bg-transparent border-none focus:outline-none text-black"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
                <FaEnvelope className="mr-2 text-gray-500" />
                <input
                  className="w-full px-3 py-2 bg-transparent border-none focus:outline-none text-black"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
                <FaLock className="mr-2 text-gray-500" />
                <input
                  className="w-full px-3 py-2 bg-transparent border-none focus:outline-none text-black"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-300 rounded-lg text-black"
                  onClick={() => setShowSignup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
