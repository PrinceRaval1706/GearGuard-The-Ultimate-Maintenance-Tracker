// import React from "react";
// import { AppSidebar } from "./AppSidebar";

// type Props = {
//   children: React.ReactNode;
// };

// export default function MainLayout({ children }: Props) {
//   return (
//     <div className="flex min-h-screen">
//       <AppSidebar />
//       <main className="flex-1 overflow-y-auto p-6">
//         {children}
//       </main>
//     </div>
//   );
// }

import { ReactNode } from "react";
// import AppSidebar from "./AppSidebar";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64">
        <AppSidebar />
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
