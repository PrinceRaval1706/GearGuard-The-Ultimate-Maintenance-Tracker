import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EquipmentPage from "./pages/EquipmentPage";
import RequestsPage from "./pages/RequestsPage";
import TeamsPage from "./pages/TeamsPage";
import CalendarPage from "./pages/CalendarPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="system"
        storageKey="gearguard-theme"
        attribute="class"
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
  <Routes>

    {/* Public Route */}
    <Route path="/" element={<LoginPage />} />

    {/* Protected Routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/equipment"
      element={
        <ProtectedRoute>
          <MainLayout>
            <EquipmentPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/requests"
      element={
        <ProtectedRoute>
          <MainLayout>
            <RequestsPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/teams"
      element={
        <ProtectedRoute>
          <MainLayout>
            <TeamsPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/calendar"
      element={
        <ProtectedRoute>
          <MainLayout>
            <CalendarPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/reports"
      element={
        <ProtectedRoute>
          <MainLayout>
            <ReportsPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    {/* Redirect root */}
    {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

    {/* 404 */}
    <Route path="*" element={<NotFound />} />

  </Routes>
</BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
