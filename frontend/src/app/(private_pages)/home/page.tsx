"use client";

import { FaTags, FaAddressBook } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"; 

export default function HomePage() {
  const { user } = useAuth(); 

  return (
    <>
      <div className="mb-8">
        
        <h1 className="text-3xl font-bold mb-2">
          Bem-vindo, {user?.nome?.split(' ')[0] || 'Usuário'}!
        </h1>
        <p className="text-gray-300">Este é o seu painel de gestão da academia.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Ações Principais</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

         
          <Link href="/listUsers" className="card-action h-full">
            <div className="card-icon bg-[#EA1C24]">
              <FaAddressBook className="h-6 w-6" />
            </div>
            <div className="text-center">
              <span className="font-medium text-lg">Gerenciar Usuários</span>
              <p className="text-sm text-gray-400 mt-1">
                Visualize, crie, edite e remova membros e operadores.
              </p>
            </div>
          </Link>

          
          <Link href="/listType" className="card-action h-full">
            <div className="card-icon bg-white">
              <FaTags className="h-6 w-6 text-[#EA1C24]" />
            </div>
            <div className="text-center">
              <span className="font-medium text-lg">Gerenciar Tipos</span>
              <p className="text-sm text-gray-400 mt-1">
                Defina as categorias dos usuários, como "Professor" ou "Aluno".
              </p>
            </div>
          </Link>
          
        </div>
      </div>
    </>
  );
}