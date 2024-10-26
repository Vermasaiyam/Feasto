import { Github, Instagram, Linkedin, Mail, X } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="flex flex-col">
            <div className="flex lg:flex-row flex-col gap-8 justify-around items-center py-4 bg-lightGreen md:px-10 px-4">
                <div className="">
                    <Link to={'/'} className="flex items-center justify-center">
                        <img src="/logo.png" alt="Feasto Logo" className="md:h-20 h-16 mr-0" />
                        <span className="md:font-bold md:text-xl font-semibold text-lg text-hoverGreen">FEASTO</span>
                    </Link>
                    <p className="text-gray-500 mb-2">
                        Satisfy Your Cravings with a Click!
                    </p>
                    <div className="flex flex-row gap-2 w-full items-center justify-center">
                        <Link to={"https://github.com/Vermasaiyam"} target="blank" title="Github" className="bg-white p-1.5 rounded-full flex items-center justify-center">
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link to={"https://www.linkedin.com/in/saiyam05/"} target="blank" title="LinkedIn" className="bg-white p-1.5 rounded-full flex items-center justify-center">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                        <Link to={"https://x.com/SaiyamVerm91813/"} target="blank" title="X" className="bg-white p-1.5 rounded-full flex items-center justify-center">
                            <X className="w-5 h-5" />
                        </Link>
                        <Link to={"https://www.instagram.com/s.verma0504/"} target="blank" title="Instagram" className="bg-white p-1.5 rounded-full flex items-center justify-center">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link to={"mailto:vermasaiyam9@gmail.com"} target="blank" title="E-mail" className="bg-white p-1.5 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-row md:gap-16 gap-4">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <h1 className="font-bold text-darkGreen md:text-lg text-xs">Support</h1>
                        <div className="flex flex-col gap-1 md:text-base text-xs">
                            <div className="">Account</div>
                            <div className="">Support Center</div>
                            <div className="">Feedback</div>
                        </div>
                    </div>
                    <div className="flex flex-col md:gap-3 gap-2">
                        <h1 className="font-bold text-darkGreen md:text-lg text-xs">Useful Links</h1>
                        <div className="flex flex-col gap-1 md:text-base text-xs">
                            <div className="">Payment & Tax</div>
                            <div className="">Terms of Service</div>
                            <div className="">Privacy Policy</div>
                            <div className="">About Us</div>
                        </div>
                    </div>
                    <div className="flex flex-col md:gap-3 gap-2">
                        <h1 className="font-bold text-darkGreen md:text-lg text-xs">Get In Touch</h1>
                        <div className="flex flex-col gap-1 md:text-base text-xs">
                            <div className="">vermasaiyam9@gmail.com</div>
                            <div className="">Saiyam Verma</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white text-center text-gray-300 md:py-5 py-4 px-4">
                <p className="text-sm text-hoverGreen">
                    Copyright &copy; 2024 <span className="text-hoverGreen font-bold">FEASTO</span>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;