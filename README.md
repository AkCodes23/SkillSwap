<h1 align="center">🔁 SkillSwap</h1>
<p align="center">
  <em>Exchange. Learn. Grow.</em><br/>
  <strong>A collaborative platform where knowledge becomes currency.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Built%20For-Hackathon-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Stack-Full%20Stack-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Prototype-brightgreen?style=for-the-badge" />
</p>

---

## 🌐 Live Preview

🔗 [**Live Site**](https://v0-skillswap-platform-git-main-qucryptofficial-5907s-projects.vercel.app/)  
🎥 [**Demo Video**](https://drive.google.com/file/d/1yQn8rCjz5BB8ivr1abN-mH3ngniP00ff/view?usp=drive_link)

---

## 🧠 What is SkillSwap?

**SkillSwap** is an innovative peer-to-peer platform where individuals **teach what they know** and **learn what they need** — all through **mutual skill exchange**.

Whether you're a designer learning code, a violinist teaching yoga, or a developer sharing startup advice — SkillSwap fosters **collaborative growth** through real-time interaction.

> _“Because everyone has something to teach — and something to learn.”_

---

## ✨ Core Features

### 👥 User Authentication & Profiles
- 🔐 Secure sign-up and login with Replit Auth or JWT.
- 📄 **Rich Profiles** including:
  - Name, email, bio, profile picture
  - Skills Offered (with levels: Beginner → Expert)
  - Skills Wanted
  - Availability
  - Rating & Reviews from past swaps
- 📝 Profile editing with dedicated dashboard

---

### 🔍 Discover & Browse Skills
- 🔎 Search by **skill**, **location**, or **name**
- 🏷️ Filter by skill tags or availability
- 📈 **Popular Skills** module to explore what’s trending
- 🧾 User cards: show ratings, bios, offered/wanted skills & availability

---

### 🔁 Dynamic Swap Request System
- ➕ Send swap requests with skill match + optional message
- 📬 View, accept, reject, or cancel swap requests
- 🔔 Real-time updates & request status feedback

---

### 💬 Integrated Messaging
- 📥 Conversation list with recent messages & unread counts
- 💬 Real-time chat after swap approval
- 🟢 Online status indicators
- 🧪 Supports live typing (text), future-ready for images/files

---

### 📚 Swap History & Learning Records
- 📋 Track all completed, in-progress, or canceled swaps
- ✅ See session counts and progress
- ⭐ Leave reviews and rate after swaps
- 🏅 Downloadable **Certificates of Completion**
- 🔎 Search/filter past swaps by partner, skill, or status

---

### 🔔 Smart Notifications
- 📍 Central notification center
- 🧠 Real-time updates for messages, swaps, reviews
- ✅ Mark as read, delete, or clear notifications easily

---

### 🕹️ Gamification & Engagement
- 🔥 Learning streak tracker
- ✨ XP and Leveling system
- 🏆 Unlock achievements like "First Exchange" or "Master Mentor"
- 🎁 Daily login bonuses
- 📊 Learning analytics: track skill hours & goals

---

### 🤖 AI-Powered SkillBot
- 💡 24/7 chatbot for onboarding, help, and troubleshooting
- 📘 Assists with swaps, profile setup, finding skills, and more

---

## 🛠 Tech Stack & Architecture

| Layer        | Tech Used                          |
|--------------|-------------------------------------|
| **Frontend** | **Next.js** (App Router), Tailwind CSS, shadcn/ui |
| **Backend**  | Node.js, Express.js                 |
| **Database** | Mock data (Demo) → PostgreSQL planned |
| **Auth**     | Replit Auth / JWT                   |
| **Real-Time**| WebSockets (Socket.io)              |
| **State**    | React Context API + Custom Hooks    |
| **Deployment**| Vercel (Frontend), Render (Backend) |

---

## 🧪 Demo Credentials

Feel free to log in and explore the full feature set!

### 👤 User 1: Alex Johnson
- 📧 `alex@skillswap.com`
- 🔑 `password123`

### 👤 User 2: Sarah Chen
- 📧 `sarah@skillswap.com`
- 🔑 `password123`

---

## 📁 Project Structure

skill-swap/

├── client/ # Next.js frontend

│ ├── components/ # UI components

│ └── app/ # App router pages

├── server/ # Express backend

│ ├── routes/ # API routes

│ └── logic/ # Controllers & logic

├── db/ # Mock database / schema

└── public/ # Static assets
