import { useState } from "react";
import Upload from "../components/Upload";
import ResultChart from "../components/ResultChart";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <div>
      <Navbar />

      <motion.div className="p-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}>
        
        <h1 className="text-4xl font-bold mb-6">DristiVision</h1>

        <Upload setResult={setResult} />

        {result && (
          <div className="mt-6 bg-white text-black p-5 rounded-xl">
            <h2 className="text-xl font-bold">
              Prediction: {result.prediction}
            </h2>

            <ResultChart confidence={result.confidence} />
          </div>
        )}
      </motion.div>
    </div>
  );
}