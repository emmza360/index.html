import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface ProfileData {
  personal: {
    name: string;
    title: string;
    age: number;
    location: string;
    school: string;
    studentId: string;
    bio: string;
  };
  education: Array<{
    id: number;
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
  goals: string[];
  experience: Array<{
    id: number;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
}

const About: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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
          <h1 className="section-title">About Me</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about my journey, background, and aspirations in the world of technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">👨‍💻</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{profileData?.personal.name}</p>
                    <p className="text-gray-600">{profileData?.personal.title}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mr-4">
                    <CalendarIcon className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{profileData?.personal.age} years old</p>
                    <p className="text-gray-600">Young and passionate developer</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <MapPinIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{profileData?.personal.location}</p>
                    <p className="text-gray-600">Current location</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <AcademicCapIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{profileData?.personal.school}</p>
                    <p className="text-gray-600">Student ID: {profileData?.personal.studentId}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Biography</h3>
                <p className="text-gray-700 leading-relaxed">
                  {profileData?.personal.bio}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Education & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Education */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="space-y-4">
                {profileData?.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="border-l-4 border-primary-500 pl-4"
                  >
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-primary-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-600 mb-2">{edu.year}</p>
                    <p className="text-gray-700">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
              <div className="space-y-4">
                {profileData?.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="border-l-4 border-accent-500 pl-4"
                  >
                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-accent-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">{exp.duration}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16"
        >
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">My Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData?.goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg"
                >
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">{goal}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <blockquote className="text-xl md:text-2xl font-medium italic mb-4">
              "Success is not final, failure is not fatal: it is the courage to continue that counts."
            </blockquote>
            <p className="text-primary-100">— Winston Churchill</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;