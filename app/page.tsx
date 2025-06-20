"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser, FaBitcoin, FaEthereum, FaChartLine, FaShieldAlt, FaMobileAlt, FaGlobe } from "react-icons/fa";
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

    if (usernameOrEmail.includes("dav") || usernameOrEmail.includes("Dav")) {
      toast.success("Welcome David!");
      router.push("/userdashboard2");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <ToastContainer />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-purple-600/20 dark:from-orange-600/20 dark:to-purple-800/20"></div>
        <div className="relative container mx-auto px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl w-32 h-32 mx-auto animate-pulse"></div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                alt="Bitcoin Logo"
                width="120"
                height="120"
                className="mb-6 mx-auto relative z-10 animate-bounce"
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600 mb-6 animate-fade-in">
              Bitvest.org
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              The Future of Finance is Here. Trade Bitcoin with confidence on our 
              <span className="text-orange-500 font-semibold"> secure, intelligent platform</span>
            </p>
            <div className="flex gap-6 items-center justify-center flex-col sm:flex-row mt-12">
              <button
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                onClick={() => setShowLogin(true)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaBitcoin className="animate-spin-slow" />
                  Start Trading
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
              <button
                className="group relative overflow-hidden rounded-full border-2 border-purple-500 text-purple-600 dark:text-purple-400 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-purple-500 hover:text-white"
                onClick={() => setShowSignup(true)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaChartLine />
                  Join Free
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Bar */}
      <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-green-500">$98,420</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Bitcoin Price</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-blue-500">+5.2%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">24h Change</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-purple-500">1.2M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-orange-500">$45B</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Volume 24h</div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-8 py-16">

        {/* Enhanced Features Section */}
        <section className="features mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose <span className="text-gradient bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">Bitvest</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the next generation of cryptocurrency trading with our advanced features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Military-Grade Security</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Bank-level encryption and multi-layer security protocols protect your assets 24/7
                </p>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaGlobe className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Global Marketplace</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Trade with users worldwide in 150+ countries with instant settlements
                </p>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaChartLine className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">AI-Powered Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Advanced market insights and predictive analytics to maximize your profits
                </p>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaMobileAlt className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Mobile First Design</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Seamless experience across all devices with our responsive mobile app
                </p>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaBitcoin className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Lightning Fast Trades</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Execute trades in milliseconds with our high-performance trading engine
                </p>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaEthereum className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Multi-Asset Trading</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Trade Bitcoin, Ethereum, and 100+ cryptocurrencies in one platform
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Partner Logos Slider */}
        <section className="partners mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Leading <span className="text-orange-500">Financial Partners</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Join the ecosystem backed by world-class payment providers
            </p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <Slider {...sliderSettings}>
              {partnerLogos.map((logo, index) => (
                <div key={index} className="flex justify-center px-4">
                  <div className="group p-4 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-110">
                    <img src={logo} alt={`Partner ${index + 1}`} className="h-12 w-auto mx-auto opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="testimonials mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our <span className="text-purple-500">Traders</span> Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of successful traders who trust Bitvest with their investments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">J</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">John Doe</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Professional Trader</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  &quot;Bitvest revolutionized my trading experience. The AI analytics helped me increase my profits by 340% in just 6 months!&quot;
                </p>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Sarah Chen</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Crypto Investor</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  &quot;The security features are unmatched. I sleep peacefully knowing my assets are protected by military-grade encryption.&quot;
                </p>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Alex Rivera</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tech Entrepreneur</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  &quot;Lightning-fast transactions and the mobile app is incredibly intuitive. Trading on-the-go has never been easier!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action Section */}
        <section className="cta mb-16">
          <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 rounded-3xl p-12 text-center">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Start Your <span className="text-yellow-300">Bitcoin Journey</span>?
              </h2>
              <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed">
                Join over 1.2 million traders who trust Bitvest for their cryptocurrency investments. 
                Start with just $10 and see your portfolio grow.
              </p>
              <div className="flex gap-6 justify-center flex-col sm:flex-row">
                <button
                  className="group relative overflow-hidden bg-white text-gray-900 px-8 py-4 text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                  onClick={() => setShowSignup(true)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaBitcoin className="text-orange-500" />
                    Start Trading Now
                  </span>
                </button>
                <button
                  className="group relative overflow-hidden border-2 border-white text-white px-8 py-4 text-lg font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
                  onClick={() => setShowLogin(true)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaChartLine />
                    Live Demo
                  </span>
                </button>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">0%</div>
                  <div className="text-sm text-gray-200">Trading Fees First Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">24/7</div>
                  <div className="text-sm text-gray-200">Customer Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">$10</div>
                  <div className="text-sm text-gray-200">Minimum Investment</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                  alt="Bitcoin Logo"
                  width="32"
                  height="32"
                />
                <h3 className="text-2xl font-bold text-orange-500">Bitvest</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The future of cryptocurrency trading. Secure, fast, and intelligent.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trading</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 Bitvest. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
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
                  id="loginPassword"
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
                  id="signupPassword"
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
