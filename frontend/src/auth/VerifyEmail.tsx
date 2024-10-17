import { Input } from "@/components/ui/input";
import { useState } from "react"

const VerifyEmail = () => {
    const [val, setVal] = useState<string[]>(["", "", "", "", "", ""]);


    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl">Verify your email</h1>
                    <p className="text-sm text-gray-600">
                        Enter the 6 digit code sent to your email address
                    </p>
                </div>
                <form action="">
                    <div className="flex justify-between">
                        {
                            val.map((letter:string, index:number)=>{
                                return (
                                    <Input 
                                        key={index}
                                        type="text"
                                        value={letter}
                                        className="md:h-12 md:w-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus-outline-none focus-ring-2 focus:ring-indigo-500"
                                        
                                    />
                                )
                            })
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail