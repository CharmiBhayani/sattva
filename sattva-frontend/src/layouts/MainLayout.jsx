import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import lotusBg from "../assets/lotusbg.png";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-sattvaBrown text-white relative overflow-hidden">
      
      {/* Watermark Lotus */}
      <img
        src={lotusBg}
        alt=""
        className="absolute right-[-120px] bottom-[-80px] w-[700px] opacity-5 pointer-events-none select-none"
      />

      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
