# 🌾 e-farmers

A full-stack MERN e-commerce platform that connects farmers directly with buyers — no middlemen involved. Alongside a standard shopping experience (seeds, fertilizers, pesticides, and fresh produce), e-farmers includes a dedicated **Government Schemes & Subsidies** section to help farmers discover and apply for the support they're entitled to.

The project is split into three independent apps that share one backend:

| App | Description |
|---|---|
| `frontend` | Customer-facing storefront — browsing, cart, checkout, schemes, auth |
| `admin` | Admin dashboard — product, inventory, and order management |
| `backend` | REST API — auth, products, cart, orders, and payments |

---

## 📸 Preview

**Home**
![Home page](screenshots/01-home.png)
<img width="1727" height="902" alt="Screenshot 2026-09-16 233925" src="https://github.com/user-attachments/assets/21c8d1b0-d635-46c6-8430-6850d023a35c" />


**Deals & Latest Collections**
![Deals and collections](screenshots/02-home-deals-collections.png)
<img width="1737" height="905" alt="Screenshot 2026-09-16 233946" src="https://github.com/user-attachments/assets/be463744-61e3-4815-b092-c67eb2bc43b6" />



**Product Catalog**
![Collection page](screenshots/04-collection.png)
<img width="1742" height="891" alt="Screenshot 2026-09-16 234028" src="https://github.com/user-attachments/assets/c0d38cd1-2497-4de7-833c-b10333b0f1ae" />


**Government Schemes**
![Government schemes page](screenshots/05-schemes.png)
<img width="1702" height="900" alt="Screenshot 2026-09-16 234044" src="https://github.com/user-attachments/assets/a03d86dd-1337-4542-b6df-46331b2b55ca" />


**About Us**
![About page](screenshots/06-about.png)
<img width="1807" height="887" alt="Screenshot 2026-09-16 234056" src="https://github.com/user-attachments/assets/3c0b4234-64b9-47f5-81c8-60c8b917e5ff" />


**Our Team**
![Team section](screenshots/07-team.png)
<img width="1777" height="888" alt="Screenshot 2026-09-16 234116" src="https://github.com/user-attachments/assets/ba4641d4-1d8b-4a74-8895-181c44496e9d" />


**Contact**
![Contact page](screenshots/08-contact.png)
<img width="1748" height="878" alt="Screenshot 2026-09-16 234131" src="https://github.com/user-attachments/assets/750867bd-39ec-4a12-bd36-d601bee8f282" />


**Footer**
![Footer](screenshots/03-footer.png)
<img width="1825" height="892" alt="Screenshot 2026-09-16 234008" src="https://github.com/user-attachments/assets/189d85b5-d6c4-443b-a9f6-de9460483cac" />


---

## ✨ Features

- **Direct farmer-to-buyer marketplace** — seeds, fertilizers & pesticides, and fresh produce (cereals, vegetables), listed without intermediaries
- **Government Schemes & Subsidies** — browse active schemes like PM-KISAN, Pradhan Mantri Fasal Bima Yojana, Agriculture Infrastructure Fund, and PM-RKVY, with details, applications, and downloadable info
- **JWT-based authentication** — separate token flows for regular users and admins, with password change/reset support
- **Product catalog** — category filters, search, ratings, and related product suggestions
- **Cart & checkout** — persistent per-user cart with add/update/fetch endpoints
- **Multiple payment options** — Cash on Delivery, Stripe, and Razorpay, with server-side order verification for both gateways
- **Admin dashboard** — add/remove products (with multi-image upload via Cloudinary), view and update order status across all customers
- **Discount codes & newsletter signup** on the storefront
- **Responsive UI** built with React, React Router, and Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend & Admin**
- React 18 + Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify (notifications)
- Framer Motion, Lucide React (frontend only)

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Multer + Cloudinary for image uploads/storage
- Stripe & Razorpay for payments
- Vitest + Supertest + mongodb-memory-server for testing

**Deployment**
- Configured for Vercel (`vercel.json` present in each app)

---

## 📁 Project Structure

```
Ecommerce-Eformers/
├── admin/                  # Admin dashboard (React + Vite)
│   └── src/
│       ├── components/
│       └── pages/          # Add, List, Orders
├── backend/                 # REST API (Node + Express)
│   ├── config/              # MongoDB & Cloudinary connections
│   ├── controllers/         # user, product, cart, order logic
│   ├── middleware/          # auth, adminAuth, multer
│   ├── models/               # user, product, order schemas
│   ├── routes/               # /api/user, /api/product, /api/cart, /api/order
│   └── tests/                # Vitest test suites
└── frontend/                 # Customer storefront (React + Vite)
    └── src/
        ├── components/       # Navbar, Hero, Footer, ProductsItem, etc.
        └── pages/             # Home, Collection, Product, Cart, Orders,
                                # Schemes, About, Contact, Login...
```

---

## 🔑 API Overview

All routes are prefixed with `/api`.

| Resource | Endpoint | Method | Access |
|---|---|---|---|
| User | `/user/register` | POST | Public |
| User | `/user/login` | POST | Public |
| User | `/user/admin` | POST | Public (admin credentials) |
| User | `/user/forgot` | POST | Public |
| Product | `/product/list` | GET | Public |
| Product | `/product/single` | POST | Public |
| Product | `/product/add` | POST | Admin |
| Product | `/product/remove` | POST | Admin |
| Cart | `/cart/add` | POST | Authenticated user |
| Cart | `/cart/update` | POST | Authenticated user |
| Cart | `/cart/get` | POST | Authenticated user |
| Order | `/order/place` | POST | Authenticated user (COD) |
| Order | `/order/stripe` | POST | Authenticated user |
| Order | `/order/razorpay` | POST | Authenticated user |
| Order | `/order/userorders` | POST | Authenticated user |
| Order | `/order/verifyStripe` | POST | Authenticated user |
| Order | `/order/verifyRazorpay` | POST | Authenticated user |
| Order | `/order/list` | POST | Admin |
| Order | `/order/status` | POST | Admin |

Authenticated requests pass the JWT in a `token` header (admin routes also accept `Authorization: Bearer <token>`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB database (local or Atlas)
- Cloudinary account (for product image storage)
- Stripe and/or Razorpay account (for online payments — optional if only using COD)

### 1. Clone the repository
```bash
git clone https://github.com/awneeshmishra433/Ecommerce-Eformers.git
cd Ecommerce-Eformers
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Run the API:
```bash
npm run server   # starts with nodemon (dev)
# or
npm start        # plain node
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Admin panel setup
```bash
cd ../admin
npm install
npm run dev
```

Each app runs on its own Vite dev server by default — check the terminal output for the local URL, and make sure the frontend/admin API base URLs point to your running backend (`http://localhost:4000` by default).

---

## 🧪 Testing

The backend includes a Vitest test suite (using an in-memory MongoDB instance, so no live database is needed):
```bash
cd backend
npm test
```

---

## 👥 Team

| Name | Role |
|---|---|
| Awneesh Mishra | Co-Founder |
| Atinsh Sharma | Marketing Head |
| Ansh | CTO |
| Anuj Kumar | Operations Manager |

---

## 📬 Contact

For queries, reach out at **e-farmers059@gmail.com**.

---

## 📄 License

No license has been specified for this project yet.
