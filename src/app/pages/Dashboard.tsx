import { Outlet, NavLink } from "react-router";
import { Activity, FileText, AlertTriangle, Video, DollarSign } from "lucide-react";

export default function Dashboard() {
  const navItems = [
    { name: "Medical Audit", path: "/dashboard", icon: Activity, exact: true },
    { name: "Evidence", path: "/dashboard/evidence", icon: FileText },
    { name: "Risk Radar", path: "/dashboard/risk", icon: AlertTriangle },
    { name: "Creator Feed", path: "/dashboard/creator", icon: Video },
    { name: "Opportunities", path: "/dashboard/opportunities", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#10b981] flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span>SignalSource Dasboard</span>
          </div>
          <div className="hidden md:flex flex-1 justify-center items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
