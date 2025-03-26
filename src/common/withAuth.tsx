"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const withAuth = (Component: React.ComponentType) => {
  const ProtectedRoute = (props: any) => {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Or a loading state while redirecting
    }

    return <Component {...props} />;
  };

  return ProtectedRoute;
};

export default withAuth;
