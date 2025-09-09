"use client";

import { useState } from "react";
import { Search, MessageCircleQuestionMark, BellRing, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-gray-900 text-white shadow shadow-gray-600 p-5 flex justify-between items-center mb-7 sticky top-0 z-50">
      <h1 className="text-2xl font-bold">DemoApp</h1>

      {/* Desktop Icons */}
      <div className="hidden md:flex gap-7 items-center">
        <span className="cursor-pointer hover:text-yellow-200 hover:scale-105 transition-all duration-300"><Search /></span>
        <span className="cursor-pointer hover:text-yellow-200 hover:scale-105 transition-all duration-300"><MessageCircleQuestionMark /></span>
        <span className="cursor-pointer hover:text-yellow-200 hover:scale-105 transition-all duration-300"><BellRing /></span>
      </div>

      {/* Mobile / Tablet Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute right-4 top-16 bg-white text-gray-900 shadow rounded-md p-4 flex flex-col gap-3 w-40 z-50">
            <button className="flex items-center gap-2"><Search /> Search</button>
            <button className="flex items-center gap-2"><MessageCircleQuestionMark /> Messages</button>
            <button className="flex items-center gap-2"><BellRing /> Notifications</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;