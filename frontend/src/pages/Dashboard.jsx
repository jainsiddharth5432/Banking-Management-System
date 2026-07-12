import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
        }

    }, [navigate]);

    return (
        <div className="container mt-5">

            <h2>Welcome to Dashboard</h2>

        </div>
    );
}

export default Dashboard;