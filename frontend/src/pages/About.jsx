import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="About Image"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col gap-6 md:w-2/4 text-gray-600 leading-relaxed">
          <p>
            Efarmers was founded with a clear vision—to strengthen the agricultural
            ecosystem by making essential farming inputs easily accessible to
            farmers across the country. What began as a simple idea has evolved
            into a trusted digital platform where farmers and agri-enthusiasts
            can conveniently discover, compare, and purchase high-quality seeds,
            fertilizers, pesticides, and farm-fresh produce.
          </p>

          <p>
            Since our inception, we have remained committed to quality,
            transparency, and reliability. Our carefully curated product range
            includes hybrid seeds, organic fertilizers, crop protection
            solutions, and fresh vegetables—sourced directly from verified
            suppliers and trusted farms to meet modern agricultural demands.
          </p>

          <div>
            <strong className="text-gray-800 text-lg">Our Mission</strong>
            <p className="mt-2">
              Our mission at Efarmers is to empower farmers by providing access
              to quality products, dependable services, and expert agricultural
              support. We aim to deliver a seamless shopping experience—from
              product discovery to timely delivery—helping farmers grow better
              crops and build sustainable livelihoods.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-xl py-6 text-center">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-4">
        <div className="border rounded-xl p-8 flex flex-col gap-4 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
          <strong className="text-lg text-gray-800">Quality Assurance</strong>
          <p className="text-gray-600 leading-relaxed">
            Every product on Efarmers undergoes strict quality checks. From seeds
            to fertilizers, we ensure high standards of performance, safety, and
            reliability—so farmers can shop with confidence.
          </p>
        </div>

        <div className="border rounded-xl p-8 flex flex-col gap-4 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
          <strong className="text-lg text-gray-800">Farm-Fresh Produce</strong>
          <p className="text-gray-600 leading-relaxed">
            We source fresh produce directly from trusted farms, ensuring
            superior freshness, consistent quality, and efficient delivery—right
            from the farm to your doorstep.
          </p>
        </div>

        <div className="border rounded-xl p-8 flex flex-col gap-4 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
          <strong className="text-lg text-gray-800">Expert Support</strong>
          <p className="text-gray-600 leading-relaxed">
            Our team of agricultural experts is always available to guide you
            with product selection, usage advice, and best practices—because
            your success matters to us.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;