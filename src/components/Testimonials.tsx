import React, { useState } from 'react';
import { testimonials } from '../data/testimonials';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const previousTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const getVisibleTestimonials = () => {
    return [0, 1, 2].map((offset) => {
      return testimonials[(currentIndex + offset) % testimonials.length];
    });
  };

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>

          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Trusted by thousands of customers for reliable currency exchange.
          </p>
        </div>

        <div className="mt-12 relative">
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {getVisibleTestimonials().map((testimonial) => (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>

                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div className="ml-3">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-1 text-amber-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>

              <p className="text-gray-600 italic mb-6">"{testimonials[currentIndex].content}"</p>

              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>

                <div className="ml-3">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={previousTestimonial}
              className="h-10 w-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    currentIndex === index ? 'bg-teal-700' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-16 bg-teal-50 rounded-xl p-6 lg:p-8 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-teal-800">Why Choose Exotic Money Changers?</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 rounded-full p-3 mb-4">
                <svg
                  className="h-8 w-8 text-teal-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2">Fast Service</h4>

              <p className="text-gray-600">
                Quick and efficient currency exchange with minimal waiting time.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 rounded-full p-3 mb-4">
                <svg
                  className="h-8 w-8 text-teal-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Transactions</h4>

              <p className="text-gray-600">
                Your money and data are protected with our secure systems.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 rounded-full p-3 mb-4">
                <svg
                  className="h-8 w-8 text-teal-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2">Competitive Rates</h4>

              <p className="text-gray-600">
                Get the best exchange rates with minimal fees and no hidden charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
