# Track It - Issue Tracking System

Track It is a **full-stack issue tracking application** designed to help teams efficiently manage software development issues. With a focus on **performance, scalability, and SEO**, Track It provides a seamless experience for tracking, assigning, and resolving issues. 

<!-- ## 🚀 Live Demo
[Live Demo Link](#) (Replace with deployed link) -->

## 🎯 Features
- **Issue Management:** Create, edit, and delete issues.
- **Assignment System:** Assign issues to logged-in users.
- **Status Tracking:** Assigned users can update issue status (e.g., Open, In Progress, Resolved).
- **Full-Stack SEO:** Implemented **server-side and client-side SEO** using Next.js for better search rankings.
- **Authentication & Authorization:** Secure user authentication using **NextAuth.js**.
- **Optimized Performance:** Implemented **Next.js caching strategies** for speed and efficiency.
- **Database Management:** Used **Prisma ORM** with **MySQL** for structured data management.
- **Filtering & Sorting:** Easily filter and sort issues for better visibility.
- **User-Friendly UI:** Clean and responsive UI built with React & Tailwind CSS.
- **Error Tracking & Monitoring:** Integrated **Sentry** for logging and monitoring errors in real-time.

## 🛠️ Tech Stack
### **Frontend & Backend:**
- **Next.js (Full-Stack Framework)** (Server-side & Static Rendering, API Routes, App Router)
- **React** (Component-based UI development)
- **Tailwind CSS** (Responsive Styling)
- **Next.js Caching Strategies** (Optimized performance with built-in caching mechanisms)

### **Database & Authentication:**
- **Prisma ORM** (for database interactions)
- **MySQL** (Managed via AWS RDS for scalability and reliability)
- **NextAuth.js** (Authentication & Authorization)

### **DevOps & Deployment:**
- **Vercel** (CI/CD & Hosting)
- **AWS RDS** (Managed MySQL Database Hosting)
- **CI/CD Integration** (Vercel for automated deployment)
- **Sentry** (Error tracking and performance monitoring)

## 📂 Project Structure
```
track-it/
│-- prisma/              # Prisma ORM configuration & migrations
│-- app/                 # Next.js App Router implementation
│   │-- api/             # Backend API routes
│   │-- issues/          # Issues listing, filtering, and details pages
│   │-- layout.tsx       # Root layout file
│   │-- page.tsx         # Dashboard page
│-- components/          # Reusable React components
│-- styles/              # Global styles
│-- env.example         # Example environment variables file
│-- docker-compose.yml  # Docker compose file
│-- Dockerfile          # Dockerfile for the next app
│-- next.config.js      # Next.js configuration file
│-- package.json        # Project dependencies
│-- README.md           # Project documentation
```

## 📸 Screenshots
### Dashboard
![Dashboard Screenshot](#)

### Issue Listing Page
![Issue Listing Screenshot](#)

### Issue Details Page
![Issue Details Screenshot](#)

<!-- (Add screenshots to showcase the UI) -->

## 🔥 Why This Project Stands Out
- ✅ **Demonstrates Full-Stack Proficiency:** Covers both frontend and backend with a structured, maintainable approach.
- ✅ **Performance-Oriented:** Implemented caching strategies for optimal loading speed.
- ✅ **SEO-Ready:** Properly structured metadata, server-rendered pages, and Open Graph optimization.
- ✅ **Scalable & Secure:** Built with modern technologies and best practices.
- ✅ **Error Monitoring:** Integrated **Sentry** for tracking and resolving errors quickly.

## 🚀 Getting Started
### **1. Clone the repository**
```bash
git clone https://github.com/yourusername/track-it.git
cd track-it
```

### **2. Install dependencies**
```bash
npm install  

# Using npm for package management
```

### **3. Set up environment variables**
Copy the provided **`env.example`** file and rename it to **`.env`**, then update it with your credentials.
```bash
cp env.example .env
```
Modify the `.env` file with your database credentials, authentication keys, and other required variables.


### **4. Run the development server**
```bash
npm run dev  

# Starts the app at http://localhost:3000
```

## 🐳 Run with Docker

To spin up the app using Docker and Docker Compose:

  ### **1. Clone the repository**
  ```bash
  git clone https://github.com/yourusername/track-it.git
  cd track-it
  ```

  ### **2. Set up environment variables**
Copy the provided **`env.example`** file and rename it to **`.env`**, then update it with your credentials.
```bash
cp env.example .env
```
Modify the `.env` file with your database credentials, authentication keys, and other required variables.
  ### **3. Start the application**
  ```bash
  docker-compose up --build
  ```
This command will:

Build the Next.js app using the Dockerfile

Start both the app and the MySQL database using docker-compose

Automatically apply any Prisma migrations (if configured)
  ### **4. Access the app**
  ```bash
   http://localhost:3000
  ```
⚠️ If you want to customize credentials or database configs, update them directly in docker-compose.yml or your Docker-related config files.

## ✨ Future Enhancements
- 🌟 **Real-time Notifications** (WebSockets or Firebase)
- 🌟 **Kanban Board View** for issue tracking
- 🌟 **Integration with GitHub Issues**

## 🤝 Contributing
Feel free to fork the project and contribute! Open an issue or submit a pull request.

## 📝 License
MIT License © 2025 Nyikwagh Moses

---
💡 **Want to connect?** Reach out on [LinkedIn](https://www.linkedin.com/in/moses-nyikwagh-a29a25127/) or check out my portfolio at [mosnyik](https://mosnyik.vercel.app/).

