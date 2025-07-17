const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const PROFILE_DATA_PATH = path.join(__dirname, '../data/profile.json');

// Initialize profile data file if it doesn't exist
const initializeProfileData = async () => {
  try {
    await fs.access(PROFILE_DATA_PATH);
  } catch (error) {
    const initialData = {
      personal: {
        name: "Emmanuel Laleye",
        title: "Software Engineer & Frontend Developer",
        age: 20,
        location: "South Africa",
        school: "ALTSCHOOL AFRICA",
        studentId: "ALT/SOE/025/1425",
        bio: "Hi, I am Emmanuel Laleye, a passionate Software engineer specializing in Frontend Development. I am currently in my first year studying Front-End Engineering at AltSchool Africa.",
        profileImage: "/uploads/profile.jpg"
      },
      experience: [
        {
          id: 1,
          title: "Frontend Web Developer Intern",
          company: "HexSoftware",
          duration: "1 Month",
          description: "Worked on frontend development projects using HTML, CSS, and JavaScript"
        },
        {
          id: 2,
          title: "Frontend Web Developer Intern", 
          company: "CodeSoft",
          duration: "1 Month",
          description: "Developed responsive web applications and collaborated with design teams"
        },
        {
          id: 3,
          title: "Cybersecurity Trainee",
          company: "Self-Study",
          duration: "3 Months",
          description: "Studied cybersecurity fundamentals and best practices"
        }
      ],
      skills: [
        { name: "HTML5", level: 90, category: "Frontend" },
        { name: "CSS3", level: 85, category: "Frontend" },
        { name: "JavaScript", level: 80, category: "Frontend" },
        { name: "React.js", level: 75, category: "Frontend" },
        { name: "Tailwind CSS", level: 85, category: "Frontend" },
        { name: "Bootstrap", level: 80, category: "Frontend" },
        { name: "SASS/LESS", level: 70, category: "Frontend" },
        { name: "Responsive Design", level: 90, category: "Design" },
        { name: "UI/UX Design", level: 75, category: "Design" },
        { name: "Figma", level: 70, category: "Design" },
        { name: "Performance Optimization", level: 65, category: "Technical" },
        { name: "Git & GitHub", level: 80, category: "Tools" }
      ],
      education: [
        {
          id: 1,
          degree: "Diploma in Front-End Web Development",
          institution: "AltSchool Africa",
          year: "2024 - Present",
          description: "Comprehensive program covering modern frontend technologies and best practices"
        }
      ],
      goals: [
        "Master core technologies like HTML, CSS, and JavaScript",
        "Create user-friendly, visually appealing, and high-performing web applications",
        "Stay updated with new technologies, best practices, and industry trends",
        "Develop strong problem-solving and debugging skills",
        "Work at leading tech companies like MTN, Amazon, or Discovery",
        "Secure an internship at a major technology company",
        "Build a reputation as a skilled developer in the tech community"
      ],
      contact: {
        email: "emmzalaleye360@gmail.com",
        phone: "0681371867",
        linkedin: "https://www.linkedin.com/in/emmanuel-laleye-6421692b6",
        github: "https://github.com/emmanuellaleye",
        location: "South Africa"
      },
      projects: [
        {
          id: 1,
          title: "Personal Portfolio Website",
          description: "A responsive portfolio website showcasing my skills and projects",
          technologies: ["HTML", "CSS", "JavaScript"],
          status: "Completed",
          featured: true
        }
      ]
    };
    
    // Ensure data directory exists
    await fs.mkdir(path.dirname(PROFILE_DATA_PATH), { recursive: true });
    await fs.writeFile(PROFILE_DATA_PATH, JSON.stringify(initialData, null, 2));
  }
};

// GET /api/profile - Get complete profile data
router.get('/', async (req, res) => {
  try {
    await initializeProfileData();
    const data = await fs.readFile(PROFILE_DATA_PATH, 'utf8');
    const profileData = JSON.parse(data);
    res.json(profileData);
  } catch (error) {
    console.error('Error reading profile data:', error);
    res.status(500).json({ error: 'Failed to load profile data' });
  }
});

// GET /api/profile/skills - Get skills data
router.get('/skills', async (req, res) => {
  try {
    await initializeProfileData();
    const data = await fs.readFile(PROFILE_DATA_PATH, 'utf8');
    const profileData = JSON.parse(data);
    res.json(profileData.skills);
  } catch (error) {
    console.error('Error reading skills data:', error);
    res.status(500).json({ error: 'Failed to load skills data' });
  }
});

// GET /api/profile/projects - Get projects data
router.get('/projects', async (req, res) => {
  try {
    await initializeProfileData();
    const data = await fs.readFile(PROFILE_DATA_PATH, 'utf8');
    const profileData = JSON.parse(data);
    res.json(profileData.projects);
  } catch (error) {
    console.error('Error reading projects data:', error);
    res.status(500).json({ error: 'Failed to load projects data' });
  }
});

// POST /api/profile/projects - Add new project
router.post('/projects', async (req, res) => {
  try {
    const data = await fs.readFile(PROFILE_DATA_PATH, 'utf8');
    const profileData = JSON.parse(data);
    
    const newProject = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    profileData.projects.push(newProject);
    await fs.writeFile(PROFILE_DATA_PATH, JSON.stringify(profileData, null, 2));
    
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

module.exports = router;