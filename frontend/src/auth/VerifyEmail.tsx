import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [val, setVal] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<any>([]);
    const navigate = useNavigate();

    const handleChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...val];
            newOtp[index] = value;
            setVal(newOtp);
            if (value !== "" && index < 5) {
                inputRef.current[index + 1].focus();
            }
        }
        
    }


    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !val[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    useEffect(()=>{
        inputRef.current[0].focus();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl text-hoverGreen">Verify your email</h1>
                    <p className="text-sm text-gray-600">
                        Enter the 6 digit code sent to your email address
                    </p>
                </div>
                <form action="">
                    <div className="flex justify-between">
                        {
                            val.map((letter: string, index: number) => {
                                return (
                                    <Input
                                        key={index}
                                        ref={(element) => inputRef.current[index] = element}
                                        type="text"
                                        value={letter}
                                        className="md:h-12 md:w-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-semibold rounded-lg focus-outline-none focus-ring-2 focus:ring-indigo-500"
                                        maxLength={1}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                            handleKeyDown(index, e)
                                        }
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