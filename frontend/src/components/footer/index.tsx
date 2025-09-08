import Image from "next/image";
import Logo from "../../../public/logo.png"

const Footer = () => {
    return ( 
        <footer className="bg-[#111111] mt-12 py-6">
                <div className="container mx-auto px-4 text-center text-gray-400 text-sm flex items-center justify-between">
                    <Image
                        src={Logo}
                        alt="Logo da SimpliFit"
                        className="w-40 md:w-48 lg:w-64 h-auto"
                        priority
                    />
                    
                    <p className="text-white font-bold">Desenvolvido por Victor Daniel</p>
                </div>
            </footer>
     );
}
 
export default Footer;