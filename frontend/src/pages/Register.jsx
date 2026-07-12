import { useState } from "react";
import { registerUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await registerUser({
                username,
                email,
                password,
            });

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {
            console.log(error);
            alert("Registration Failed!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header text-center">
                            <h3>Register</h3>
                        </div>

                        <div className="card-body">

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

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
                                className="btn btn-success w-100"
                                onClick={handleRegister}
                            >
                                Register
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Register;