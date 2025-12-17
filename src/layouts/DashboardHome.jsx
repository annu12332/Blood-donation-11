import { useAuth } from "../provider/AuthProvider";

const DashboardHome = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.displayName}! 👋</h1>
            <p className="mt-2 text-gray-600">This is your personalized dashboard.</p>
            
        </div>
    );
};

export default DashboardHome;