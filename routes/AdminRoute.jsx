import { Navigate, useLocation } from "react-router";
import { useAuth } from "../src/provider/AuthProvider";
import useRole from "../src/hooks/useRole";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    if (user && role === "admin") {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;