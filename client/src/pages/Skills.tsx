import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/profile/skills');
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getSkillColor = (level: number) => {
    if (level >= 85) return 'bg-green-500';
    if (level >= 70) return 'bg-primary-500';
    if (level >= 55) return 'bg-accent-500';
    return 'bg-gray-400';
  };

  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return '🎨';
      case 'Design': return '🎯';
      case 'Technical': return '⚡';
      case 'Tools': return '🔧';
      default: return '💻';
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Skills & Technologies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different technologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getSkillIcon(skill.category)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                    <p className="text-sm text-gray-600">{skill.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary-600">{skill.level}%</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="skill-bar">
                <motion.div
                  className={`skill-progress ${getSkillColor(skill.level)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                />
              </div>
              
              {/* Proficiency Level */}
              <div className="mt-2 text-right">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  skill.level >= 85 ? 'bg-green-100 text-green-800' :
                  skill.level >= 70 ? 'bg-primary-100 text-primary-800' :
                  skill.level >= 55 ? 'bg-accent-100 text-accent-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {skill.level >= 85 ? 'Expert' :
                   skill.level >= 70 ? 'Advanced' :
                   skill.level >= 55 ? 'Intermediate' :
                   'Beginner'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.slice(1).map((category, index) => {
              const categorySkills = skills.filter(skill => skill.category === category);
              const averageLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg"
                >
                  <div className="text-3xl mb-2">{getSkillIcon(category)}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category}</h3>
                  <p className="text-sm text-gray-600 mb-2">{categorySkills.length} skills</p>
                  <div className="text-2xl font-bold text-primary-600">
                    {Math.round(averageLevel)}%
                  </div>
                  <p className="text-xs text-gray-500">Average proficiency</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Learning Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Continuous Learning</h2>
            <p className="text-lg mb-6 opacity-90">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies and best practices in web development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['React.js', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;