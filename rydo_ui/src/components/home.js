import homeimg2 from '../images/rydo_homeimg2.png'
import phone from '../images/mobile.png'
import cardriver from '../images/car_driver.jpeg'


import { FaCar, FaCity, FaPlane, FaTags, FaHeadset, FaBolt, FaStar, FaUserTie, FaBroom } from "react-icons/fa";

function Home() {
  return (
    <div className="w-full">
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat text-white px-4"
            style={{ backgroundImage: `url(${homeimg2})` }}
            >
            <div className="max-w-6xl mx-auto min-h-screen flex items-center">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">

                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    Enjoy Your <br className="hidden md:block" />
                    Comfortable Trip
                    </h1>

                    <p className="text-gray-300 mb-6">
                    Safe, reliable, and affordable rides at your fingertips
                    </p>

                    <button className="bg-transparent text-white border border-white px-8 py-3 rounded-lg font-semibold hover:bg-transparent hover:text-black hover:bg-yellow-500 hover:border-yellow-500 transition">
                    Book Now
                    </button>
                </div>

                <div className="flex justify-center md:justify-end">
                    <img
                    src={phone}
                    alt="Rydo Phone"
                    className="w-80 md:w-150 hover:scale-105 transition-transform duration-500"
                    />
                </div>

                </div>

            </div>
            </div>


      {/* Services div */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900">
            We Offer Best Taxi Service in Kerala
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service Card 1 */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-yellow-500 transition-colors duration-300">
              <div className="bg-zinc-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white"><FaCar /></span>
              </div>
              <h3 className="text-xl font-bold mb-2">Outstation Cab</h3>
              <p className="text-gray-600">
                Comfortable rides for long distance travel
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-yellow-500 transition-colors duration-300">
              <div className="bg-zinc-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white"><FaCity /></span>
              </div>
              <h3 className="text-xl font-bold mb-2">Local Cab</h3>
              <p className="text-gray-600">
                Quick and easy rides within the city
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-yellow-500 transition-colors duration-300">
              <div className="bg-zinc-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white"><FaPlane /> </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Airport Transfer</h3>
              <p className="text-gray-600">
                On-time pickup and drop to airport
              </p>
            </div>
          </div>
        </div>
      </div>

{/* Why Choose Us*/} 

      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={cardriver}
                alt="Driver"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Book Our Taxi Service?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-500 w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Long Distance Trip</h4>
                    <p className="text-gray-600">
                      We cover all major destinations across India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-500 w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Affordable Rates</h4>
                    <p className="text-gray-600">
                      Competitive pricing with no hidden charges
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-500 w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">24x7 Service</h4>
                    <p className="text-gray-600">
                      Available round the clock for your convenience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing div */}
      <div className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-5 text-zinc-900">Flexible Taxi Fares</h2>
          <p className="text-center mb-12 w-full">At Rydo, we understand that every journey is unique, which is why we offer flexible and competitive rates tailored to your specific needs. Our pricing structure is designed to provide transparency, affordability, and value, ensuring that you receive the best service at a fair price.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:bg-yellow-500 hover:transition-colors duration-300">
              <div className="bg-zinc-900 text-white text-center py-4">
                <h3 className="text-xl font-bold">Economy Ride</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span>
                    <span>Sedan Cars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span>
                    <span>AC Available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span>
                    <span>4 Passengers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span>
                    <span>Small Luggage Space</span>
                  </li>
                </ul>
                <button className="w-full bg-zinc-900 text-white py-3 rounded-lg font-semibold">
                  Book Now
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transform scale-105 hover:bg-yellow-500 transition-colors duration-300">
              <div className="bg-zinc-900 text-white text-center py-4">
                <h3 className="text-xl font-bold">Premium Ride</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>SUV Cars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>AC Available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>7-9 Passengers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Extra Luggage Space</span>
                  </li>
                </ul>
                <button className="w-full bg-zinc-900 text-white py-3 rounded-lg font-semibold">
                  Book Now
                </button>
              </div>
            </div>

            {/* Luxury Plan */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:bg-yellow-500 hover:transition-colors duration-300">
              <div className="bg-zinc-900 text-white text-center py-4">
                <h3 className="text-xl font-bold">Luxury Ride</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span>
                    <span>Luxury Cars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span>
                    <span>Premium AC</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span>
                    <span>4 Passengers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span>
                    <span>Professional Driver</span>
                  </li>
                </ul>
                <button className="w-full bg-zinc-900 text-white py-3 rounded-lg font-semibold">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features div */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-yellow-500 hover:transition-colors duration-300">
              <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white"><FaTags /></span>
              </div>
              <h3 className="text-xl font-bold mb-2">Affordable Rates</h3>
              <p>Best prices in the market with transparent billing</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-yellow-500 hover:transition-colors duration-300">
              <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white"> <FaHeadset/>  </span>
              </div>
              <h3 className="text-xl font-bold mb-2">24x7 Support</h3>
              <p>Round the clock customer support for your queries</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-yellow-500 hover:transition-colors duration-300">
              <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white"><FaBolt /></span>
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Ride</h3>
              <p>Fast pickup and drop with experienced drivers</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-yellow-500 hover:transition-colors duration-300">
              <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white"><FaStar /></span>
              </div>
              <h3 className="text-xl font-bold mb-2">Top Condition</h3>
              <p>Well-maintained vehicles for a comfortable journey</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-yellow-500 hover:transition-colors duration-300">
              <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white"><FaUserTie /></span>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Drivers</h3>
              <p>Licensed and professional drivers for your safety</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-yellow-500 hover:transition-colors duration-300">
              <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-white"><FaBroom /></span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cleanliness & Hygiene</h3>
              <p>Sanitized vehicles for your health and safety</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials div */}
      <div className="py-16 px-4 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white text-black p-6 rounded-lg hover:scale-105 transition-transform duration-600">
              <div className="flex gap-1 mb-4">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="mb-4">
                "Excellent service! The driver was professional and the car was very clean. Highly recommended!"
              </p>
              <p className="font-bold">- Rahul Sharma</p>
            </div>

            <div className="bg-white text-black p-6 rounded-lg hover:scale-105 transition-transform duration-600">
              <div className="flex gap-1 mb-4">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="mb-4">
                "Very affordable rates and great customer service. Will definitely use again for my next trip."
              </p>
              <p className="font-bold">- Priya Singh</p>
            </div>

            <div className="bg-white text-black p-6 rounded-lg hover:scale-105 transition-transform duration-600">
              <div className="flex gap-1 mb-4">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="mb-4">
                "Punctual and reliable. The driver reached on time and the journey was smooth and comfortable."
              </p>
              <p className="font-bold">- Amit Kumar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action div */}
      <div className="py-16 px-4 bg-white">
        
      </div>

      
    </div>
  );
}

export default Home;