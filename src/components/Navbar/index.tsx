import { AlignJustify, CircleUserRound, Grip, Plus } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="w-full flex p-5 justify-between items-center">
            <div className="flex justify-between">
                <div className="flex items-center px-5">
                    <Image
                        src={'/teste.svg'}
                        width={30} 
                        height={30} 
                        alt="classroom_logo" 
                    />
                    <h2 className="text-colorText1 text-xl px-2 hover:underline hover:text-green-700">Google Sala de Aula</h2>
                </div>
            </div> 
            <div className="flex space-x-4">
                <button aria-label="Add">
                    <Plus size={32} strokeWidth={1.5} />
                </button>
                <button aria-label="Google Apps">
                    <Grip size={32} strokeWidth={1}  />
                </button>
                <button aria-label="Google Accounts">
                    <CircleUserRound size={32} strokeWidth={0.5}  />
                </button>
            </div>
        </nav>
    )
}