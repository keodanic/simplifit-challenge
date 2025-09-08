"use client"

import type React from "react"
import { useState } from "react"
import Logo from "../../../../public/logo.png"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true) 
        setError(null)   

        try {
            await login(email, password) 
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Erro ao tentar fazer login. Verifique suas credenciais.";
            setError(errorMessage);
            console.error("Falha no login:", err);
        } finally {
            setLoading(false) 
        }
    }

    return (
        <div className="min-h-screen bg-[#373737] flex items-center justify-center p-4">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-[#181818] rounded-lg p-6 md:p-8 lg:p-10 shadow-2xl gap-8 md:gap-12 lg:gap-16 flex-col flex">
                <div className="flex justify-center">
                    <Image
                        src={Logo}
                        alt="Logo da SimpliFit"
                        className="w-40 md:w-48 lg:w-56 h-auto"
                        priority
                    />
                </div>

                <form onSubmit={handleLogin} className="space-y-4 md:space-y-6 gap-4 md:gap-5 flex flex-col">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-2 border-[#EA1C24] text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-0 focus:outline-none rounded-xl h-10 md:h-12 px-4 text-sm md:text-base"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-2 border-[#EA1C24] text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-0 focus:outline-none rounded-xl h-10 md:h-12 px-4 text-sm md:text-base"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-900/20 border border-red-500/50 rounded-md p-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#EA1C24] hover:bg-[#ff0008] text-white font-semibold py-2 md:py-3 px-4 rounded-md transition-colors h-10 md:h-12 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black text-sm md:text-base"
                    >
                        {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                </form>
                

            </div>
        </div>
    )
}