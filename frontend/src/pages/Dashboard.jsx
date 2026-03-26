import { useState } from "react";
import Upload from "../components/Upload";
import Result from "../components/Result";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-6"
      >
        👁️ DristiVision
      </motion.h1>

      <Upload setResult={setResult} setLoading={setLoading} />

      {loading && <Loader />}

      {result && <Result result={result} />}
    </div>
  );
}
