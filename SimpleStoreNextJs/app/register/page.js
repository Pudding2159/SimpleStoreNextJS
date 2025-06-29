"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ firstName, lastName, email, password: pass });
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">

    

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full py-4 px-6 flex justify-center items-center max-w-lg">
          <img
            src="../image/logo-test.png"
            alt="GymBeam Logo"
            className="h-20 w-auto cursor-pointer"
          />
          
        </div>

        <div className="bg-white w-full max-w-lg p-6 rounded border border-blue-300 shadow-xl">
          <h2 className="text-xl font-bold text-[#5E60CE] mb-4">User registration</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-black px-3 py-2 w-full focus:outline-none"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-black px-3 py-2 w-full focus:outline-none"
                placeholder="Last name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black px-3 py-2 w-full focus:outline-none"
                placeholder="E-mail"
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
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#5E60CE] hover:bg-blue-700 text-white py-3 font-semibold rounded transition"
            >
              REGISTER
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-[#5E60CE] hover:underline border bg-blue-100 rounded-3xl px-2">
               Sign in
            </a>
          </div>
        </div>
      </main>

      
    </div>
  );
}
