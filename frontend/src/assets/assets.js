import p_img1 from './p_image1.jpg'
import p_img2_1 from './p_img2.jpg'
// import p_img2_2 from './p_img2_2.png'
// import p_img2_3 from './p_img2_3.png'
// import p_img2_4 from './p_img2_4.png'
import p_img3 from './p_img3.jpeg'
import p_img4 from './p_img4.webp'
import p_img5 from './pimg5.jpeg'
import p_img6 from './Urea.jpeg'
import p_img7 from './potassium.avif'
import p_img8 from './plantLeavesOrgFert.jpeg'
import p_img9 from './pimg9.jpeg'
import p_img10 from './pimg10.jpg'
import p_img11 from './WhiteBananaDesPow.webp'
import p_img12 from './dungManure.jpg'
import p_img13 from './pimg13.webp'
import p_img14 from './pimg14.webp'
import p_img15 from './pimg15.webp'
import p_img16 from './pimg16.jpg'
import p_img17 from './pimg17.webp'
import p_img18 from './pimg18.jpg'
import p_img19 from './pimg19.jpg'
import p_img20 from './pimg20.webp'
import p_img21 from './pimg21.jpg'
import p_img22 from './pimg22.jpg'
import p_img23 from './pimg23.jpeg'
import p_img24 from './pimg24.webp'
import p_img25 from './pimg25.jpg'
import p_img26 from './pimg26.webp'
import p_img27 from './pimg27.jpg'
import p_img28 from './pimg28.webp'
import p_img29 from './pimg29.webp'
import p_img30 from './pimg30.jpg'
import p_img31 from './pimg31.jpg'
import p_img32 from './pimg32.webp'
import p_img33 from './pimg33.jpg'
import p_img34 from './pimg34.webp'
import p_img35 from './pimg35.webp'
import p_img36 from './pimg36.png'
import p_img37 from './pimg37.jpg'
import p_img38 from './pimg38.webp'
// import p_img39 from './p_img39.png'
// import p_img40 from './p_img40.png'
// import p_img41 from './p_img41.png'
import p_img42 from './pimg42.jpg'
import p_img43 from './pimg43.jpg'
import p_img44 from './pimg44.jpg'
// import p_img45 from './p_img45.png'
// import p_img46 from './p_img46.png'
// import p_img47 from './p_img47.png'
// import p_img48 from './p_img48.png'
// import p_img49 from './p_img49.png'
import p_img50 from './pimg50.jpeg'
import p_img51 from './pimg51.jpg'
import p_img52 from './pimg52.jpg'


import logo from './logo.png'
import hero_img from './1.png'
import cart_icon from './cart_icon copy.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './s4.jpg'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'


export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

