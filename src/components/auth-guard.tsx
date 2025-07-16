import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireModerator?: boolean;
}

export const AuthGuard = ({ 
  children, 
  requireAuth = false,
  requireAdmin = false,
  requireModerator = false 
}: AuthGuardProps) => {
  const { user, loading, isAdmin, isModerator } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireModerator && !isModerator) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};