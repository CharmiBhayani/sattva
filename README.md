🌿 Sattva - Hybrid Yoga & Wellness MERN Platform

Sattva is a full-stack MERN web application that connects yoga learners with professional tutors while also providing free, goal-based self-practice sessions generated from admin-curated yoga pose data.

It is designed as a freemium wellness platform with secure authentication, role-based dashboards, live class management, and a complete booking → payment → history flow.

🚀 Key Features
🔐 Authentication & Security

JWT-based authentication

Gmail OTP email verification during signup

Resend OTP with automatic redirect flow

Login blocked until email is verified

Role-based access control (User / Tutor / Admin)

Protected frontend and backend routes

🧘 Hybrid Learning Model (Free + Paid)
🆓 Free Self-Practice Mode

Admin-curated yoga poses with real goals
(e.g., flexibility, stress relief, back pain)

Users can generate goal-based yoga sessions for free

No payment required

Beginner-friendly and accessible

💼 Paid Guided Mode

Book live yoga classes with verified tutors

Structured instructor-led sessions

Booking + mock payment flow

Session history in My Bookings

➡️ Users can start free → progress to professional guidance when ready

👤 User Features

Signup with email OTP verification

Login with JWT authentication

Browse yoga poses

Generate free yoga sessions

View live classes

Book sessions

Mock payment integration

View My Bookings

Apply to become a tutor

Profile management

👩‍🏫 Tutor Features

Tutor dashboard

Create live classes

Manage own classes

View enrolled users

Conduct paid sessions

🛠 Admin Features

Admin dashboard overview

Add and manage yoga poses

Maintain goal-based pose data

Approve/reject tutor applications

Manage tutors

Platform analytics view

Admins act as wellness content curators, not just data managers.

💳 Payment Flow (Mock Implementation)

Session booking → paymentStatus = pending

Mock payment API → updates status to paid

Paid sessions appear in My Bookings

Razorpay payment gateway

🧩 Tech Stack
Frontend

React.js

React Router

Context API (Auth state management)

Tailwind CSS (Sattva design system)

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Nodemailer (Gmail OTP)

RESTful APIs

🔑 Authentication Flow

User signs up

OTP sent via Gmail

Email verification required

Login allowed only after verification

JWT issued and stored in localStorage

Role-based routing applied

🔒 Protected Routes

User authentication required for:

/sessions

/create

/profile

/apply-tutor

/my-bookings

Role-restricted routes:

Admin only

/admin/*

Tutor only

/tutor/*

🧪 Demo User Flow

Sign up → receive OTP via Gmail

Verify email

Login → JWT issued

Generate free yoga session OR book live class

Complete mock payment

View booking in My Bookings

Admin approves tutor → tutor creates live classes

🌟 Unique Value Proposition

Most yoga platforms only offer paid live classes.

Sattva provides a freemium wellness ecosystem:

Free personalized session generation from structured pose data

Paid professional live classes

Admin-curated content for quality and authenticity

Beginner-friendly entry point with scalable learning path

➡️ Sattva is both an educational tool and a tutor marketplace

🎨 UI Highlights

Calm, mindful Sattva design system

OTP verification screen with resend flow

Role-based dashboards

Fully responsive layouts

📈 Future Enhancements

Real-time live class streaming

Email notifications for bookings

AI-based session recommendations



Live At:
https://fabulous-pithivier-33d376.netlify.app/
Signup is under construction:: (sendMail is breaking the signup) 

👩‍💻 Author

Charmi
MERN Stack Developer
Focused on building secure, scalable, and user-centric wellness applications.
