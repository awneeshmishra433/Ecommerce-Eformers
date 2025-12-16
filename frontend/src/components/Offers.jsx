import { motion } from "framer-motion";
import { Tag, Copy, Percent } from "lucide-react";

// Centralized promo codes (can later come from context or API)
const promoCodes = [
  {
    code: "WELCOME10",
    discount: "10% OFF",
    description: "On your first purchase",
  },
  {
    code: "SAVE20",
    discount: "20% OFF",
    description: "Minimum order ₹999",
  },
  {
    code: "SPECIAL25",
    discount: "25% OFF",
    description: "Limited time offer",
  },
];

const Offers = () => {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <section className="py-16 px-6 lg:px-20 bg-white">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Exclusive Offers & Coupons
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Save more on your fresh farm purchases with our special promo codes
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promoCodes.map((promo, index) => (
          <motion.div
            key={promo.code}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            {/* Badge */}
            <div className="absolute -top-3 -right-3 bg-green-700 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Percent size={14} />
              DEAL
            </div>

            {/* Content */}
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 text-green-700 p-3 rounded-full">
                <Tag size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {promo.discount}
                </h3>
                <p className="text-sm text-gray-600">{promo.description}</p>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="flex items-center justify-between bg-green-50 border border-dashed border-green-400 rounded-xl px-4 py-3">
              <span className="font-mono text-green-800 font-semibold">
                {promo.code}
              </span>
              <button
                onClick={() => copyCode(promo.code)}
                className="flex items-center gap-1 text-sm text-green-700 hover:text-green-900"
              >
                <Copy size={16} />
                Copy
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Offers;