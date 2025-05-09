import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaReact, FaNodeJs, FaSass } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript, SiFirebase, SiMysql, SiSequelize } from "react-icons/si";

const nextjsSkills = [
    { 
      name: "Next.js", 
      icon: <SiNextdotjs className="text-black dark:text-white text-2xl" />,
      level: 50,
      projects: 1,
      description: "SSR, SSG, API Routes, and App Router"
    },
    { 
      name: "React", 
      icon: <FaReact className="text-blue-500 text-2xl" />,
      level: 80,
      projects: 5,
      description: "Hooks, Context API, and Components"
    },
    { 
        name: "JavaScript", 
        icon: <SiJavascript className="text-yellow-400 text-2xl" />, 
        level: 90, 
        projects: 5,
        description: "ES6+, DOM manipulation, async programming" 
    },
    { 
      name: "TypeScript", 
      icon: <SiTypescript className="text-blue-600 text-2xl" />,
      level: 50,
      projects: 1,
      description: "Type-safe development"
    },
    { 
      name: "Tailwind CSS", 
      icon: <SiTailwindcss className="text-cyan-400 text-2xl" />,
      level: 88,
      projects: 6,
      description: "Utility-first CSS"
    },
    { 
      name: "Firebase", 
      icon: <SiFirebase className="text-yellow-500 text-2xl" />,
      level: 75,
      projects: 3,
      description: "Authentication and Firestore"
    },
    { 
      name: "MySQL", 
      icon: <SiMysql className="text-blue-600 text-2xl" />,
      level: 75,
      projects: "1 (In Progress)",
      description: "Database design and queries"
    },
    { 
      name: "Sequelize", 
      icon: <SiSequelize className="text-blue-400 text-2xl" />,
      level: 60,
      projects: "1 (In Progress)",
      description: "ORM for Node.js"
    },
    { 
      name: "Sass", 
      icon: <FaSass className="text-pink-500 text-2xl" />,
      level: 60,
      projects: 1,
      description: "CSS preprocessor"
    },
    { 
      name: "Node.js", 
      icon: <FaNodeJs className="text-green-500 text-2xl" />,
      level: 50,
      projects: 1,
      description: "Backend development"
    }
  ];

export default function NextJsSkills() {
  // Animation controls for the section header
  const headerControls = useAnimation();
  const [headerRef, headerInView] = useInView({ triggerOnce: true });

  // Animation controls for skill cards
  const [cardsRef, cardsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Header animation sequence
  if (headerInView) {
    headerControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    });
  }

  return (
    <section id="skills" className="py-16 bg-gray-50  dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl relative top-6">
        {/* Animated Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerControls}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-delugia italic mb-4"
          >
            <span className="text-blue-500">Skills</span> & Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Technologies I use daily and those I&apos;m actively mastering
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {nextjsSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={cardsInView ? {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: "backOut"
                }
              } : {}}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
              className={`relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all ${
                typeof skill.projects === 'string' ? 
                'border-2 border-yellow-400 dark:border-yellow-500' : 
                'border border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Skill Header */}
              <motion.div 
                className="flex items-center gap-4 mb-4"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className={`p-3 rounded-lg ${
                    skill.name === "MySQL" ? "bg-blue-100 dark:bg-blue-900/30" :
                    skill.name === "Sequelize" ? "bg-blue-50 dark:bg-blue-800/30" :
                    "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  {skill.icon}
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-xl font-bold flex text-blue-950 dark:text-white items-center gap-2"
                    whileHover={{ color: "#3b82f6" }}
                  >
                    {skill.name}
                    
                    {typeof skill.projects === 'string' && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.15 + 0.3 }}
                        className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full"
                      >
                        Learning
                      </motion.span>
                    )}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-500 dark:text-gray-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    {skill.description}
                  </motion.p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-5">
                    Used in {skill.projects}+ projects
                  </p>
                </div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={cardsInView ? { 
                  width: `${skill.level}%`,
                  transition: { 
                    delay: index * 0.15 + 0.4,
                    duration: 1.2,
                    type: "spring",
                    damping: 10
                  }
                } : {}}
                className={`h-2 rounded-full ${
                  skill.name === "MySQL" ? "bg-blue-600" :
                  skill.name === "Sequelize" ? "bg-blue-400" :
                  "bg-blue-500"
                }`}
              />
              
              {/* Progress Label */}
              <motion.div
                className="flex justify-between items-center mt-2 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.6 }}
              >
                <span>Proficiency</span>
                <div className="flex items-center gap-2">
                  <span>{skill.level}%</span>
                  {typeof skill.projects === 'string' && (
                    <motion.span
                      animate={{ 
                        opacity: [0.6, 1, 0.6],
                        scale: [0.9, 1.1, 0.9]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-yellow-500"
                    >
                      •
                    </motion.span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800 text-center"
            >
            <h3 className="text-xl font-delugia italic mb-2">
                Want a Next.js/React Project? <span className="text-blue-500">Let&apos;s Talk!</span>
            </h3>
            <p className="mb-4">I specialize in building performant, SEO-friendly apps with Next.js and React</p>
            <a 
                href="#contact" 
                className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
                Start a Project
            </a>
            </motion.div>
      </div>
    </section>
  );
}