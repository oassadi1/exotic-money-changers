import React from 'react';
import { RefreshCw, TrendingUp, CreditCard, MapPin, ShieldCheck, Briefcase } from 'lucide-react';

const services = [
  {
    icon: <RefreshCw className="h-8 w-8 text-teal-600" />,
    title: 'Currency Exchange',
    description: 'Exchange over 50+ currencies at competitive rates with minimal fees.'
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-teal-600" />,
    title: 'Live Exchange Rates',
    description: 'Get real-time exchange rates updated throughout the day.'
  },
  {
    icon: <CreditCard className="h-8 w-8 text-teal-600" />,
    title: 'Travel Cards',
    description: 'Multi-currency travel cards for convenience and security while traveling.'
  },
  {
    icon: <MapPin className="h-8 w-8 text-teal-600" />,
    title: 'Multiple Locations',
    description: 'Visit any of our branches or use our online services for convenience.'
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-teal-600" />,
    title: 'Secure Transactions',
    description: 'Industry-standard security protocols to protect your transactions.'
  },
  {
    icon: <Briefcase className="h-8 w-8 text-teal-600" />,
    title: 'Business Services',
    description: 'Specialized services for businesses with international transactions.'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Exchange your currency with confidence through our comprehensive range of services.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-teal-700 to-teal-600 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Ready to exchange your currency?
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-teal-100">
                Visit any of our locations or use our online services for fast and secure currency exchange.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <div className="sm:flex">
                <a href="#contact" className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-white hover:bg-gray-50 shadow-sm">
                  Contact Us
                </a>
                <a href="#calculator" className="mt-3 sm:mt-0 sm:ml-3 flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 shadow-sm">
                  Exchange Calculator
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;