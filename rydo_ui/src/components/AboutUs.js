import Navbar from "./Navbar";
import Footer from "./footer";

import { FaCar, FaShieldAlt, FaBolt, FaMapMarkerAlt, FaUsers, FaStar, FaRoad, FaGlobe, FaCheckCircle, FaLinkedinIn, FaArrowRight, FaMobileAlt, } from "react-icons/fa";
import groupimg from '../images/groupimg.jpeg';
import { Link } from "react-router-dom";


function AboutUs() {
  return (
    <div>
        <Navbar/>
        
        <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">

        {/* ════════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════════ */}
        <section className="bg-zinc-900 px-6 md:px-16 py-28 text-center">

            {/* Yellow pill badge */}
            <span className="inline-block bg-yellow-400 text-zinc-900 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-widest mb-6">
            Who We Are
            </span>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Rides That <span className="text-yellow-400">Move</span> You
            </h1>

            {/* Subtext */}
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Ryder started with one belief — getting from A to B should be safe,
            fast, and affordable for everyone. We are building the ride hailing
            platform that drivers and riders actually love.
            </p>

            {/* Two CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                to='/ride-booking'
                className="flex items-center justify-center gap-2 bg-yellow-400 text-zinc-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors"
            >
                Book a Ride <FaArrowRight size={12} />
            </Link>
            <Link
                to='/drive'
                className="border border-zinc-600 text-white font-bold px-8 py-3 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-colors"
            >
                Drive with Us
            </Link>
            </div>
        </section>

        {/* ════════════════════════════════════════
            STATS BAR — yellow background
        ════════════════════════════════════════ */}
        <section className="bg-yellow-400 py-10 px-6 md:px-16">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
                <div className="flex justify-center mb-2">
                <FaUsers className="text-zinc-900" size={22} />
                </div>
                <p className="text-4xl font-extrabold text-zinc-900">2M+</p>
                <p className="text-zinc-700 text-sm font-semibold mt-1">Happy Riders</p>
            </div>

            <div>
                <div className="flex justify-center mb-2">
                <FaCar className="text-zinc-900" size={22} />
                </div>
                <p className="text-4xl font-extrabold text-zinc-900">50K+</p>
                <p className="text-zinc-700 text-sm font-semibold mt-1">Active Drivers</p>
            </div>

            <div>
                <div className="flex justify-center mb-2">
                <FaRoad className="text-zinc-900" size={22} />
                </div>
                <p className="text-4xl font-extrabold text-zinc-900">10M+</p>
                <p className="text-zinc-700 text-sm font-semibold mt-1">Trips Completed</p>
            </div>

            <div>
                <div className="flex justify-center mb-2">
                <FaGlobe className="text-zinc-900" size={22} />
                </div>
                <p className="text-4xl font-extrabold text-zinc-900">30+</p>
                <p className="text-zinc-700 text-sm font-semibold mt-1">Cities Covered</p>
            </div>

            </div>
        </section>

        {/* ════════════════════════════════════════
            MISSION SECTION — 2 columns
        ════════════════════════════════════════ */}
        <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-14 items-center">

            {/* Left — photo */}
            <div className="w-full md:w-1/2">
                <img
                src={groupimg}
                alt="Ryder driver smiling"
                className="rounded-3xl w-full h-80 md:h-[420px] object-cover"
                />
            </div>

            {/* Right — text */}
            <div className="w-full md:w-1/2">
                <p className="text-yellow-500 text-xs font-extrabold uppercase tracking-widest mb-3">
                Our Mission
                </p>
                <h2 className="text-4xl font-extrabold leading-snug mb-5">
                Connecting people,<br />one ride at a time.
                </h2>
                <p className="text-zinc-500 leading-relaxed mb-4">
                We believe transportation is a basic right — not a luxury. Ryder
                makes it simple for anyone to get a safe, reliable ride with just
                a tap. Whether heading to work, the airport, or a late-night dinner,
                we have got you covered.
                </p>
                <p className="text-zinc-500 leading-relaxed mb-8">
                We also empower drivers to earn on their own terms — flexible hours,
                fair pay, and a community that actually has their back.
                </p>

                {/* Trust checklist */}
                <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zinc-800 font-medium">
                    <FaCheckCircle className="text-yellow-400 shrink-0" size={16} />
                    Full driver background verification on every signup
                </li>
                <li className="flex items-center gap-3 text-zinc-800 font-medium">
                    <FaCheckCircle className="text-yellow-400 shrink-0" size={16} />
                    Live GPS tracking shared with loved ones
                </li>
                <li className="flex items-center gap-3 text-zinc-800 font-medium">
                    <FaCheckCircle className="text-yellow-400 shrink-0" size={16} />
                    24/7 customer support via chat and call
                </li>
                </ul>
            </div>

            </div>
        </section>


        <section className="bg-zinc-900 py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">

            <p className="text-yellow-400 text-xs font-extrabold uppercase tracking-widest mb-2">
                What Drives Us
            </p>
            <h2 className="text-4xl font-extrabold text-white mb-12">
                Our Core Values
            </h2>

            {/* 4 value cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                {/* Speed */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-7 hover:border-yellow-400 transition-colors">
                <div className="bg-yellow-400 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                    <FaBolt className="text-zinc-900" size={20} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Speed</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    We match you with the nearest driver in under 60 seconds,
                    every single time without fail.
                </p>
                </div>

                {/* Safety */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-7 hover:border-yellow-400 transition-colors">
                <div className="bg-yellow-400 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                    <FaShieldAlt className="text-zinc-900" size={20} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Safety</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    Every driver is background-verified. Live trip tracking
                    keeps you and your loved ones secure.
                </p>
                </div>

                {/* Quality */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-7 hover:border-yellow-400 transition-colors">
                <div className="bg-yellow-400 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                    <FaStar className="text-zinc-900" size={20} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Quality</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    Our 5-star rating system ensures only the best drivers
                    remain active on the Ryder platform.
                </p>
                </div>

                {/* Reach */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-7 hover:border-yellow-400 transition-colors">
                <div className="bg-yellow-400 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                    <FaMapMarkerAlt className="text-zinc-900" size={20} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Reach</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    From city centres to suburbs — Ryder goes wherever
                    you need to go across 30+ cities.
                </p>
                </div>

            </div>
            </div>
        </section>

        <section className="py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">

            <p className="text-yellow-500 text-xs font-extrabold uppercase tracking-widest mb-2">
                The People
            </p>
            <h2 className="text-4xl font-extrabold mb-12">
                Meet Our Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                {/* Member 1 */}
                <div className="border border-zinc-200 rounded-2xl p-7 text-center hover:border-yellow-400 transition-colors">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-5">
                    <span className="text-zinc-900 font-extrabold text-lg">MR</span>
                </div>
                <h3 className="font-bold text-base text-zinc-900">Marcus Reid</h3>
                <p className="text-yellow-500 text-xs font-semibold mt-1 mb-4">Founder & CEO</p>
                <a
                    href="#"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-300 text-zinc-400 hover:border-yellow-400 hover:text-yellow-500 transition-colors"
                >
                    <FaLinkedinIn size={13} />
                </a>
                </div>

                {/* Member 2 */}
                <div className="border border-zinc-200 rounded-2xl p-7 text-center hover:border-yellow-400 transition-colors">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-5">
                    <span className="text-zinc-900 font-extrabold text-lg">LH</span>
                </div>
                <h3 className="font-bold text-base text-zinc-900">Layla Hassan</h3>
                <p className="text-yellow-500 text-xs font-semibold mt-1 mb-4">Chief Product Officer</p>
                <a
                    href="#"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-300 text-zinc-400 hover:border-yellow-400 hover:text-yellow-500 transition-colors"
                >
                    <FaLinkedinIn size={13} />
                </a>
                </div>

                {/* Member 3 */}
                <div className="border border-zinc-200 rounded-2xl p-7 text-center hover:border-yellow-400 transition-colors">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-5">
                    <span className="text-zinc-900 font-extrabold text-lg">DP</span>
                </div>
                <h3 className="font-bold text-base text-zinc-900">Dev Patel</h3>
                <p className="text-yellow-500 text-xs font-semibold mt-1 mb-4">Head of Engineering</p>
                <a
                    href="#"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-300 text-zinc-400 hover:border-yellow-400 hover:text-yellow-500 transition-colors"
                >
                    <FaLinkedinIn size={13} />
                </a>
                </div>

                {/* Member 4 */}
                <div className="border border-zinc-200 rounded-2xl p-7 text-center hover:border-yellow-400 transition-colors">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-5">
                    <span className="text-zinc-900 font-extrabold text-lg">CM</span>
                </div>
                <h3 className="font-bold text-base text-zinc-900">Chloe Morgan</h3>
                <p className="text-yellow-500 text-xs font-semibold mt-1 mb-4">Head of Operations</p>
                <a
                    href="#"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-300 text-zinc-400 hover:border-yellow-400 hover:text-yellow-500 transition-colors"
                >
                    <FaLinkedinIn size={13} />
                </a>
                </div>

            </div>
            </div>
        </section>

        </div>

        <Footer/>
    </div>
  );
}

export default AboutUs;