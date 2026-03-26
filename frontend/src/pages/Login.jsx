import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80 text-center"
      >
        <h2 className="text-2xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded text-black"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded text-black"
        />

        <button className="w-full bg-blue-500 p-2 rounded">
          Login
        </button>

        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </p>
      </motion.div>

    </div>
  );
}
