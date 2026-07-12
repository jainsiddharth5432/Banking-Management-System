import { useState } from "react";
import { loginUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {

            const response = await loginUser({
                email,
                password,
            });

// Save Token
            localStorage.setItem("token", response.data.token);

// Save Role
            localStorage.setItem("role", response.data.role);

            alert("Login Successful!");

// Redirect according to role
            if (response.data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        }
        catch (error) {
            console.log(error);
            console.log(error.response);

            alert(error.response?.data || error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header text-center">
                            <h3>Login</h3>
                        </div>

                        <div className="card-body">

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                className="btn btn-primary w-100"
                                onClick={handleLogin}
                            >
                                Login
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;