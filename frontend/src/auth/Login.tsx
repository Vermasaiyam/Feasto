import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Loader2, LockKeyhole, Mail } from "lucide-react"


const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                // onSubmit={loginSubmitHandler}
                className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4 shadow-sm"
            >
                <div className="mb-4">
                    <h1 className="font-bold text-2xl text-hoverGreen">Feasto</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            // value={input.email}
                            // onChange={changeEventHandler}
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
                            type="password"
                            placeholder="Password"
                            name="password"
                            // value={input.password}
                            // onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {/* {errors && (
                            <span className="text-xs text-red-500">{errors.password}</span>
                        )} */}
                    </div>
                </div>
                <div className="mb-5">
                    {/* {loading ? (
                        <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : ( */}
                        <Button
                            type="submit"
                            className="w-full bg-green hover:bg-hoverGreen"
                        >
                            Login
                        </Button>
                    {/* )} */}
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
                    {/* <Link to="/signup" className="text-blue-500">
                        Signup
                    </Link> */}
                </p>
            </form>
        </div>
    )
}

export default Login