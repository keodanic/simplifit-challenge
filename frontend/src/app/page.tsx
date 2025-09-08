"use client";
import LoginPage from "./(public_pages)/login/page";
import HomePage from "./(private_pages)/home/page";
import { useAuth } from "@/contexts/AuthContext"; 

export default function App() {
 
  const { isAuthenticated, loading } = useAuth();


  if (loading) {
    return (
      <div className="min-h-screen bg-[#373737] flex flex-col justify-center items-center gap-2">
        <h1 className="text-4xl md:text-3xl text-white font-extrabold tracking-wide">
          Carregando...
        </h1>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50 mb-6"></div>
      </div>
    );
  }

  
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <HomePage />;
}