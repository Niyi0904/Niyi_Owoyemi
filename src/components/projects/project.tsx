import { motion } from "framer-motion";
import Image from "next/image";
import {FaGithub} from "react-icons/fa";


const projects = [
  {
    title: "Chat Application",
    description: "A Feature that include live message updates, typing indicators, and user authentication via Firebase.",
    tags: ["React", "JavaScript", "Tailwind", "Socket.io"],
    link: "https://chat-application-niyi0904s-projects.vercel.app",
    github: "https://github.com/Niyi0904/Chat-Application.git",
    image: "https://i.ibb.co/HtXJ8Jr/chat-application.jpg",
  },
  {
    title: "Report Application",
    description: "A report management system enabling users to submit, edit, and view data-driven reports",
    tags: ["React", "Javascript", "Firebase"],
    link: "https://report-application.vercel.app",
    github: "https://github.com/Niyi0904/Report-Application.git",
    image: "https://i.ibb.co/mF56gC6K/Screenshot-3.png",
  },
  {
    title: "Ronnie Clothings",
    description: "An e-commerce website for a fictional clothing brand with client-side routing.",
    tags: ["React", "Javascript", "CSS Grid", "Firebase"],
    link: "https://ronnie-clothings.vercel.app",
    github: "https://github.com/Niyi0904/Ronnie-Clothings.git",
    image: "https://i.ibb.co/rKJFW5j8/Screenshot-4.png",
  },
  {
    title: "Admin Dashboard",
    description: "An internal admin panel for data tracking and user management.",
    tags: ["React", "Javascript", "CSS Grid", "Syncfusion"],
    link: "https://admin-dashboard-niyi0904s-projects.vercel.app",
    github: "https://github.com/Niyi0904/admin-dashboard.git",
    image: "https://i.ibb.co/wNRsNJWL/Screenshot-5.png",
  },
  {
    title: "Todo List",
    description: "A minimalist task manager that includes CRUD features, theming, and authentication, Showcases component reuse, state management with hooks, and custom modals.",
    tags: ["React", "Javascript", "Firebase", "Syncfusion"],
    link: "https://todo-list-rouge-chi.vercel.app",
    github: "https://github.com/Niyi0904/todo_list.git",
    image: "https://i.ibb.co/Fs4vmb9/todo-list.jpg",
  },
  {
    title: "My Portfolio",
    description: "A Porfolio site thta shocases my skill, and ability in Front-end Engineering",
    tags: ["Next.js", "Typescript", "Node.js", "Framer Motion"],
    link: "/",
    github: "https://github.com/Niyi0904/todo_list.git",
    image: "https://i.ibb.co/0ppRC3Py/Screenshot-6.png",
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 relative top-6">
        {/* Section Header */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl text-blue-950 dark:text-gray-50 text-center mb-12 font-delugia italic"
        >
          <span className="text-blue-500">Featured</span> Projects
        </motion.h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <Image 
                src={project.image} 
                alt={project.title}
                width={200}
                height={200} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                    <a 
                    href={project.link} 
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                    View Project
                    </a>
                    <a 
                    href={project.github}
                    className="inline-block text-3xl px-4 py-2 text-blue-950 dark:text-white dark:hover:bg-blue-900 rounded-lg hover:bg-blue-600 transition-colors">
                        <FaGithub/>
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}