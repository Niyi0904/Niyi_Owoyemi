"use client"
import Image from "next/image";
import { FaLinkedin, FaGithub, FaTwitter} from "react-icons/fa";
import { useStateContext } from "../context/stateContext";
import { motion } from "framer-motion";


const socialIcons = [
    { icon: <FaGithub />, url: "https://github.com/Niyi0904" },
    { icon: <FaTwitter />, url: "https://x.com/nidav_dhev?s=21" },
    { icon: <FaLinkedin />, url: "http://linkedin.com/in/owoyeminiyi" },
  ];


export default function HeroSection () {
    const {theme} = useStateContext();
  return (
<div id="home" className="bg-gradient-to-r from-blue-100 from-15% via-pink-100 via-55% to-blue-100 to-100% dark:bg-gradient-to-r dark:from-blue-400 dark:via-pink-400 dark:to-blue-400 dark:text-white herosection-desc relative top-10">
    <div className="sm:grid sm:grid-cols-2 flex flex-col-reverse h-full rounded-b-xl py-12 px-10 justify-center items-center space-x-16">
        <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative lg:leading-8 leading-7 w-[90%] lg:w-[80%]">
            <span className="text-blue-950 text-xl md:font-semibold">Hello, I&apos;m</span>
            <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-900 from-15% via-pink-600 via-55% to-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:via-pink-600 dark:to-blue-600 to-200% bg-clip-text text-transparent">Owoyemi Niyi <span className="text-5xl font-light">|</span> Frontend Engineer</h1>
            <div>  

            </div>
            <p className="text-blue-950 text-xl md:font-semibold ">I&apos;m a detail-driven Javascript developer specializing in creating dynamic and responsive web applications</p>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }} // Wait 1.5s after hero animations
                className="flex gap-6 text-blue-950 pt-3 pb-3 text-2xl"
            >
                {socialIcons.map((item, index) => (
                <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 30, type: 'spring' }} // Start off-screen to the right
                    animate={{ opacity: 1, x: 0 }}  // Slide in to normal position
                    transition={{ 
                    duration: 0.5,
                    delay: index * 0.6, // Each icon delays 0.3s after the previous one
                    }}
                    whileHover={{ scale: 1.1 }}
                >
                    {item.icon}
                </motion.a>
                ))}
            </motion.div>
            {/* <h1 className="text-4xl font-bold leading-10 self-stretch">Frontend Developer</h1> */}
        </motion.div>
        <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative rounded-2xl">
            <Image
                src={theme === 'light' ? '/Myimagelight.jpg' : "/Myimagelight.jpg"}
                alt="profile image"
                width={200}
                height={200}
                className="w-[100%] lg:w-[50%] h-[50%] object-cover rounded-full"
            />
        </motion.div>
    </div>
</div>

)}
