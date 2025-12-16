import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DetailsModal from "../../components/DetailsModal";

const GovernmentSchemes = () => {
  const [search, setSearch] = useState("");

  const schemes = [
    {
      id: 1,
      name: "PM-KISAN Samman Nidhi",
      category: "Direct Benefit Transfer",
      description: "Financial support of ₹6000 per year to small and marginal farmers",
      eligibility: "Small and marginal farmers with cultivable land up to 2 hectares",
      benefits: "₹2000 per installment, 3 times a year",
      documents: ["Aadhaar Card", "Bank Account Details", "Land Records"],
      deadline: "2024-12-31",
      status: "Active",
      applicationLink: "https://pmkisan.gov.in/RegistrationFormupdated.aspx",
      downloadLink: "https://patwariadda.com/wp-content/uploads/2024/07/PM-KISHAN-1.pdf",
      state: "All India",
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana",
      category: "Insurance",
      description: "Crop insurance scheme providing financial support to farmers in case of crop failure",
      eligibility: "All farmers growing notified crops in notified areas",
      benefits: "Up to ₹2 lakh per farmer per season",
      documents: ["Aadhaar Card", "Bank Account", "Land Records", "Sowing Certificate"],
      deadline: "2024-10-15",
      status: "Active",
      applicationLink: "https://pmfby.gov.in/selfRegistration",
      downloadLink: "https://pmfby.gov.in/pdf/New%20Schemes-english_.pdf",
      state: "All India",
    },
    {
      id: 7,
      name: "Agriculture Infrastructure Fund (AIF)",
      category: "Credit",
      description: "Financial support for setting up post-harvest management infrastructure and community farming assets",
      eligibility: "Farmers, FPOs, Agri-entrepreneurs, and Startups",
      benefits: "Loan up to ₹2 crore at 3% interest subsidy",
      documents: ["Aadhaar Card", "Business Plan", "detailed project report", "Land Documents", "Bank Statements", "Ownership Proof"],
      deadline: "2032-33",
      status: "Active",
      applicationLink: "https://agriinfra.dac.gov.in/",
      downloadLink: "https://agriinfra.dac.gov.in/Content/DocAttachment/FINALSchemeGuidelinesAIF.pdf",
      state: "All India",
    },
    {
      id: 8,
      name: "PM Rashtriya Krishi Vikas Yojna (PM-RKVY)",
      category: "Credit",
      description: "To make farming a remunerative economic activity through strengthening farmers efforts, risk mitigation and promoting agri-business entrepreneurship and sustainable agriculture",
      eligibility: "farmers and agri-entrepreneurs, organic farmers, FPOs, SHGs",
      benefits: "Financial assistance for various agriculture and allied activities",
      documents: ["Aadhaar Card", "Land Documents", "Project Report", "Bank Details"],
      deadline: "Not Specified",
      status: "Active",
      applicationLink: "https://rkvy.da.gov.in/",
      downloadLink: "https://agriwelfare.gov.in/sites/default/files/rkvy_inro.pdf",
      state: "All India",
    },
    {
      id: 3,
      name: "Kisan Credit Card",
      category: "Credit",
      description: "Credit facility for farmers to meet their agricultural and allied activities",
      eligibility: "All farmers including tenant farmers, oral lessees, and sharecroppers",
      benefits: "Credit limit up to ₹3 lakh at 4% interest rate",
      documents: ["Aadhaar Card", "PAN Card", "Land Documents", "Income Certificate"],
      deadline: "Ongoing",
      status: "Active",
      applicationLink: "https://fasalrin.gov.in/",
      downloadLink: "https://pmkisan.gov.in/documents/Kcc.pdf",
      state: "All India",
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      category: "Soil Management",
      description: "Provides soil health cards to farmers with recommendations for appropriate nutrients",
      eligibility: "All farmers",
      benefits: "Free soil testing and nutrient recommendations",
      documents: ["Aadhaar Card", "Land Records"],
      deadline: "Ongoing",
      status: "Active",
      applicationLink: "https://soilhealth.dac.gov.in/soilhealthcard",
      downloadLink: "https://informatics.nic.in/uploads/pdfs/1a479603_soilhealthcard.pdf",
      state: "All India",
    },
    {
      id: 5,
      name: "National Agriculture Market (e-NAM)",
      category: "Marketing",
      description: "Online trading platform for agricultural commodities",
      eligibility: "Farmers, traders, and buyers",
      benefits: "Better price discovery and transparent trading",
      documents: ["Aadhaar Card", "Bank Account", "Mobile Number"],
      deadline: "Ongoing",
      status: "Active",
      applicationLink: "https://enam.gov.in/web/Enam_ctrl/enam_registration",
      downloadLink: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/nov/doc2021112561.pdf",
      state: "All India",
    },
    {
      id: 6,
      name: "Punjab Crop Diversification Scheme",
      category: "State Scheme",
      description: "Incentive for farmers to shift from paddy to alternative crops",
      eligibility: "Farmers in Punjab growing paddy",
      benefits: "₹17,500 per hectare for crop diversification",
      documents: ["Land Records", "Aadhaar Card", "Bank Details"],
      deadline: "2024-11-30",
      status: "Active",
      applicationLink: "https://agri.punjab.gov.in/",
      downloadLink: "https://archive.aessweb.com/index.php/5005/article/view/1195/1728",
      state: "Punjab",
    },
  ];

  const filtered = schemes.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));

  const [selectedScheme, setSelectedScheme] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("schemeApplications") || "[]");
      setApplications(stored);
    } catch (e) {
      setApplications([]);
    }
  }, []);

  const openDetails = (scheme) => {
    setSelectedScheme(scheme);
    setModalOpen(true);
  };

  const closeDetails = () => {
    setSelectedScheme(null);
    setModalOpen(false);
  };

  const applyForScheme = (scheme) => {
    // add to local storage and state
    const newApp = {
      id: Date.now(),
      schemeName: scheme.name,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Submitted",
    };
    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem("schemeApplications", JSON.stringify(updated));
    closeDetails();
    // notify user
    try {
      const { toast } = require("react-toastify");
      toast.success("Application submitted");
    } catch (e) {
      // no-op if toast not available
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Government Schemes</h1>
            <p className="text-sm text-gray-600">View and apply for government agricultural schemes.</p>
          </div>
          <div className="flex items-center gap-3">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search schemes..." className="px-3 py-2 border rounded" />
            <Link to="/schemes" className="text-sm text-blue-600">Back</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((scheme) => (
            <div key={scheme.id} className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{scheme.name}</h2>
                  <p className="text-sm text-gray-600">{scheme.category} • {scheme.state}</p>
                </div>
                <div className="text-sm">
                  <span className={`px-2 py-1 rounded text-white ${scheme.status === 'Active' ? 'bg-green-600' : 'bg-gray-500'}`}>{scheme.status}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">{scheme.description}</p>
              <div className="mt-4 flex items-center gap-3">
                <button onClick={() => openDetails(scheme)} className="bg-orange-300 border px-3 py-2 rounded hover:bg-orange-400">View Details</button>
                <a href={scheme.applicationLink} target="_blank" rel="noreferrer" className="bg-green-600 text-white px-3 py-2 rounded">Open Application</a>
                {scheme.downloadLink && (
                  <a href={scheme.downloadLink} target="_blank" rel="noreferrer" className="px-3 py-2 border rounded">Download</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <DetailsModal open={modalOpen} onClose={closeDetails} scheme={selectedScheme} onApply={applyForScheme} />
    </div>
  );
};

export default GovernmentSchemes;
