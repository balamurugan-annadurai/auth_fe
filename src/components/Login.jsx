import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { toast } from "react-toastify";

const Login = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Invalid email")
                .required("Email is required"),
            password: yup
                .string()
                .required("Password is required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("/login", values);
                toast.success(response.data.message);
                localStorage.setItem("isLoggedIn", "true");
                setIsLoggedIn(true);
                formik.resetForm();
                navigate("/");
            } catch (error) {
                toast.error(error.response?.data?.message || "Login Failed");
            }
        }
    });

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h2 className="auth-title">
                    Login
                </h2>

                <p className="auth-subtitle">
                    Welcome Back
                </p>

                <form onSubmit={formik.handleSubmit}>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...formik.getFieldProps("email")}
                        />
                        {
                            formik.touched.email && formik.errors.email &&
                            <div className="error"> {formik.errors.email} </div>
                        }
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...formik.getFieldProps("password")}
                        />
                        {
                            formik.touched.password && formik.errors.password &&
                            <div className="error"> {formik.errors.password}</div>
                        }
                    </div>

                    <button className="submit-btn" type="submit"> Login</button>
                </form>

                <p className="bottom-text"> Don't have an account?{" "}
                    <Link to="/register">
                        <span>Register</span>
                    </Link>
                </p>

                <p className="bottom-text">
                    <Link to="/forgot-password">
                        <span>Forgot Password?</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;