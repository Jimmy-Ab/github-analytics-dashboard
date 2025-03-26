"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/useSettingsStore";

const Dashboard = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { theme } = useSettingsStore();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className={`flex min-h-screen bg-gray-50 dark:bg-gray-800 ${theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;