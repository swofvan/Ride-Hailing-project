import Navbar from "./Navbar";
import Footer from "./footer";

import {
  FaCar, FaShieldAlt, FaBolt, FaMapMarkerAlt,
  FaUsers, FaStar, FaRoad, FaGlobe,
  FaCheckCircle, FaLinkedinIn, FaTwitter,
  FaInstagram, FaArrowRight, FaMobileAlt,
} from "react-icons/fa";

// ── Data ──────────────────────────────────────────────────────────

const stats = [
  { icon: FaUsers,        value: "2M+",  label: "Happy Riders"   },
  { icon: FaCar,          value: "50K+", label: "Active Drivers"  },
  { icon: FaRoad,         value: "10M+", label: "Trips Completed" },
  { icon: FaGlobe,        value: "30+",  label: "Cities Covered"  },
];

const values = [
  { icon: FaBolt,         title: "Speed",   desc: "Matched with your nearest driver in under 60 seconds, every time."         },
  { icon: FaShieldAlt,    title: "Safety",  desc: "Every driver is background-verified. Live tracking keeps you secure."       },
  { icon: FaStar,         title: "Quality", desc: "Our rating system ensures only top-rated drivers stay on the platform."     },
  { icon: FaMapMarkerAlt, title: "Reach",   desc: "From city centres to suburbs — Ryder goes wherever you need to go."        },
];

const team = [
  { name: "Marcus Reid",  role: "Founder & CEO",         initials: "MR" },
  { name: "Layla Hassan", role: "Chief Product Officer",  initials: "LH" },
  { name: "Dev Patel",    role: "Head of Engineering",    initials: "DP" },
  { name: "Chloe Morgan", role: "Head of Operations",     initials: "CM" },
];

const milestones = [
  { year: "2018", event: "Founded in a small garage with just 3 drivers and a big dream." },
  { year: "2019", event: "Launched in 5 cities. Crossed 100K rides in the first year."   },
  { year: "2021", event: "Raised Series A. Expanded to 15 cities across the country."    },
  { year: "2023", event: "Hit 1 million riders. Launched Ryder Pro for premium rides."   },
  { year: "2025", event: "30+ cities, 50,000+ verified drivers and still accelerating."  },
];

const trustPoints = [
  "Full driver background verification",
  "Live GPS tracking shared with loved ones",
  "24/7 customer support via chat and call",
];

// ── Reusable tiny components ──────────────────────────────────────

// Section label in yellow
function Label({ children }) {
  return (
    <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2">
      {children}
    </p>
  );
}

// ── Main component ────────────────────────────────────────────────

function AboutUs() {
  return (
    <div>
        <Navbar/>
        <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="bg-zinc-900 px-6 md:px-12 py-28 text-center">
            <span className="inline-block bg-yellow-400 text-zinc-900 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-widest mb-6">
            Who We Are
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Rides That <span className="text-yellow-400">Move</span> You
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Ryder started with one belief — getting from A to B should be safe,
            fast, and affordable for everyone. We are building the ride hailing
            platform that drivers and riders actually love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="bg-yellow-400 text-zinc-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors">
                Book a Ride
            </a>
            <a href="#" className="border border-zinc-600 text-white font-bold px-8 py-3 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-colors">
                Drive with Us
            </a>
            </div>
        </section>

        {/* ── STATS BAR ───────────────────────────────────────────── */}
        <section className="bg-yellow-400 py-10 px-6 md:px-12">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ icon: Icon, value, label }) => (
                <div key={label}>
                <div className="flex justify-center mb-2">
                    <Icon className="text-zinc-900" size={22} />
                </div>
                <p className="text-4xl font-extrabold text-zinc-900">{value}</p>
                <p className="text-zinc-700 text-sm font-semibold mt-1">{label}</p>
                </div>
            ))}
            </div>
        </section>

        {/* ── MISSION ─────────────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-14 items-center">

            {/* Photo */}
            <div className="w-full md:w-1/2">
                <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80"
                alt="Ryder driver"
                className="rounded-3xl w-full h-80 md:h-[420px] object-cover"
                />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2">
                <Label>Our Mission</Label>
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
                <ul className="space-y-3">
                {trustPoints.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-zinc-800 font-medium">
                    <FaCheckCircle className="text-yellow-400 shrink-0" size={16} />
                    {pt}
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </section>

        {/* ── VALUES ──────────────────────────────────────────────── */}
        <section className="bg-zinc-900 py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
            <Label>What Drives Us</Label>
            <h2 className="text-4xl font-extrabold text-white mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {values.map(({ icon: Icon, title, desc }) => (
                <div
                    key={title}
                    className="bg-zinc-800 border border-zinc-700 rounded-2xl p-7 hover:border-yellow-400 transition-colors group"
                >
                    <div className="bg-yellow-400 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="text-zinc-900" size={20} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* ── TIMELINE ────────────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
            <Label>Since 2018</Label>
            <h2 className="text-4xl font-extrabold mb-14">How We Got Here</h2>
            <div className="relative border-l-2 border-yellow-400 pl-10 space-y-10">
                {milestones.map(({ year, event }) => (
                <div key={year} className="relative">
                    {/* Dot */}
                    <span className="absolute -left-[45px] top-1.5 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white" />
                    <span className="text-yellow-500 font-extrabold text-sm">{year}</span>
                    <p className="text-zinc-500 mt-1 leading-relaxed">{event}</p>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* ── TEAM ────────────────────────────────────────────────── */}
        <section className="bg-zinc-900 py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
            <Label>The People</Label>
            <h2 className="text-4xl font-extrabold text-white mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {team.map(({ name, role, initials }) => (
                <div
                    key={name}
                    className="bg-zinc-800 border border-zinc-700 rounded-2xl p-7 text-center hover:border-yellow-400 transition-colors"
                >
                    {/* Avatar circle */}
                    <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-5">
                    <span className="text-zinc-900 font-extrabold text-lg">{initials}</span>
                    </div>
                    <h3 className="text-white font-bold text-base">{name}</h3>
                    <p className="text-yellow-400 text-xs font-semibold mt-1 mb-4">{role}</p>
                    <a
                    href="#"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-600 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                    >
                    <FaLinkedinIn size={13} />
                    </a>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* ── APP CTA ─────────────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
            <div className="bg-zinc-900 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
                <Label>Download the App</Label>
                <h2 className="text-4xl font-extrabold text-white mb-4">
                Your ride is<br />one tap away.
                </h2>
                <p className="text-zinc-400 max-w-sm leading-relaxed">
                Get your first ride completely free. Available on iOS and Android.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <a
                href="#"
                className="flex items-center gap-3 bg-yellow-400 text-zinc-900 font-bold px-6 py-4 rounded-2xl hover:bg-yellow-300 transition-colors"
                >
                <FaMobileAlt size={18} />
                <span>Download App</span>
                </a>
                <a
                href="#"
                className="flex items-center gap-3 border border-zinc-600 text-white font-bold px-6 py-4 rounded-2xl hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                >
                <FaCar size={18} />
                <span>Become a Driver</span>
                </a>
            </div>
            </div>
        </section>
        </div>

        <Footer/>
    </div>
  );
}

export default AboutUs;