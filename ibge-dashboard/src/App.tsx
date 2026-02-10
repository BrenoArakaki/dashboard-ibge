import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import { Navbar } from "./components/ui/navbar";
import Dashboard from "./pages/Dashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Maps } from "./pages/Maps";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<Maps />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
