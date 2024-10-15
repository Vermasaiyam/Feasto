import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

type LoginInputState = {
    email: string;
    password: string;
}

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const loading = false;

    const [input, setInput] = useState<LoginInputState>({
        email: "",
        password: "",
    });

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const loginSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        console.log(input);
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={loginSubmitHandler}
                className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4 shadow-sm"
            >
                <div className="mb-4">
                    <h1 className="font-bold text-2xl text-hoverGreen">FEASTO</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {/* {errors && (
                            <span className="text-xs text-red-500">{errors.email}</span>
                        )} */}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {/* {errors && (
                            <span className="text-xs text-red-500">{errors.password}</span>
                        )} */}
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-3 bg-slate-100 focus:outline-none"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick();
                            }}
                        >
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                        </button>
                    </div>
                </div>
                <div className="mb-5">
                    {loading ? (
                        <Button disabled className="w-full bg-green hover:bg-hoverGreen">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full bg-green hover:bg-hoverGreen"
                        >
                            Login
                        </Button>
                    )}
                    <div className="mt-4 text-sm">
                        <div
                            // to="/forgot-password"
                            className="text-sm text-right hover:text-blue-500 hover:underline"
                        >
                            Forgot Password
                        </div>
                    </div>
                </div>
                <Separator />
                <p className="mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500">
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login