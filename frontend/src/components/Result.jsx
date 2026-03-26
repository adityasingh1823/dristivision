import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Result({ result }) {
  const fake = result.confidence;
  const real = 1 - fake;

  const data = {
    labels: ["Fake", "Real"],
    datasets: [
      {
        data: [fake, real],
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-6 bg-white/20 backdrop-blur-xl p-6 rounded-xl shadow-xl w-80 text-center"
    >
      <h2 className="text-2xl font-bold">
        {result.prediction}
      </h2>

      <p className="mt-2">
        Confidence: {(result.confidence * 100).toFixed(2)}%
      </p>

      <div className="mt-4">
        <Doughnut data={data} />
      </div>
    </motion.div>
  );
}
