"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/useSettingsStore";

const Login = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { theme } = useSettingsStore();
  const router = useRouter();

  // Redirect to login if not authenticated

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            {children}
    </div>
  );
};

export default Login;