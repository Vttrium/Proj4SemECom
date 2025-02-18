import { NavBar } from "@/components/Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function AuthenticatedRoutes() {
    const { isAuthenticated } = useAuth(); // 🔹 Agora usa o contexto de autenticação
    const location = useLocation();

    return isAuthenticated ? (
        <>
            <NavBar />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}
