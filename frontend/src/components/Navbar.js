import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <h1 className="font-bold">DristiVision</h1>
      <Link to="/">Logout</Link>
    </div>
  );
}