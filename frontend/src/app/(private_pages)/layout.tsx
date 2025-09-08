"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"; 

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#373737] flex flex-col justify-center items-center gap-2">
        <h1 className="text-4xl md:text-3xl text-white font-extrabold tracking-wide">
          Verificando...
        </h1>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50 mb-6"></div>
      </div>
    );
  }


  return isAuthenticated ? (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  ) : null;
}