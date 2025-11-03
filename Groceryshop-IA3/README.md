# Online Grocery Store — Fullstack (React + Node + MongoDB)

This repository contains a minimal, opinionated scaffold for an Online Grocery / E-commerce app using:

- Frontend: React (Vite-style minimal setup)
- Backend: Node.js + Express
- Database: MongoDB (via Mongoose)

What's included
- backend/: Express API with auth (JWT), product and order models, and seed script
- frontend/: React app with product listing, product details, cart, and login page

Quick start (PowerShell)

1) Start MongoDB and pick a connection string. For a local MongoDB use: mongodb://localhost:27017/grocery

2) Backend
   cd "c:\Users\f_aja\OneDrive\Documents\IA3 WEB PROJECT\backend"
   npm install
   # create a .env file or copy .env.example and set MONGO_URI and JWT_SECRET
   npm run seed    # optional: creates sample products and admin user
   npm start

3) Frontend
   cd "c:\Users\f_aja\OneDrive\Documents\IA3 WEB PROJECT\frontend"
   npm install
   npm start

Notes
- This is a minimal scaffold meant for development and learning. Production hardening (validation, tests, rate limiting, input sanitization, CORS policy hardening) is not included.
