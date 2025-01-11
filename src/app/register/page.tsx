import GrandientBackground from '@/components/SVG/GrandientBackground';
import RegisterFormWrapper from '@/components/ui/forms/register/RegisterFormWrapper';

export default function Register() {
    return (
        <>
            <GrandientBackground/>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-screen h-screen m-0 rounded-none p-6 bg-white
      sm:w-[80%] sm:h-auto sm:rounded-2xl sm:px-[5%] sm:py-[4%]
      md:w-[70%] md:px-[8%] md:py-[4%]
      lg:w-[44%] lg:px-[8%] lg:py-[5%] shadow-2xl">
                    <div className="flex flex-col justify-center w-full h-full">
                        <h1 className="text-2xl font-bold mb-6
            md:text-[28px] 
            lg:text-[32px] lg:mb-8">
                            Bienvenue à bord ! 🎉
                        </h1>
                        <p className="font-light text-[#4F4F4F] mb-8 text-sm leading-5
            md:text-base 
            lg:mb-10">
                            Aujourd'hui marque le début d'une nouvelle aventure. Inscris-toi maintenant et commence à
                            gérer tes projets !
                        </p>
                        <RegisterFormWrapper/>
                    </div>
                </div>
            </div>
        </>
    );
}