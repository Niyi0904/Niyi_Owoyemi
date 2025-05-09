import { motion } from "framer-motion";
import Image from "next/image";
import { FaReact, FaNodeJs} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss } from "react-icons/si";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl ">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-delugia italic mb-4">
            <span className="text-blue-500">About</span> Me
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="flex flex-col  lg:flex-row items-center gap-12">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96 overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/Myimagedark.jpg" // Replace with your image path
                alt="Owoyemi Niyi"
                width={400}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h3 className="text-2xl font-bold mb-4">Hi, I&apos;m Owoyemi Niyi</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              A passionate Frontend Engineer specializing in creating dynamic and responsive web applications. 
              With 3+ years of experience, I transform ideas into beautifully crafted digital experiences 
              using modern web technologies.
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">My Tech Stack</h4>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <TechIcon icon={<FaReact className="text-2xl text-blue-500" />} name="React" />
                <TechIcon icon={<SiNextdotjs className="text-2xl text-black dark:text-white" />} name="Next.js" />
                <TechIcon icon={<SiTypescript className="text-2xl text-blue-600" />} name="TypeScript" />
                <TechIcon icon={<SiJavascript className="text-2xl text-yellow-500" />} name="JavaScript" />
                <TechIcon icon={<SiTailwindcss className="text-2xl text-cyan-500" />} name="Tailwind CSS" />
                <TechIcon icon={<FaNodeJs className="text-2xl text-green-500" />} name="Node.js" />
              </div>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Let&apos;s Work Together
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const TechIcon = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex flex-col items-center gap-2 w-16"
  >
    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
      {icon}
    </div>
    <span className="text-sm font-medium">{name}</span>
  </motion.div>
);