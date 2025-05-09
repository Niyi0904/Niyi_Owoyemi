"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FaMoon, FaSun, FaUser, FaTools, FaFolderOpen } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { AiFillHome } from "react-icons/ai";
import { useStateContext } from '../context/stateContext';
import { HiMenu, HiX } from 'react-icons/hi';



export default function Header() {
    const {theme, handleChangeTheme, handleCurrentSection, handleModal, isMenuOpen} = useStateContext();
    
    return (
        <div className="fixed top-0 w-full z-50 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-sm border-b border-white/10 dark:border-white/10 min-h-[80px] flex">
            <div className="flex mx-3 lg:mx-10 items-center align-middle w-full">
                <div className="flex w-full justify-between">
                    <Link href='/' className="relative flex items-center text-3xl font-semibold text-blue-950 dark:text-white min-w-[30%] space-x-2 cursor-pointer">
                    <div>
                        <Image
                            src="/myLogo.jpg" // Save your uploaded image as public/logo.jpg
                            alt="Nidavtech Logo"
                            width={30}
                            height={20}
                            className="object-contain rounded-xs"
                        />
                    </div>
                    <span>NidavTech</span>
                    </Link>

                    <div className="hidden lg:flex relative min-w-[50%] text-center text-lg text-blue-950">
                        <nav className="mt-2 space-x-8">
                            <NavLink href='/' onclick={() => handleCurrentSection('/')}>
                                <AiFillHome />
                                <span >Home</span>
                            </NavLink>
                            <NavLink href='/#projects' onclick={() => handleCurrentSection('/#projects')}>
                                <FaFolderOpen/>
                                <span>Projects</span>
                            </NavLink>
                            <NavLink href='/#skills' onclick={() => handleCurrentSection('/#skills')}>
                                <FaTools/>
                                <span>Skills</span>
                            </NavLink>
                            <NavLink href='/#about' onclick={() => handleCurrentSection('/#about')}>
                                <FaUser />
                                <span> About Me</span>
                            </NavLink>
                            <NavLink href='/#contact' onclick={() => handleCurrentSection('/#contact')}>
                                <HiOutlineMail />
                                <span>Contact</span>
                            </NavLink>
                        </nav>
                    </div>

                    <div className='space-x-6 flex items-center align-middle text-center'>
                        <div className="relative text-4xl font-bold text-blue-950 dark:text-white items-end text-end">
                            <button onClick={handleChangeTheme}>
                                {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                            </button>
                        </div>
                        <div className="lg:hidden relative text-4xl font-bold text-blue-950 dark:text-white items-end text-end mt-1">
                            <button onClick={handleModal} className="text-blue-950 dark:text-white text-2xl">
                                {isMenuOpen ? <HiX /> : <HiMenu />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute top-20 flex flex-col left-0 w-full bg-white dark:bg-black px-6 py-4 shadow-md lg:hidden space-y-4">
                    <NavLink href="/" onclick={handleModal}><AiFillHome /><span>Home</span></NavLink>
                    <NavLink href="/#projects" onclick={handleModal}><FaFolderOpen /> <span>Projects</span></NavLink>
                    <NavLink href="/#skills" onclick={handleModal}><FaTools /> <span>Skills</span></NavLink>
                    <NavLink href="/#about" onclick={handleModal}><FaUser /> <span>About Me</span></NavLink>
                    <NavLink href="/#contact" onclick={handleModal}><HiOutlineMail /> <span>Contact</span></NavLink>
                </div>
            )}
        </div>
    )
}

function NavLink({ href, children, onclick }: { href: string; children: React.ReactNode, onclick: () => void | void }) {
    const {currentSection, isMenuOpen} = useStateContext();

    return (
      <Link
        href={href}
        onClick={onclick}
        className="group inline-block relative font-medium text-blue-950 dark:text-white pb-1"
      >
        <span className="flex items-center space-x-2">
          {children}
        </span>
        <span className={`absolute bottom-0 left-0 h-[2px] w-0 bg-blue-950 dark:bg-white transition-all duration-300 group-hover:w-[20%] ${currentSection === href && !isMenuOpen ? 'w-[100%]': 'w-0'}  md:group-hover:w-full `} />
      </Link>
    );
  }