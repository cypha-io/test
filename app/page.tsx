"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser, FaBitcoin, FaEthereum, FaChartLine, FaShieldAlt, FaMobileAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();

  const partnerLogos = [
    "https://img.icons8.com/color/48/000000/visa.png",
    "https://img.icons8.com/color/48/000000/mastercard.png",
    "https://img.icons8.com/color/48/000000/paypal.png",
    "https://img.icons8.com/color/48/000000/amex.png",
    "https://img.icons8.com/color/48/000000/bitcoin.png",
    "https://img.icons8.com/color/48/000000/ethereum.png",
    "https://img.icons8.com/color/48/000000/google-wallet.png",
    "https://img.icons8.com/color/48/000000/apple-pay.png",
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1500, // Increased speed for faster movement
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20, // Faster autoplay interval
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const usernameOrEmail = (event.target as HTMLFormElement).usernameOrEmail.value.toLowerCase();

    if (usernameOrEmail.includes("don") || usernameOrEmail.includes("mullins")) {
      toast.success("Welcome Don Mullins!");
      router.push("/userdashboard");
      return;
    }

    if (usernameOrEmail.includes("earl") || usernameOrEmail.includes("farr") || usernameOrEmail.includes("Earl")) {
      toast.success("Welcome Earl!");
      router.push("/userdashboard2");
      return;
    }

    if (usernameOrEmail.includes("lina") || usernameOrEmail.includes("guzman") || usernameOrEmail.includes("addy")) {
      toast.success("Welcome Lina Guzman Addy!");
      router.push("/userdashboard3");
      return;
    }

    toast.error("Invalid username/email or password");
  };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Signed up successfully. Please login now.");
    setShowSignup(false);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ToastContainer />
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-black to-blue-600/10"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 rounded-full blur opacity-75 animate-pulse"></div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                  alt="Bitcoin"
                  width="40"
                  height="40"
                  className="relative z-10"
                />
              </div>
              <span className="text-2xl font-bold text-white">BitVest</span>
              <span className="text-orange-500 text-sm bg-orange-500/20 px-2 py-1 rounded-full">PRO</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Markets</a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Trading</a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Analytics</a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4 animate-pulse">
                  🚀 #1 Bitcoin Exchange
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Trade Bitcoin
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 animate-gradient">
                  Like a Pro
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                Experience lightning-fast trades, advanced analytics, and institutional-grade security. 
                Join over <span className="text-orange-500 font-bold">2M+ traders</span> worldwide.
              </p>
              
              {/* Real-time stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">$98,420</div>
                  <div className="text-sm text-gray-400">BTC Price</div>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">+5.2%</div>
                  <div className="text-sm text-gray-400">24h Change</div>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">$45B</div>
                  <div className="text-sm text-gray-400">Volume</div>
                </div>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                <button
                  className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
                  onClick={() => setShowLogin(true)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaBitcoin className="animate-spin" />
                    Start Trading Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                  className="group bg-transparent border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
                  onClick={() => setShowSignup(true)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaChartLine />
                    View Demo
                  </span>
                </button>
              </div>
            </div>
            
            {/* Interactive Chart Preview */}
            <div className="relative">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-xl">Live Bitcoin Chart</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">Live</span>
                  </div>
                </div>
                <div className="h-80 bg-black/50 rounded-lg flex items-center justify-center border border-gray-800">
                  <div className="text-center">
                    <FaChartLine className="text-4xl text-orange-500 mb-4 mx-auto animate-pulse" />
                    <p className="text-gray-400">Interactive Chart</p>
                    <p className="text-sm text-gray-500">Real-time market data</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-green-400 font-bold">+12.5%</div>
                    <div className="text-gray-500 text-xs">1H</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold">+8.3%</div>
                    <div className="text-gray-500 text-xs">24H</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 font-bold">-2.1%</div>
                    <div className="text-gray-500 text-xs">7D</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold">+45.7%</div>
                    <div className="text-gray-500 text-xs">30D</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Features Ticker */}
      <section className="relative z-10 bg-gray-900/80 backdrop-blur-md border-y border-gray-800">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between overflow-hidden">
            <div className="flex items-center space-x-8 animate-scroll">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <FaBitcoin className="text-orange-500" />
                <span className="text-white font-bold">BTC/USD</span>
                <span className="text-green-400">$98,420.50</span>
                <span className="text-green-400 text-sm">+5.2%</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <FaEthereum className="text-blue-500" />
                <span className="text-white font-bold">ETH/USD</span>
                <span className="text-green-400">$3,240.80</span>
                <span className="text-green-400 text-sm">+3.1%</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-purple-500">●</span>
                <span className="text-white font-bold">ADA/USD</span>
                <span className="text-red-400">$0.45</span>
                <span className="text-red-400 text-sm">-1.8%</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-yellow-500">●</span>
                <span className="text-white font-bold">Market Cap</span>
                <span className="text-white">$1.89T</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-green-500">●</span>
                <span className="text-white font-bold">24h Volume</span>
                <span className="text-white">$45.2B</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10">

        {/* Trading Platform Features */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Professional Trading
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                  Made Simple
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Access institutional-grade tools, advanced charting, and real-time market data
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Advanced Trading */}
              <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaChartLine className="text-2xl text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Advanced Charts</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Professional TradingView charts with 100+ technical indicators, drawing tools, and custom strategies.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      Real-time price feeds
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      Advanced order types
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      Risk management tools
                    </li>
                  </ul>
                </div>
              </div>

              {/* Security Features */}
              <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaShieldAlt className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Bank-Grade Security</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Your funds are protected by industry-leading security measures and cold storage technology.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      256-bit SSL encryption
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Multi-signature wallets
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Insurance protection
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mobile Trading */}
              <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaMobileAlt className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Mobile Trading</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Trade on-the-go with our award-winning mobile app. Available on iOS and Android.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Push notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Biometric authentication
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Offline order placement
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Partners */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Trusted by Leading <span className="text-orange-500">Institutions</span>
              </h2>
              <p className="text-lg text-gray-400">
                Partnered with the world&apos;s most trusted financial institutions
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <Slider {...sliderSettings}>
                {partnerLogos.map((logo, index) => (
                  <div key={index} className="flex justify-center px-4">
                    <div className="group p-6 rounded-xl hover:bg-gray-700/30 transition-all duration-300 hover:scale-110">
                      <img src={logo} alt={`Partner ${index + 1}`} className="h-12 w-auto mx-auto opacity-40 group-hover:opacity-80 transition-opacity filter grayscale group-hover:grayscale-0" />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>

        {/* Professional Testimonials */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Pro Traders</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                See what professional traders and institutions say about our platform
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-black font-bold text-xl">M</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Michael Chen</h4>
                      <p className="text-orange-400 text-sm">Senior Portfolio Manager</p>
                      <p className="text-gray-500 text-xs">Goldman Sachs Digital Assets</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-orange-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 italic leading-relaxed">
                    &quot;BitVest&apos;s institutional-grade infrastructure has been instrumental in our digital asset strategy. The execution speed and reliability are unmatched.&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                    <span>🏆 $2.3B+ Managed</span>
                    <span>📈 840% ROI</span>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Sarah Kim</h4>
                      <p className="text-blue-400 text-sm">Quantitative Trader</p>
                      <p className="text-gray-500 text-xs">Citadel Securities</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-blue-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 italic leading-relaxed">
                    &quot;The advanced API and low-latency execution have given us a significant edge in algorithmic trading. BitVest delivers what institutions need.&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                    <span>⚡ 0.02ms Latency</span>
                    <span>🤖 AI Trading</span>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Alex Rodriguez</h4>
                      <p className="text-green-400 text-sm">Head of Trading</p>
                      <p className="text-gray-500 text-xs">Pantera Capital</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-green-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 italic leading-relaxed">
                    &quot;Security and compliance are paramount in our industry. BitVest&apos;s robust infrastructure and regulatory compliance make them our preferred partner.&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                    <span>🛡️ SOC2 Certified</span>
                    <span>💼 $4.1B Volume</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
          </div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-black mb-6">
                Ready to Join the Future?
              </h2>
              <p className="text-xl md:text-2xl text-black/80 mb-12 leading-relaxed">
                Start trading with as little as $10. Join over 2 million traders who trust BitVest 
                for their cryptocurrency investments.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 border border-black/20">
                  <div className="text-3xl font-bold text-black mb-2">0.01%</div>
                  <div className="text-black/80">Ultra-Low Fees</div>
                </div>
                <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 border border-black/20">
                  <div className="text-3xl font-bold text-black mb-2">24/7</div>
                  <div className="text-black/80">Expert Support</div>
                </div>
                <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 border border-black/20">
                  <div className="text-3xl font-bold text-black mb-2">$10</div>
                  <div className="text-black/80">Minimum Deposit</div>
                </div>
              </div>

              <div className="flex gap-6 justify-center flex-col sm:flex-row">
                <button
                  className="group relative bg-black text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onClick={() => setShowSignup(true)}
                >
                  <span className="flex items-center justify-center gap-3">
                    <FaBitcoin className="text-orange-400" />
                    Create Free Account
                  </span>
                </button>
                <button
                  className="group bg-transparent border-3 border-black text-black px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:bg-black hover:text-white"
                  onClick={() => setShowLogin(true)}
                >
                  <span className="flex items-center justify-center gap-3">
                    <FaChartLine />
                    Try Demo
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Professional Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur opacity-75"></div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                    alt="Bitcoin Logo"
                    width="40"
                    height="40"
                    className="relative z-10"
                  />
                </div>
                <span className="text-3xl font-bold text-white">BitVest</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                The world&apos;s most trusted cryptocurrency exchange. Trade Bitcoin and 100+ cryptocurrencies 
                with institutional-grade security and professional tools.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 rounded-lg p-3">
                  <span className="text-gray-400 text-sm">Regulated by</span>
                  <div className="text-white font-semibold">SEC & CFTC</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <span className="text-gray-400 text-sm">Insured up to</span>
                  <div className="text-white font-semibold">$250M</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Products</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Spot Trading</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Futures Trading</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Options Trading</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">DeFi Staking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">NFT Marketplace</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Press Kit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Legal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Contact Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">API Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">System Status</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 lg:mb-0">
                <p className="text-gray-400">&copy; 2025 BitVest. All rights reserved.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Trade safely:</span>
                <div className="flex space-x-2">
                  <div className="bg-gray-800 rounded px-2 py-1">
                    <span className="text-white text-xs font-semibold">SSL</span>
                  </div>
                  <div className="bg-gray-800 rounded px-2 py-1">
                    <span className="text-white text-xs font-semibold">2FA</span>
                  </div>
                  <div className="bg-gray-800 rounded px-2 py-1">
                    <span className="text-white text-xs font-semibold">COLD STORAGE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center modal-backdrop z-50 animate-fadeIn">
          <div className="relative max-w-md w-full mx-4 animate-slideInUp">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-xl"></div>
            
            {/* Main container */}
            <div className="relative glass-card p-8 rounded-2xl shadow-2xl transform transition-all duration-300 btn-hover-scale">
              {/* Close button */}
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close login modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400">Sign in to your BitVest account</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Username/Email field */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                    type="text"
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    placeholder="Username or Email"
                    required
                  />
                </div>
                
                {/* Password field */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                    type="password"
                    id="loginPassword"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                
                {/* Remember me and forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500 rounded border-gray-600 bg-gray-800 focus:ring-orange-500 focus:ring-offset-0" />
                    <span className="ml-2 text-sm text-gray-400">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
                
                {/* Action buttons */}
                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transform transition-all duration-200 btn-hover-scale shadow-lg animate-pulse-glow"
                  >
                    Sign In
                  </button>
                  
                  <div className="text-center">
                    <span className="text-gray-400">Don&apos;t have an account? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowLogin(false);
                        setShowSignup(true);
                      }}
                      className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              
              {/* Social login divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black/40 text-gray-400">Or continue with</span>
                  </div>
                </div>
                
                {/* Social buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center modal-backdrop z-50 animate-fadeIn">
          <div className="relative max-w-md w-full mx-4 animate-slideInUp">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-600/20 to-orange-500/20 rounded-2xl blur-xl"></div>
            
            {/* Main container */}
            <div className="relative glass-card p-8 rounded-2xl shadow-2xl transform transition-all duration-300 btn-hover-scale">
              {/* Close button */}
              <button
                onClick={() => setShowSignup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close signup modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Join BitVest</h2>
                <p className="text-gray-400">Start your crypto trading journey today</p>
              </div>
              
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Username field */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Choose a username"
                    required
                  />
                </div>
                
                {/* Email field */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                {/* Password field */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                    type="password"
                    id="signupPassword"
                    name="password"
                    placeholder="Create a strong password"
                    required
                  />
                  <div className="mt-2 text-xs text-gray-400">
                    Must be at least 8 characters with numbers and symbols
                  </div>
                </div>
                
                {/* Terms and conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="form-checkbox h-4 w-4 text-purple-500 rounded border-gray-600 bg-gray-800 focus:ring-purple-500 focus:ring-offset-0 mt-1"
                    required
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
                    I agree to the{' '}
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                
                {/* Action buttons */}
                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transform transition-all duration-200 btn-hover-scale shadow-lg"
                  >
                    Create Account
                  </button>
                  
                  <div className="text-center">
                    <span className="text-gray-400">Already have an account? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                      }}
                      className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
              
              {/* Social signup divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black/40 text-gray-400">Or sign up with</span>
                  </div>
                </div>
                
                {/* Social buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    Twitter
                  </button>
                </div>
              </div>
              
              {/* Security notice */}
              <div className="mt-6 p-4 security-badge rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-green-400 font-medium">Secure Registration</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Your data is encrypted and protected with bank-level security
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
