import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/#/dashboard";
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-6">
      <div className="w-full max-w-5xl card-soft grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="bg-[#F5F6FA] p-14 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
              G
            </div>
            <h1 className="text-4xl font-bold text-[#1F2937]">GigFlow</h1>
          </div>

          <h2 className="text-xl font-bold mb-4">Manage Your Company With:</h2>

          <ul className="space-y-4 text-[#6B7280] font-medium">
            <li>✓ Smart lead management</li>
            <li>✓ Sales pipeline tracking</li>
            <li>✓ Role-based dashboard access</li>
            <li>✓ CSV export and advanced filtering</li>
          </ul>
        </div>

        <div className="bg-white p-14 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Sign In</h2>
          <p className="text-[#6B7280] mb-8">Welcome back to GigFlow</p>

          <label className="text-sm font-semibold mb-2">Email</label>
          <input
            className="border border-gray-200 rounded-xl px-4 py-3 mb-5 outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            className="border border-gray-200 rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login} disabled={loading} className="btn-primary w-full">
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Premium CRM Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}