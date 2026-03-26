import { useState } from "react";
import { uploadImage } from "../api";
import { motion } from "framer-motion";

export default function Upload({ setResult, setLoading }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select an image");

    try {
      setLoading(true);
      const res = await uploadImage(file);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Backend error. Check Render logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl text-center"
    >
      <input
        type="file"
        className="mb-4 text-white"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />

      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg text-white font-semibold"
      >
        Analyze Image
      </button>
    </motion.div>
  );
}
