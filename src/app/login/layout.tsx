"use client";

import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">{children}</div>
  );
};

export default LoginLayout;
