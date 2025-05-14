import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-teal-800 to-teal-600 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/259249/pexels-photo-259249.jpeg?auto=compress&cs=tinysrgb&w=1500')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Fast & Secure <br />
              <span className="text-amber-400">Currency Exchange</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-teal-50 max-w-2xl">
              Exotic Money Changers offers competitive exchange rates with no
              hidden fees. Whether you're traveling, sending money abroad, or
              investing internationally, we've got you covered.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#calculator"
                className="px-8 py-3 bg-white text-teal-800 rounded-md font-medium shadow-md hover:bg-gray-100 transition-colors text-center"
              >
                Exchange Currency
              </a>
              <a
                href="#services"
                className="px-8 py-3 bg-transparent border-2 border-white rounded-md font-medium hover:bg-white/10 transition-colors text-center"
              >
                Our Services
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Currency exchange card */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-teal-700 p-5 text-white text-center relative">
                  <h3 className="font-bold">Today's Top Exchange Rates</h3>
                  <span className="absolute top-12 bg-orange-400 text-white text-xs px-2 py-2 rounded-full font-semibold">
                    Best Rates Guaranteed
                  </span>
                </div>

                <div className="p-6">
                  <div className="space-y-4 text-center text-gray-800 text-lg">
                    <div>
                      🇺🇸 USD → 🇮🇳 ₹ ={" "}
                      <span className="text-teal-700 font-bold">83.25</span>
                    </div>
                    <div>
                      🇪🇺 EUR → 🇮🇳 ₹ ={" "}
                      <span className="text-teal-700 font-bold">89.75</span>
                    </div>
                    <div>
                      🇬🇧 GBP → 🇮🇳 ₹ ={" "}
                      <span className="text-teal-700 font-bold">104.10</span>
                    </div>
                    <div>
                      🇸🇦 SAR → 🇮🇳 ₹ ={" "}
                      <span className="text-teal-700 font-bold">22.20</span>
                    </div>
                  </div>

                  <a
                    href="#calculator"
                    className="mt-6 block w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded text-center transition-colors"
                  >
                    View All Rates
                  </a>
                </div>

                <div className="bg-gray-50 p-3 flex items-center justify-center text-sm text-gray-500">
                  <span>Rates updated: Today at 09:45 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L48 105C96 90 192 60 288 50C384 40 480 50 576 55C672 60 768 60 864 65C960 70 1056 80 1152 75C1248 70 1344 50 1392 40L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
