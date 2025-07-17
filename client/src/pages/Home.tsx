import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDownIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface ProfileData {
  personal: {
    name: string;
    title: string;
    bio: string;
    location: string;
    profileImage: string;
  };
}

const Home: React.FC = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                variants={itemVariants}
              >
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {profileData?.personal.name || 'Emmanuel Laleye'}
                </span>
              </motion.h1>
              
              <motion.h2
                className="text-xl sm:text-2xl text-gray-600 mb-8"
                variants={itemVariants}
              >
                {profileData?.personal.title || 'Software Engineer & Frontend Developer'}
              </motion.h2>
              
              <motion.p
                className="text-lg text-gray-700 mb-10 leading-relaxed"
                variants={itemVariants}
              >
                {profileData?.personal.bio || 
                 'Passionate about creating amazing web experiences with modern technologies. Currently studying at AltSchool Africa and building my skills in frontend development.'}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Link
                  to="/projects"
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 text-lg"
                >
                  View My Work
                </Link>
                
                <Link
                  to="/contact"
                  className="btn-secondary inline-flex items-center justify-center px-8 py-3 text-lg"
                >
                  Get In Touch
                </Link>
                
                <button className="inline-flex items-center justify-center px-8 py-3 text-lg border-2 border-gray-300 text-gray-700 hover:border-primary-600 hover:text-primary-600 font-medium rounded-lg transition-all duration-200">
                  <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                  Download CV
                </button>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <motion.div
                  className="w-80 h-80 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 p-2"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-6xl font-bold text-gray-400">
                    EL
                  </div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-accent-400 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-400 rounded-full"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowDownIcon className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Quick Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A glimpse into my journey as a frontend developer and the technologies I work with.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-gray-600">
                Currently studying Frontend Engineering at AltSchool Africa
              </p>
            </motion.div>

            <motion.div
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="text-gray-600">
                Frontend internships at HexSoftware & CodeSoft, plus cybersecurity experience
              </p>
            </motion.div>

            <motion.div
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Goals</h3>
              <p className="text-gray-600">
                Working towards opportunities at major tech companies like MTN, Amazon, Discovery
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;