import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale);

export default function ResultChart({ confidence }) {
  const value = confidence * 100;

  return (
    <div className="mt-4">
      <Bar data={{
        labels: ["Confidence"],
        datasets: [{ label: "Score", data: [value] }]
      }} />

      <Doughnut data={{
        labels: ["Real/Fake Confidence", "Remaining"],
        datasets: [{ data: [value, 100 - value] }]
      }} />
    </div>
  );
}