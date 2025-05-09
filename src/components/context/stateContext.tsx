"use client";

import { useContext, createContext, ReactNode, useState } from "react";

interface StateContextType {
  theme: string;
  handleChangeTheme: () => void;
  currentSection: string;
  handleCurrentSection: (string: string) => void;
  isMenuOpen: boolean;
  handleModal: () => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>('light');
  const [currentSection, setCurrentSection] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleModal = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  const handleCurrentSection = (current: string) => {
    setCurrentSection(current);
  }


  const handleChangeTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <StateContext.Provider value={{ theme, handleChangeTheme, currentSection, handleCurrentSection, isMenuOpen, handleModal}}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a ContextProvider");
  }
  return context;
};
