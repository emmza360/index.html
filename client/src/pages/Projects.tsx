import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, CodeBracketIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  featured: boolean;
  createdAt?: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/profile/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const filters = ['All', 'Featured', 'Completed', 'In Progress'];
  const filteredProjects = filter === 'All' 
    ? projects 
    : filter === 'Featured'
    ? projects.filter(project => project.featured)
    : projects.filter(project => project.status === filter);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in progress': return 'bg-accent-100 text-accent-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTechColor = (tech: string) => {
    const colors = [
      'bg-red-100 text-red-800',
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800'
    ];
    return colors[tech.length % colors.length];
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
          <h1 className="section-title">My Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my work, including web applications, designs, and various development projects.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                filter === filterOption
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="card group hover:scale-105 transition-transform duration-200"
            >
              {/* Project Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="text-6xl text-primary-300">🌐</div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-4">
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                    <CodeBracketIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 btn-primary text-sm py-2">
                    View Project
                  </button>
                  <button className="flex-1 btn-secondary text-sm py-2">
                    Source Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add New Project Card (for demonstration) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + filteredProjects.length * 0.1 }}
            className="card border-2 border-dashed border-gray-300 hover:border-primary-400 transition-colors duration-200 flex flex-col items-center justify-center text-center min-h-[400px]"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <PlusIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">New Project</h3>
            <p className="text-gray-500 mb-4">
              I'm always working on something new. Stay tuned for updates!
            </p>
            <button className="btn-primary">
              Coming Soon
            </button>
          </motion.div>
        </div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {projects.length}
              </div>
              <p className="text-gray-600">Total Projects</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {projects.filter(p => p.status === 'Completed').length}
              </div>
              <p className="text-gray-600">Completed</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-accent-600 mb-2">
                {projects.filter(p => p.status === 'In Progress').length}
              </div>
              <p className="text-gray-600">In Progress</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {projects.filter(p => p.featured).length}
              </div>
              <p className="text-gray-600">Featured</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Interested in collaborating?</h2>
            <p className="text-lg mb-6 opacity-90">
              I'm always open to discussing new projects and opportunities. Let's build something amazing together!
            </p>
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Get In Touch
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;