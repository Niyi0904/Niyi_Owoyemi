"use client"
import { useEffect } from "react";
import { useStateContext } from "@/components/context/stateContext";
import HeroSection from "@/components/herosection/herosection";
import Projects from "@/components/projects/project";
import Skills from "@/components/skills/skills";
import Contact from "@/components/contact/contact";
import About from "@/components/aboutme/aboutme";

export default function Home() {
    const {theme} = useStateContext();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div>
      <HeroSection/>
      <Projects/>
      <Skills/>
      <About/>
      <Contact/>
    </div>
  );
}
