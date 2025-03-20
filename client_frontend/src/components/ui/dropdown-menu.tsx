import React, { useState } from "react";

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

export const DropdownMenuTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => {
    return <div className="cursor-pointer">{children}</div>;
  };  

export const DropdownMenuContent: React.FC<{ children: React.ReactNode; align?: string }> = ({ children }) => {
  return <div className="absolute right-0 bg-white dark:bg-gray-800 shadow-md rounded p-2">{children}</div>;
};

export const DropdownMenuItem: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  return (
    <div className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClick}>
      {children}
    </div>
  );
};
