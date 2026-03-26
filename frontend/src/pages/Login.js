import { useState } from "react";
import { login } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <motion.div className="flex items-center justify-center h-screen"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      
      <div className="bg-white text-black p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          onChange={e => setData({...data, username: e.target.value})}
        />

        <input type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          onChange={e => setData({...data, password: e.target.value})}
        />

        <button onClick={handleSubmit}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-800">
          Login
        </button>

        <p className="mt-3 text-sm text-center">
          No account? <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
      </div>
    </motion.div>
  );
}