import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate()
    const _login = (event) => {
        event.preventDefault();
        const username = event.target.username.value
        const email = event.target.email.value
        const login = async () => {
            try {
                const res = await fetch('http://localhost:3000/login',
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include", // Important to send cookies!
                        body: JSON.stringify({ username: username, email: email })
                    }
                );
                if (res.status == 200) {
                    navigate(0)
                }
            } catch (e) {
                console.log("error : ", e);
            }
        }
        login()

    }
    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#2b2d42] text-white">
            <form onSubmit={_login} className="w-1/2 bg-[#4a4e69] rounded-md p-4">
                <div className="mb-4 flex flex-col gap-y-2">
                    <label htmlFor="Username" className="font-semibold">Username</label>
                    <input className="text-sm outline-none border-solid border-[1px] border-gray-100 p-2 rounded-md" type="text" name="username" id="username" placeholder="Username" required />
                </div>
                <div className="my-2 flex flex-col gap-y-2">
                    <label htmlFor="Email" className="font-semibold">Email</label>
                    <input className="text-sm outline-none border-solid border-[1px] border-slate-100 p-2 rounded-md" type="text" name="email" id="email" placeholder="Email" required />
                </div>
                <div className="my-4">
                    <button type="submit" className="rounded-md cursor-pointer text-white bg-[#7b2cbf] px-8 py-1">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
