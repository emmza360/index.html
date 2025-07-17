# Full Stack Profile Application

A modern, responsive full stack profile application built with React, TypeScript, Node.js, and Express. This application showcases Emmanuel Laleye's portfolio, skills, projects, and provides a functional contact system.

## 🚀 Features

### Frontend
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Interactive Components**: Dynamic skills visualization, project filters, and contact forms
- **Mobile-First Design**: Fully responsive across all devices
- **Fast Performance**: Optimized React components with TypeScript

### Backend
- **RESTful API**: Express.js server with well-structured endpoints
- **Data Management**: JSON-based storage for profile data and messages
- **Contact System**: Functional contact form with email validation
- **Security**: Helmet.js for security headers and CORS protection
- **Logging**: Morgan middleware for request logging

### Key Sections
1. **Home**: Hero section with animated elements and overview cards
2. **About**: Detailed personal information, education, experience, and goals
3. **Skills**: Interactive skills showcase with proficiency levels and categories
4. **Projects**: Portfolio gallery with filtering and project details
5. **Contact**: Functional contact form with real-time validation

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Heroicons** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Helmet** for security
- **CORS** for cross-origin requests
- **Morgan** for logging
- **Nodemailer** for email functionality (optional)

## 📁 Project Structure

```
fullstack-profile/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main app component
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Express backend
│   ├── routes/           # API routes
│   ├── data/             # JSON data storage
│   └── index.js          # Server entry point
├── package.json          # Root package.json
├── .env                  # Environment variables
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fullstack-profile
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### Alternative: Start servers separately

**Start the backend server:**
```bash
npm run server
```

**Start the frontend (in a new terminal):**
```bash
npm run client
```

## 📊 API Endpoints

### Profile Endpoints
- `GET /api/profile` - Get complete profile data
- `GET /api/profile/skills` - Get skills data
- `GET /api/profile/projects` - Get projects data
- `POST /api/profile/projects` - Add new project

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all messages (admin)
- `PUT /api/contact/messages/:id/read` - Mark message as read

### Health Check
- `GET /api/health` - Server health status

## 🎨 Customization

### Updating Profile Data
Edit the profile data in `server/routes/profile.js` or the generated `server/data/profile.json` file:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio...",
    // ... other fields
  },
  "skills": [
    {
      "name": "Skill Name",
      "level": 85,
      "category": "Category"
    }
  ],
  // ... other sections
}
```

### Styling
- Colors and themes can be customized in `client/tailwind.config.js`
- Global styles are in `client/src/index.css`

### Adding New Features
1. Create new API endpoints in `server/routes/`
2. Add corresponding React components in `client/src/`
3. Update TypeScript interfaces as needed

## 🚀 Deployment

### Backend Deployment (Railway, Heroku, etc.)
1. Set environment variables in your hosting platform
2. Set `NODE_ENV=production`
3. The server will serve the built React app automatically

### Frontend Build
```bash
cd client
npm run build
```

### Full Deployment Script
```bash
npm run build
npm start
```

## 🔒 Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Email Configuration (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📱 Features Overview

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly navigation

### Performance Optimizations
- Code splitting with React.lazy()
- Optimized images and assets
- Efficient state management
- Minimal bundle size

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Emmanuel Laleye**
- Email: emmzalaleye360@gmail.com
- LinkedIn: [Emmanuel Laleye](https://www.linkedin.com/in/emmanuel-laleye-6421692b6)
- Phone: 0681371867
- Student ID: ALT/SOE/025/1425
- School: AltSchool Africa

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Express.js](https://expressjs.com/) - Backend framework
- [Heroicons](https://heroicons.com/) - Icon set

## 📞 Support

If you have any questions or need help with setup, please reach out:
- Email: emmzalaleye360@gmail.com
- Create an issue in this repository

---

**Built with ❤️ by Emmanuel Laleye using React, TypeScript, and Express.js**
