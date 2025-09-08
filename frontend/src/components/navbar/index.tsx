"use client";

import Image from "next/image";
import Logo from "../../../public/logo.png";
import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FiChevronDown, FiGrid, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router=useRouter()

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  if (!user) {
    return null;
  }

  return (
    <header className="bg-[#181818] shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="Logo da SimpliFit"
              className="w-40 md:w-48 h-auto"
              onClick={()=>router.push("/home")}
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-[#111111] p-2 rounded-lg hover:bg-[#2c2c2c] transition-colors"
            >
              <div className="bg-gray-600 p-2 rounded-full">
                <FaUser className="text-white" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-white font-semibold text-sm">{user.nome}</p>
                <p className="text-gray-400 text-xs">{user.role}</p>
              </div>
              <FiChevronDown className="text-white" />
            </button>

            {/* Menu Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1D1D1D] border border-[#2C2C2C] rounded-lg shadow-xl z-20">
                <div className="p-4 border-b border-[#2C2C2C]">
                  <p className="font-bold text-white">{user.nome}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <div className="p-2">
                    {user?.role === 'SUPERADMIN' && (
                    <Link href="/audit-logs" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#2C2C2C] rounded-md transition-colors">
                      <FiGrid />
                      <span>Logs de Auditoria</span>
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-[#2C2C2C] rounded-md transition-colors"
                  >
                    <FiLogOut />
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;