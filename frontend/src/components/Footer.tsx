import { Instagram, Linkedin, Mail, X } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="flex flex-col">
            <div className="flex flex-row justify-around items-center py-4 bg-lightGreen px-10">
                <div className="">
                    <Link to={'/'} className="flex items-center">
                        <img src="/logo.png" alt="Feasto Logo" className="md:h-20 h-16 mr-0" />
                        <span className="md:font-bold md:text-xl font-semibold text-lg text-hoverGreen">FEASTO</span>
                    </Link>
                    <p className="text-gray-500 mb-2">
                        Satisfy Your Cravings with a Click!
                    </p>
                    <div className="flex flex-row gap-2">
                        <Link to={"https://www.instagram.com/s.verma0504/"} target="blank" className="bg-white p-1.5 rounded-full flex items-center justify-center">
                            <Instagram className="w-5 h-5"  />
                        </Link>
                        <Link to={"https://x.com/SaiyamVerm91813/"} target="blank" className="bg-white p-1.5 rounded-full flex items-center justify-center">
                            <X className="w-5 h-5"  />
                        </Link>
                        <Link to={"https://www.linkedin.com/in/saiyam05/"} target="blank" className="bg-white p-1.5 rounded-full flex items-center justify-center">
                            <Linkedin className="w-5 h-5"  />
                        </Link>
                        <Link to={"mailto:vermasaiyam9@gmail.com"} target="blank" className="bg-white p-1.5 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5"  />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-row gap-16">
                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold text-darkGreen text-lg">Support</h1>
                        <div className="flex flex-col gap-1">
                            <div className="">Account</div>
                            <div className="">Support Center</div>
                            <div className="">Feedback</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold text-darkGreen text-lg">Support</h1>
                        <div className="flex flex-col gap-1">
                            <div className="">Account</div>
                            <div className="">Support Center</div>
                            <div className="">Feedback</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold text-darkGreen text-lg">Support</h1>
                        <div className="flex flex-col gap-1">
                            <div className="">Account</div>
                            <div className="">Support Center</div>
                            <div className="">Feedback</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold text-darkGreen text-lg">Support</h1>
                        <div className="flex flex-col gap-1">
                            <div className="">Account</div>
                            <div className="">Support Center</div>
                            <div className="">Feedback</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white text-center text-gray-300 py-8 px-4">
                <p className="text-sm text-hoverGreen">
                    Copyright &copy; 2021 <span className="text-hoverGreen font-bold">FEASTO</span>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;