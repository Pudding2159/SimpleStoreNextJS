"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login({ email, password: pass });
    if (ok) {
      router.push("/");
    } else {
      setError("Nesprávny email alebo heslo");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
      

      <main className="flex-grow flex flex-col items-center justify-center px-4 ">
        <div className="w-full py-4 px-6 flex justify-center items-center max-w-lg">
          <img
            src="../image/logo-test.png"
            alt="Logo"
            className="h-20 w-auto cursor-pointer"
          />
         
        </div>
        <div className="bg-white w-full max-w-lg p-6 rounded border border-blue-300 shadow-xl">
          <h2 className="text-2xl font-bold text-[#5E60CE] mb-4">User login</h2>
          {error && <p className="text-[#5E60CE] mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                // type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black px-3 py-2 w-full focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="border border-black px-3 py-2 w-full focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#5E60CE] hover:bg-blue-700 text-white py-3 font-semibold transition rounded"
            >
              SIGN UP
            </button>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">New customers</h3>
            <p className="text-sm">
              If you don't have an account with us yet, you can{' '}
              <a href="/register" className="text-blue-600 bg-blue-200 rounded-3xl px-2 hover:underline">
                create an account here
              </a>

            </p>
          </div>
        </div>
      </main>

   
    </div>
  );
}
