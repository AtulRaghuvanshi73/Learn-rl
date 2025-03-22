import React from "react";

export default function CollaborateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
