import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { toast } from "react-toastify";

const Register = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .required("Name is required"),
            email: yup
                .string()
                .email("Invalid email")
                .required("Email is required"),
            password: yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("/register", values);
                toast.success(response.data.message);
                localStorage.setItem("isLoggedIn", "true");
                setIsLoggedIn(true);
                formik.resetForm();
                navigate("/");
            } catch (error) {
                toast.error(error.response?.data?.message || "Registration Failed");
            }
        }
    });

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h2 className="auth-title">
                    Register
                </h2>

                <p className="auth-subtitle">
                    Create your account
                </p>

                <form onSubmit={formik.handleSubmit}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            {...formik.getFieldProps("name")}
                        />

                        {
                            formik.touched.name &&
                            formik.errors.name &&

                            <div className="error">
                                {formik.errors.name}
                            </div>
                        }

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...formik.getFieldProps("email")}
                        />

                        {
                            formik.touched.email &&
                            formik.errors.email &&

                            <div className="error">
                                {formik.errors.email}
                            </div>
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
                            formik.touched.password &&
                            formik.errors.password &&

                            <div className="error">
                                {formik.errors.password}
                            </div>
                        }

                    </div>

                    <button
                        className="submit-btn"
                        type="submit"
                    >
                        Register
                    </button>

                </form>

                <p className="bottom-text">

                    Already have an account?{" "}

                    <Link to="/login">
                        <span>Login</span>
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Register;