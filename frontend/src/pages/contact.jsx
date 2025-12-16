import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import partner1 from "../assets/awneesh.jpeg";
import partner2 from "../assets/atinsh.png";
import partner3 from "../assets/partner3.jpeg";
import partner4 from "../assets/partner4.jpeg";
const partners = [
  {
    name: "Awneesh Mishra",
    role: "Co-Founder",
    mobile: "+91 6394577225",
    email: "awneeshmishra433@gmail.com",
    img: partner1, // Add partner image in assets
  },
  {
    name: "Atinsh Sharma",
    role: "Marketing Head",
    mobile: "+91 91408 82631",
    email: "atinshsharma123@gmail.com",
    img: partner2,
  },
  {
    name: "Ansh",
    role: "CTO",
    mobile: "+91 78180 71161",
    email: "Ansh123@gmail.com",
    img: partner3,
  },
  {
    name: "Anuj Kumar",
    role: "Operations Manager",
    mobile: "+91 89572 73608",
    email: "anujkumar123@gmail.com",
    img: partner4,
  },
];

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt="Contact Image"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Office</p>
          <p className="text-gray-500">
            Knowledge Park2, Greater Noida <br />
            Gautam Buddha Nagar,Uttar Pradesh-201310
          </p>
          <p className="text-gray-500">
            Tel: +91 1800012120 <br /> Email: e-farmers059@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Efarmers
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job opening.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Partners Section */}
      <div className="my-16">
        <p className="text-center font-bold text-2xl mb-10">Our Partners</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={partner.img}
                alt={partner.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <p className="font-semibold text-lg">{partner.name}</p>
              <p className="text-gray-500 mb-2">{partner.role}</p>
              <p className="text-gray-600 text-sm">{partner.mobile}</p>
              <p className="text-gray-600 text-sm">{partner.email}</p>
            </div>
          ))}
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;