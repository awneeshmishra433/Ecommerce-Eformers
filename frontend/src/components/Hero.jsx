import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Simple reusable button component
const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base =
    "px-8 py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 shadow-md";
  const variants = {
    primary: "bg-green-700 hover:bg-green-800 text-white",
    outline: "border border-green-700 text-green-700 hover:bg-green-50",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col lg:flex-row items-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl shadow-md">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-300 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Subtle illustrated overlay (SVG) */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full h-64 fill-green-700"
        >
          <path
            fillOpacity="1"
            d="M0,192L40,165.3C80,139,160,85,240,80C320,75,400,117,480,154.7C560,192,640,224,720,224C800,224,880,192,960,160C1040,128,1120,96,1200,74.7C1280,53,1360,43,1400,37.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Left Side (Text) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-20 py-16 text-center lg:text-left"
      >
        <p className="text-green-700 font-semibold tracking-wider uppercase text-sm md:text-base">
          Sustainably Grown, Naturally Fresh
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Harvesting <span className="text-green-700">Nature’s Best</span>
          <br /> For Your Table
        </h1>

        <p className="mt-5 text-gray-600 text-sm md:text-base max-w-md mx-auto lg:mx-0">
          From seeds to harvest, we bring you fresh, organic, and high-quality
          farm products — directly from trusted farmers.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
          <Button variant="primary" onClick={() => navigate("/collection")}>
            Explore Products
          </Button>
          <Button variant="outline" onClick={() => navigate("/about")}>
            Learn More
          </Button>
        </div>

        <p className="mt-6 text-gray-500 text-xs md:text-sm">
          Trusted by 10,000+ farmers across the country 🌾
        </p>
      </motion.div>

      {/* Right Side (Image) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full lg:w-1/2 h-[380px] lg:h-[600px] overflow-hidden"
      >
        <img
          src={assets.hero_img}
          alt="Agriculture field with modern tractor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;