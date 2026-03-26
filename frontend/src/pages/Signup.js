import { useState } from "react";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await signup(data);
    alert("Account created!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white text-black p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

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
          className="w-full bg-green-500 text-white p-2 rounded">
          Signup
        </button>
      </div>
    </div>
  );
}