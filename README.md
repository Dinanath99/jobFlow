# 🌟 JobFlow - Online Job Portal

**JobFlow** is a modern **MERN stack** application designed to connect **job seekers** and **recruiters**, making job hunting and hiring **simple, fast, and seamless**. Built with cutting-edge technologies, JobFlow provides a comprehensive platform for managing job applications and recruitment processes.

![Landing Page](https://github.com/Dinanath99/jobFlow/blob/61c966079059d7fcbbe217ab16fa01446b976fcd/screenshots/Jobflow-landing_page.png)

---

## 🚀 Features

### For Job Seekers
- 🔒 **Secure Authentication** - Register and login with JWT-based authentication
- 🔍 **Advanced Job Search** - Find jobs with smart filters (location, role, company, salary)
- 📈 **Application Tracking** - Track your job applications with real-time status updates
- 👤 **Profile Management** - Create and update your professional profile
- 📱 **Responsive Design** - Access the platform seamlessly on any device
- ⚡ **Smart Filtering** - Filter jobs by latest postings, categories, and more
- 📊 **Dashboard** - View your application statistics and job recommendations

### For Recruiters
- 📝 **Job Posting** - Create and publish job openings with detailed descriptions
- 👥 **Applicant Management** - Review, filter, and manage job applications
- 🏢 **Company Profile** - Maintain your company's professional presence
- 📊 **Analytics Dashboard** - Track job posting performance and applicant metrics
- ✅ **Application Review** - Efficiently review and respond to applications
- 🎯 **Targeted Posting** - Post jobs with specific requirements and qualifications

---

## 🖼️ Screenshots

### Applicant Interface
| Feature | Screenshot |
|---------|------------|
| **Profile Management** | ![Applicant Profile](https://github.com/Dinanath99/jobFlow/blob/61c966079059d7fcbbe217ab16fa01446b976fcd/screenshots/Applicant_profile.png) |
| **Application History** | ![Job Applied](https://github.com/Dinanath99/jobFlow/blob/61c966079059d7fcbbe217ab16fa01446b976fcd/screenshots/Job_applied.png) |
| **Smart Job Filtering** | ![Job Filter](https://github.com/Dinanath99/jobFlow/blob/61c966079059d7fcbbe217ab16fa01446b976fcd/screenshots/Job_filter.png) |
| **Latest Opportunities** | ![Latest Jobs](https://github.com/Dinanath99/jobFlow/blob/61c966079059d7fcbbe217ab16fa01446b976fcd/screenshots/Latest_Job.png) |

### Recruiter Dashboard
| Feature | Screenshot |
|---------|------------|
| **Job Creation** | ![Create Job](https://github.com/Dinanath99/jobFlow/blob/61c966079059d7fcbbe217ab16fa01446b976fcd/screenshots/Create_Job.png) |
| **Job Management** | ![Job List](https://github.com/Dinanath99/jobFlow/blob/61c966079059d7fcbbe217ab16fa01446b976fcd/screenshots/Job_List.png) |
| **Application Review** | ![Check Applied Jobs](https://github.com/Dinanath99/jobFlow/blob/61c966079059d7fcbbe217ab16fa01446b976fcd/screenshots/Check_applied_job.png) |
| **Company Directory** | ![Company List](https://github.com/Dinanath99/jobFlow/blob/61c966079059d7fcbbe217ab16fa01446b976fcd/screenshots/Company_list.png) |

---

## 💻 Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Declarative routing for React applications
- **Axios** - Promise-based HTTP client for API requests
- **React Query** - Data fetching and state management library

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework for Node.js
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Object Document Mapper (ODM) for MongoDB
- **JWT** - JSON Web Tokens for secure authentication
- **Bcrypt** - Password hashing for enhanced security
- **Cloudinary** - Cloud-based image and video management

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting for maintaining code quality
- **Prettier** - Code formatting for consistent style
- **Nodemon** - Development utility for auto-restarting the server

---

## ⚙️ Environment Variables

Create a `.env` file in the **backend** directory with the following configuration:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/jobflow

# JWT Configuration
JWT_SECRET="your_super_secret_jwt_key_here"
JWT_EXPIRES_IN=90d

# Server Configuration
PORT=8000
NODE_ENV=development

# Cloudinary Configuration (for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

---

## ⚡ How to Run Locally

Follow these steps to run **JobFlow** on your local machine:

### Prerequisites
Make sure you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Dinanath99/JobFlow.git
cd JobFlow
```

### 2️⃣ Install Dependencies

**Backend Setup:**
```bash
cd backend
npm install
```

**Frontend Setup:**
```bash
cd ../frontend
npm install
```

### 3️⃣ Set Up Environment Variables
1. Create a `.env` file in the **backend** directory
2. Copy the environment variables template above
3. Replace placeholder values with your actual credentials:
   - Get MongoDB connection string from [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a strong JWT secret key
   - Set up [Cloudinary](https://cloudinary.com/) account for image uploads

### 4️⃣ Start the Development Servers

**Start Backend Server:**
```bash
cd backend
npm run dev
# or
npm start
```
The backend server will run on `http://localhost:8000`

**Start Frontend Development Server:**
```bash
cd ../frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### 5️⃣ Open in Browser
Visit `http://localhost:5173` to see the application in action!

---

## 📁 Project Structure

```
JobFlow/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── screenshots/
└── README.md
```

---

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

---

## 🔮 Future Enhancements

- 📧 Email notifications for application updates
- 💬 In-app messaging between recruiters and candidates
- 📊 Advanced analytics and reporting
- 🔍 AI-powered job recommendations
- 📱 Mobile application development
- 🌐 Multi-language support

---

## 📞 Contact & Connect

- **👨‍💻 Developer:** Dinanath Mukhiya
- **🔗 LinkedIn:** [Dinanath Mukhiya](https://linkedin.com/in/dinanath-mukhiya)
- **📧 Email:** dinanathmukhiya99@gmail.com
- **🐙 GitHub:** [@Dinanath99](https://github.com/Dinanath99)

---

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a star! ⭐

[![GitHub stars](https://img.shields.io/github/stars/Dinanath99/JobFlow.svg?style=social&label=Star)](https://github.com/Dinanath99/JobFlow/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Dinanath99/JobFlow.svg?style=social&label=Fork)](https://github.com/Dinanath99/JobFlow/network/members)

---

*Made with ❤️ by [Dinanath Mukhiya](https://github.com/Dinanath99)*
