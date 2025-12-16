import React from "react";

const subsidies = [
  {
    title: "Wheat Subsidy",
    description:
      "Government provides subsidy on seeds and fertilizers for wheat cultivation to support farmers and ensure food security.",
    amount: "₹10 per kg",
    link: "https://dfpd.gov.in/msp-for-wheat-and-rice/en",
  },
  {
    title: "Rice Subsidy",
    description:
      "Support for paddy farmers with subsidized fertilizers, irrigation facilities and crop insurance.",
    amount: "₹10 per kg",
    link: "https://dfpd.gov.in/msp-for-wheat-and-rice/en",
  },
  {
    title: "Vegetables & Fruits Subsidy",
    description:
      "Farmers growing seasonal vegetables get subsidies for organic fertilizers and improved seed varieties.",
    amount: "25% to 40% of cost subsidy",
    link: "https://www.mofpi.gov.in/en/Schemes/operation-greens-scheme",
  },
  {
    title: "Fertilizer Subsidy",
    description:
      "Government provides urea and other fertilizers at subsidized rates to reduce input cost for farmers.",
    amount: "50% to 100% subsidy(under DBT)",
    link: "https://fert.gov.in/department/our-wings/fertilizer-subsidy",
  },
  {
    title: "Pesticides & Medicine Subsidy",
    description:
      "Subsidies for disease control medicines and pesticides to protect crops from major pest attacks.",
    amount: "25% to 50% of cost subsidy",
    link: "https://yuvakanaja.in/horticulture-dept/subsidy-to-farmers-for-purchase-of-plant-protection-drugs-for-disease-and-pest-control-of-horticulture-crops/",
  },
  {
    title: "Organic Farming Subsidy",
    description:
      "Subsidies for farmers adopting organic farming practices including organic seeds, bio-fertilizers, composts and organic fertilizers.",
    amount: "33% to 66% subsidy by various schemes",
    link: "https://agriculturepost.com/farm-inputs/5-govt-schemes-promoting-organic-farming-in-india/",
  },
];

const SubsidyDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Subsidy Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsidies.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded shadow border">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{s.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">{s.amount}</span>
                <a href={s.link} target="_blank" rel="noreferrer" className="bg-orange-300 text-Black px-4 py-2 rounded hover:bg-orange-400">See Details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubsidyDetails;
