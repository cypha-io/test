"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaExchangeAlt, FaBalanceScale, FaBitcoin, FaChartLine, FaDollarSign, FaShoppingCart, FaArrowCircleDown, FaSignOutAlt } from "react-icons/fa";

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

const UserDashboard = () => {
  const [darkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        console.log("TradingView script loaded");
        if (window.TradingView) {
          new window.TradingView.widget({
            container_id: "investment_chart",
            autosize: true,
            symbol: "BITSTAMP:BTCUSD",
            interval: "W",
            timezone: "Etc/UTC",
            theme: darkMode ? "dark" : "light",
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
    }
  }, [darkMode]);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className={`min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] ${darkMode ? "dark" : ""}`}>
      <header className="flex flex-col items-center sm:items-start mb-4 w-full">
        <h1 className="text-4xl font-bold">Welcome Don Mullins</h1>
        <div className="flex gap-4 mt-4">
          <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-green-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            <FaShoppingCart className="text-lg" />
            Buy Bitcoin
          </button>
          <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            <FaArrowCircleDown className="text-lg" />
            Withdraw Bitcoin
          </button>
          <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-500 text-white gap-2 hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" onClick={handleLogout}>
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </header>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4 w-full">
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaExchangeAlt className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Transactions</h3>
            <p>1</p>
          </div>
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaBalanceScale className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Total Balance</h3>
            <p>$1,113.00</p>
          </div>
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaBitcoin className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2">BTC Balance</h3>
            <p>0.01275 BTC</p>
          </div>
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaChartLine className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Profit</h3>
            <p>$119.00</p>
          </div>
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaDollarSign className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Total Investment</h3>
            <p>$994.00</p>
          </div>
        </div>
        <section className="chart mt-8 w-full">
          <div id="investment_chart" className="w-full h-96 border border-solid border-gray-300 dark:border-gray-700 rounded-lg"></div>
        </section>
        <section className="widgets mt-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="widget bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/security-checked.png" alt="Secure Transactions" className="icon" />
            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p>Experience the security of blockchain technology.</p>
          </div>
          <div className="widget bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/globe.png" alt="Global Reach" className="icon" />
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p>Send and receive Bitcoin anywhere in the world.</p>
          </div>
          <div className="widget bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/decentralized-network.png" alt="Decentralized Network" className="icon" />
            <h3 className="text-xl font-semibold mb-2">Decentralized Network</h3>
            <p>Join a network that is not controlled by any single entity.</p>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-4 bg-transparent text-foreground">
        <p>&copy; 2025 Bitvest. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