export const products = [
    {
        _id: "aaaaa",
        name: "Grover Rice Hybrid seeds",
        description: "High-yield hybrid paddy seeds engineered for uniform tillering and strong disease resistance. Suitable for diverse climates with excellent grain quality.",
        price: 1050,
        image: [p_img1],
        category: "Seeds",//seeds
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "aaaab",
        name: "Super humic agro fill",
        description: "Concentrated humic and fulvic acid formulation that improves soil structure, nutrient uptake, and root growth for healthier, more productive crops.",
        price: 1200,
        image: [p_img2_1],//,p_img2_2,p_img2_3,p_img2_4],
        category: "fertilizers and pesticides",//fertilizers and pesticides
        //subCategory: "Topwear",
        sizes: ["10L", "20L", "30L"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaac",
        name: "Fresh Potatos",
        description: "Farm-fresh potatoes with firm texture and earthy flavor, ideal for boiling, frying, or roasting.",
        price: 420,
        image: [p_img3],
        category: "Cereal and Vegies",//cereal and vegies
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716234545448,
        bestseller: true
    },
    {
        _id: "aaaad",
        name: "Urea Fertilizer",
        description: "46% nitrogen prill for rapid vegetative growth. Quick-release formula to correct nitrogen deficiency.",
        price: 380,
        image: [p_img6],
        category: "fertilizers and pesticides",
        //subCategory: "Topwear",
        sizes: ["50kg"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaae",
        name: "Partec maze Hybrid seeds",
        description: "Vigorous hybrid maize seeds delivering uniform cobs and strong standability for reliable, high-volume yields.",
        price: 700,
        image: [p_img5],
        category: "Seeds",
        //subCategory: "Topwear",
        sizes: ["5kg", "10kg", "20kg"],
        date: 1716622345448,
        bestseller: true
    },
    {
        _id: "aaaaf",
        name: "Fresh Tomatos",
        description: "Vine-ripened tomatoes with bright color and balanced acidity, perfect for salads, sauces, and cooking.",
        price: 700,
        image: [p_img4],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716623423448,
        bestseller: true
    },
    {
        _id: "aaaag",
        name: "Potassium Fertilizer",
        description: "Potash-rich formulation to improve flowering, fruit set, and disease tolerance, enhancing overall crop quality.",
        price: 450,
        image: [p_img7],
        category: "fertilizers and pesticides",
        //subCategory: "Bottomwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716621542448,
        bestseller: false
    },
    {
        _id: "aaaah",
        name: "Plant Leaves Organic Fertilizer",
        description: "All-natural leaf-based fertilizer that boosts microbial activity and soil health for sustainable, balanced growth.",
        price: 1500,
        image: [p_img8],
        category: "fertilizers and pesticides",
        //subCategory: "Topwear",
        sizes: ["100kg", "200kg", "500kg"],
        date: 1716622345448,
        bestseller: false
    },
    {
        _id: "aaaai",
        name: "Rice",
        description: "Premium-quality rice grains offering consistent texture and aroma, suitable for daily cooking.",
        price: 770,
        image: [p_img9],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716621235448,
        bestseller: false
    },
    {
        _id: "aaaaj",
        name: "AAkrosh pesticide (for all type of larvae)",
        description: "Broad-spectrum larvicide for effective control of common larval stages across crops while maintaining crop safety.",
        price: 750,
        image: [p_img10],
        category: "fertilizers and pesticides",
        //subCategory: "Bottomwear",
        sizes: ["5L", "10L", "20L"],
        date: 1716622235448,
        bestseller: false
    },
    {
        _id: "aaaak",
        name: "Magic grow Banana Desiccated Powder",
        description: "Banana-derived bio-stimulant powder that enhances flowering, fruiting, and plant vigor.",
        price: 600,
        image: [p_img11],
        category: "fertilizers and pesticides",
        //subCategory: "Topwear",
        sizes: ["10kg", "15kg", "25kg"],
        date: 1716623345448,
        bestseller: false
    },
    {
        _id: "aaaal",
        name: "Dung Magic Organic Fertilizer",
        description: "Nutrient-dense, composted manure improving soil fertility, moisture retention, and long-term productivity.",
        price: 1200,
        image: [p_img12],
        category: "fertilizers and pesticides",
        //subCategory: "Topwear",
        sizes: ["100kg", "200kg", "500kg"],
        date: 1716624445448,
        bestseller: false
    },
    {
        _id: "aaaam",
        name: "Green View Baasmati Rice Paddy Seeds",
        description: "Elite basmati paddy seeds known for aroma, long-grain quality, and dependable yields.",
        price: 1800,
        image: [p_img13],
        category: "Seeds",
        //subCategory: "Topwear",
        sizes: ["30kg", "50kg", "100kg"],
        date: 1716625545448,
        bestseller: false
    },
    {
        _id: "aaaan",
        name: "Wheat",
        description: "Clean, graded wheat kernels ideal for flour milling and everyday culinary use.",
        price: 875,
        image: [p_img14],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716626645448,
        bestseller: false
    },
    {
        _id: "aaaao",
        name: "Surya Gold zinc",
        description: "Zinc-enriched micronutrient to prevent deficiency, improving leaf health, tillering, and yield.",
        price: 1100,
        image: [p_img15],
        category: "fertilizers and pesticides",
        //subCategory: "Bottomwear",
        sizes: ["10kg", "20kg", "30kg"],
        date: 1716627745448,
        bestseller: false
    },
    {
        _id: "aaaap",
        name: "Traditional Baasmati rice",
        description: "Classic basmati rice with long, slender grains and signature fragrance for premium meals.",
        price: 1650,
        image: [p_img16],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["30kg", "50kg", "100kg"],
        date: 1716628845448,
        bestseller: false
    },
    {
        _id: "aaaaq",
        name: "Elixir 3x Super phosphate fertilizer",
        description: "High-availability phosphorus source that strengthens roots, improves flowering, and accelerates early growth.",
        price: 500,
        image: [p_img17],
        category: "fertilizers and pesticides",
        //subCategory: "Bottomwear",
        sizes: ["50kg", "100kg"],
        date: 1716629945448,
        bestseller: false
    },
    {
        _id: "aaaar",
        name: "Fresh Carrots",
        description: "Crisp, sweet carrots harvested fresh—great for snacking, juicing, and cooking.",
        price: 1050,
        image: [p_img18],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716631045448,
        bestseller: false
    },
    {
        _id: "aaaas",
        name: "Fresh Onions",
        description: "Firm, flavorful onions with versatile culinary use and reliable shelf life.",
        price: 630,
        image: [p_img19],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716632145448,
        bestseller: false
    },
    {
        _id: "aaaat",
        name: " Fame Wheat Hybrid seeds",
        description: "High-performing hybrid wheat seeds engineered for disease tolerance and consistent test weights.",
        price: 1120,
        image: [p_img20],
        category: "Seeds",
        //subCategory: "Bottomwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716633245448,
        bestseller: false
    },
    {
        _id: "aaaau",
        name: "Edible Radish and Carrot combo pack seeds",
        description: "Curated pack of radish and carrot seeds for kitchen gardens; quick germination and uniform roots.",
        price: 1200,
        image: [p_img21],
        category: "Seeds",
        //subCategory: "Winterwear",
        sizes: ["5kg", "10kg", "15kg"],
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "aaaav",
        name: "BioLand Coriander and Spinach combo pack seeds",
        description: "Dual-pack of coriander and spinach seeds for leafy harvests with fast growth and rich flavor.",
        price: 1500,
        image: [p_img22],
        category: "Seeds",
        //subCategory: "Bottomwear",
        sizes: ["5kg", "10kg", "15kg"],
        date: 1716635445448,
        bestseller: false
    },
    {
        _id: "aaaaw",
        name: "Corn",
        description: "Sweet, golden kernels offering excellent taste and texture for boiling, grilling, or processing.",
        price: 1050,
        image: [p_img23],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716636545448,
        bestseller: false
    },
    {
        _id: "aaaax",
        name: "Fresh Mustard Greens",
        description: "Peppery, nutrient-rich leaves perfect for sautés, pickles, and traditional dishes.",
        price: 2450,
        image: [p_img24],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716637645448,
        bestseller: false
    },
    {
        _id: "aaaay",
        name: "Fresh peas",
        description: "Tender green peas with natural sweetness; ideal for stir-fries, curries, and soups.",
        price: 875,
        image: [p_img25],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716638745448,
        bestseller: false
    },
    {
        _id: "aaaaz",
        name: "Organic Bazar White Onion seeds",
        description: "Quality seed stock for white onions with mild flavor and uniform bulb development.",
        price: 1500,
        image: [p_img26],
        category: "Seeds",
        //subCategory: "Winterwear",
        sizes: ["5kg", "10kg", "15kg"],
        date: 1716639845448,
        bestseller: false
    },
    {
        _id: "aaaba",
        name: "Dhaniya Whole (Coriander)",
        description: "Whole coriander seeds with warm, citrusy aroma; ideal for tempering and spice blends.",
        price: 1200,
        image: [p_img27],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["10kg", "20kg", "30kg"],
        date: 1716640945448,
        bestseller: false
    },
    {
        _id: "aaabb",
        name: "Glycel Non selective herbical",
        description: "Systemic, non-selective herbicide for broad-spectrum weed control with fast visible action.",
        price: 1100,
        image: [p_img28],
        category: "fertilizers and pesticides",
        //subCategory: "Winterwear",
        sizes: ["5L", "10L", "15L"],
        date: 1716642045448,
        bestseller: false
    },
    {
        _id: "aaabc",
        name: "Molsis Sunflower seeds",
        description: "High-oil sunflower variety bred for uniform heads and robust field performance.",
        price: 900,
        image: [p_img29],
        category: "Seeds",
        //subCategory: "Topwear",
        sizes: ["5kg", "10kg", "20kg"],
        date: 1716643145448,
        bestseller: false
    },
    {
        _id: "aaabd",
        name: "Fresh Aamla fruit",
        description: "Vitamin C–rich Indian gooseberries with tart flavor; great for pickles, juices, and wellness recipes.",
        price: 990,
        image: [p_img30],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["45kg", "50kg", "100kg"],
        date: 1716644245448,
        bestseller: false
    },
    {
        _id: "aaabe",
        name: "Ferti-lome pesticide (for all type of insects)",
        description: "Multi-insect control formulation offering quick knockdown and residual protection across crops.",
        price: 900,
        image: [p_img31],
        category: "fertilizers and pesticides",
        //subCategory: "Topwear",
        sizes: ["5L", "10L", "20L"],
        date: 1716645345448,
        bestseller: false
    },
    {
        _id: "aaabf",
        name: "Bee-safe organocide (for all type of plants)",
        description: "Eco-friendly oil-based insecticide/miticide safe for bees when used as directed; suitable for all ornamentals and edibles.",
        price: 950,
        image: [p_img32],
        category: "fertilizers and pesticides",
        //subCategory: "Topwear",
        sizes: ["5L","10L", "15L"],
        date: 1716646445448,
        bestseller: false
    },
    {
        _id: "aaabg",
        name: "Urad daal whole (black)",
        description: "Premium whole black gram with rich protein content and creamy texture after cooking.",
        price: 1200,
        image: [p_img33],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["20kg", "50kg", "100kg"],
        date: 1716647545448,
        bestseller: false
    },
    {
        _id: "aaabh",
        name: "Grow-time tomato,capsicum and brinjal combo pack seeds",
        description: "Balanced combo pack for tomatoes, capsicum, and brinjal with high germination and home-garden convenience.",
        price: 1140,
        image: [p_img34],
        category: "Seeds",
        //subCategory: "Topwear",
        sizes: ["6kg", "12kg", "18kg"],
        date: 1716648645448,
        bestseller: false
    },
    {
        _id: "aaabi",
        name: "SJD green pea seeds",
        description: "Vigorous pea seeds producing uniform pods with sweet, tender peas.",
        price: 1000,
        image: [p_img35],
        category: "Seeds",
        //subCategory: "Winterwear",
        sizes: ["10kg", "20kg", "30kg"],
        date: 1716649745448,
        bestseller: false
    },
    {
        _id: "aaabj",
        name: "ShriRam super 303 wheat seeds",
        description: "Trusted wheat variety with strong tillering, stable yield, and good grain quality.",
        price: 1120,
        image: [p_img36],
        category: "Seeds",
        //subCategory: "Winterwear",
        sizes: ["35kg", "50kg", "100kg"],
        date: 1716650845448,
        bestseller: false
    },
    {
        _id: "aaabk",
        name: "Arhar seeds (Shankar-seeds)",
        description: "High-vigor pigeon pea seeds with reliable pod set and good drought tolerance.",
        price: 1500,
        image: [p_img37],
        category: "Seeds",
        //subCategory: "Topwear",
        sizes: ["10kg", "20kg", "30kg"],
        date: 1716651945448,
        bestseller: false
    },
    {
        _id: "aaabl",
        name: "Coragen",
        description: "Advanced insect control technology targeting lepidopteran pests with long-lasting protection and favorable safety profile.",
        price: 990,
        image: [p_img38],
        category: "fertilizers and pesticides",
        //subCategory: "Topwear",
        sizes: ["10L", "15L", "20L"],
        date: 1716653045448,
        bestseller: false
    },
    // {
    //     _id: "aaabm",
    //     name: "Men Printed Plain Cotton Shirt",
    //     description: ".",
    //     price: 260,
    //     image: [p_img39],
    //     category: "fertilizers and pesticides",
    //     //subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716654145448,
    //     bestseller: false
    // },
    // {
    //     _id: "aaabn",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: ".",
    //     price: 290,
    //     image: [p_img40],
    //     category: "fertilizers and pesticides",
    //     //subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716655245448,
    //     bestseller: false
    // },
    // {
    //     _id: "aaabo",
    //     name: "Men Round Neck Pure Cotton T-shirt",
    //     description: ".",
    //     price: 270,
    //     image: [p_img41],
    //     category: "fertilizers and pesticides",
    //     //subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716656345448,
    //     bestseller: false
    // },
    {
        _id: "aaabp",
        name: "Brown Chana whole",
        description: "Whole brown chickpeas with nutty flavor—ideal for curries, salads, and snacks.",
        price: 1250,
        image: [p_img42],
        category: "Cereal and Vegies",
        //subCategory: "Topwear",
        sizes: ["25", "50", "100"],
        date: 1716657445448,
        bestseller: false
    },
    {
        _id: "aaabq",
        name: "Fresh Cabbage and CauliFlower",
        description: "Fresh, compact heads of cabbage and cauliflower; crisp texture and clean flavor.",
        price: 450,
        image: [p_img43],
        category: "Cereal and Vegies",
        //subCategory: "Bottomwear",
        sizes: ["5kg", "10kg", "15kg"],
        date: 1716658545448,
        bestseller: false
    },
    {
        _id: "aaabr",
        name: "Daftari-21 Chana seeds",
        description: "High-germination chickpea seed line bred for uniform stands and consistent yields.",
        price: 700,
        image: [p_img44],
        category: "Seeds",
        //subCategory: "Winterwear",
        sizes: ["10kg", "20kg", "30kg"],
        date: 1716659645448,
        bestseller: false
    },
    // {
    //     _id: "aaabs",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: ".",
    //     price: 290,
    //     image: [p_img45],
    //     category: "fertilizers and pesticides",
    //     //subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716660745448,
    //     bestseller: false
    // },
    // {
    //     _id: "aaabt",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: ".",
    //     price: 320,
    //     image: [p_img46],
    //     category: "fertilizers and pesticides",
    //     //subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716661845448,
    //     bestseller: false
    // },
    // {
    //     _id: "aaabu",
    //     name: "Kid Tapered Slim Fit Trouser",
    //     description: ".",
    //     price: 300,
    //     image: [p_img47],
    //     category: "Cereal and Vegies",
    //     //subCategory: "Bottomwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716662945448,
    //     bestseller: false
    // },
    // {
    //     _id: "aaabv",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: ".",
    //     price: 330,
    //     image: [p_img48],
    //     category: "fertilizers and pesticides",
    //     //subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716664045448,
    //     bestseller: false
    // },
    // {
    //     _id: "aaabw",
    //     name: "Kid Tapered Slim Fit Trouser",
    //     description: ".",
    //     price: 310,
    //     image: [p_img49],
    //     category: "Cereal and Vegies",
    //     //subCategory: "Bottomwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716665145448,
    //     bestseller: false
    // },
    {
        _id: "aaabx",
        name: "Fresh Sweet potatos",
        description: "Naturally sweet tubers with moist texture—great for baking, fries, and curries.",
        price: 1000,
        image: [p_img50],
        category: "Cereal and Vegies",
        //subCategory: "Bottomwear",
        sizes: ["25kg", "35kg", "60kg", "100kg"],
        date: 1716666245448, bestseller: false
    },
    {
        _id: "aaaby",
        name: "The INDIAN Beej 8 Green vegetables seeds combo pack",
        description: "Eight-vegetable seed assortment for continuous kitchen-garden harvests; selected for taste and reliability.",
        price: 8*180,
        image: [p_img51],
        category: "Seeds",
        //subCategory: "Winterwear",
        sizes: ["8kg", "16kg", "24kg"],
        date: 1716667345448,
        bestseller: false
    },
    {
        _id: "aaabz",
        name: "Cane Grow Fertilizer ",
        description: "Specialized nutrient blend formulated to enhance tillering, internode length, and sucrose accumulation in sugarcane.",
        price: 1200,
        image: [p_img52],
        category: "fertilizers and pesticides",
        //subCategory: "Winterwear",
        sizes: ["7.5L", "10L", "15L",],
        date: 1716668445448,
        bestseller: false
    }

]

// Attach a computed price-per-first-size value to each product.
// We parse the numeric part of the first size (e.g. "35kg" -> 35) and
// compute pricePerKg = price / numericValue (rounded to 2 decimals).
// Also add a label to describe the unit (kg, L, or unit) so the UI can show
// a meaningful message (e.g. "₹30 / kg").
products.forEach((p) => {
    const firstSize = p.sizes && p.sizes[0] ? String(p.sizes[0]) : null;
    const numMatch = firstSize ? firstSize.match(/[0-9]+(?:\.[0-9]+)?/) : null;
    const numeric = numMatch ? parseFloat(numMatch[0]) : null;
    // Determine unit label: prefer 'kg' if present or no alphabetic unit is present
    let unitLabel = 'unit';
    if (firstSize) {
        if (/kg/i.test(firstSize) || /^[0-9]+(?:\.[0-9]+)?$/.test(firstSize)) {
            unitLabel = 'kg';
        } else if (/l/i.test(firstSize)) {
            unitLabel = 'L';
        }
    }
    p.pricePerKg = (numeric && numeric !== 0) ? Number((p.price / numeric).toFixed(2)) : null;
    p.pricePerUnitLabel = unitLabel;
});