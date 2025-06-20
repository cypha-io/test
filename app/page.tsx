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
    <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <main className="container mx-auto flex-grow flex flex-col items-center p-8">
        <div className="flex flex-col items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
            alt="Bitcoin Logo"
            width="100"
            height="100"
            className="mb-4"
          />
          <h2 className="text-4xl font-bold text-center sm:text-left">Welcome to Bitvest.org</h2>
        </div>
        <p className="text-lg text-center sm:text-left mt-4">
          Discover the future of finance with Bitcoin. Secure, decentralized, and global.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
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

        {/* Features Section */}
        <section className="features mt-12 w-full">
          <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Why Choose Bitvest?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <FaShieldAlt className="text-4xl mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Secure Transactions</h3>
              <p className="text-black dark:text-white">Experience the security of blockchain technology.</p>
            </div>
            <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <FaGlobe className="text-4xl mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Global Reach</h3>
              <p className="text-black dark:text-white">Send and receive Bitcoin anywhere in the world.</p>
            </div>
            <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <FaChartLine className="text-4xl mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Real-Time Analytics</h3>
              <p className="text-black dark:text-white">Track market trends and make informed decisions.</p>
            </div>
            <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <FaMobileAlt className="text-4xl mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Mobile Friendly</h3>
              <p className="text-black dark:text-white">Access your account anytime, anywhere.</p>
            </div>
            <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <FaBitcoin className="text-4xl mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Decentralized Network</h3>
              <p className="text-black dark:text-white">Join a network that is not controlled by any single entity.</p>
            </div>
            <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <FaEthereum className="text-4xl mb-4 text-indigo-500" />
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Multi-Currency Support</h3>
              <p className="text-black dark:text-white">Trade Bitcoin, Ethereum, and more.</p>
            </div>
          </div>
        </section>

        {/* Partner Logos Slider */}
        <section className="partners mt-16 w-full">
          <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Our Trusted Partners</h2>
          <Slider {...sliderSettings}>
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <img src={logo} alt={`Partner ${index + 1}`} className="h-16 w-auto" />
              </div>
            ))}
          </Slider>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials mt-16 w-full">
          <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="testimonial bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-black dark:text-white italic">
                &quot;Bitvest has revolutionized the way I trade Bitcoin. The platform is secure and easy to use!&quot;
              </p>
              <p className="mt-4 text-right text-black dark:text-white font-semibold">- John Doe</p>
            </div>
            <div className="testimonial bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-black dark:text-white italic">
                &quot;I love the real-time analytics and the global reach of Bitvest. Highly recommended!&quot;
              </p>
              <p className="mt-4 text-right text-black dark:text-white font-semibold">- Jane Smith</p>
            </div>
            <div className="testimonial bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-black dark:text-white italic">
                &quot;The mobile-friendly design makes it so convenient to manage my investments on the go.&quot;
              </p>
              <p className="mt-4 text-right text-black dark:text-white font-semibold">- Alex Johnson</p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta mt-16 w-full text-center">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Ready to Start Your Bitcoin Journey?</h2>
          <p className="text-lg mb-6 text-black dark:text-white">
            Join thousands of users who trust Bitvest for their cryptocurrency needs.
          </p>
          <button
            className="rounded-full bg-orange-500 text-white px-6 py-3 text-lg font-semibold hover:bg-orange-600 transition-colors"
            onClick={() => setShowSignup(true)}
          >
            Get Started Now
          </button>
        </section>
      </main>
      <footer className="w-full bg-white dark:bg-gray-800 shadow-md py-4 px-8">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-gray-800 dark:text-gray-100">&copy; 2025 Bitvest. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-800 dark:text-gray-100 hover:underline">Privacy Policy</a>
            <a href="#" className="text-gray-800 dark:text-gray-100 hover:underline">Terms of Service</a>
            <a href="#" className="text-gray-800 dark:text-gray-100 hover:underline">Contact Us</a>
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
