import { useState } from "react";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Result from "./components/Result";
import Loader from "./components/Loader";
import { motion } from "framer-motion";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white">
      
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-10 px-4">
        
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-6 text-center"
        >
          👁️ DristiVision
        </motion.h1>

        <p className="mb-6 text-center opacity-80">
          AI Powered Real vs Fake Face Detection
        </p>

        <Upload setResult={setResult} setLoading={setLoading} />

        {loading && <Loader />}

        {result && <Result result={result} />}

      </div>
    </div>
  );
}

export default App;
