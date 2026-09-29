PLanIt - Aplikasi Pemesanan Venue & Event Organizer

PlanIt adalah platform booking venue dan event organizer yang memudahkan pengguna mencari, membandingkan, dan memesan venue serta EO untuk berbagai acara secara aman dalam satu platform.

Tech Stack

Frontend :

React + Typescript + Vite
Tailwind CSS
React Router DOM
Axios
Backend :

NestJS
TypeORM
JWT Authentication
Passport.js (Google OAuth)
bcrypt
Database :

MySQL (XAMPP)
Fitur

Login & Register (Email + Google OAuth)
Browse Venue & Event Organizer
Filter & Sorting (kategori, lokasi, harga, rating)
Detail page dengan paket & ulasan
Booking System
Rating & Review System
Riwayat & Status booking
Profile Management
Chat
Setup Instalasi

Backend :

cd planit-backend
npm install (install node modules)
cp .env.example .env
isi .env dengan credential
npm run start:dev
Frontend :

cd planit-frontend
npm install
npm run dev
Setup Database

Buat database 'planit_db' di phpMyAdmin
Jalankan backend - tabel otomatis terbuat
Seed data via Thunder Client atau Postman
POST http://localhost:3000/venues/seed
POST http://localhost:3000/organizers/seed
file .env di folder planit-backend DB_HOST=localhost DB_PORT=3306 DB_USERNAME=root DB_PASSWORD= DB_NAME=planit_db

JWT_SECRET=your_jwt_secret JWT_EXPIRES_IN=7d
