import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Invalid email")
                .required("Email is required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("/forgot-password", values);
                toast.success(response.data.message);
                formik.resetForm();
                navigate("/");
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
    });

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h2 className="auth-title">
                    Forgot Password
                </h2>

                <p className="auth-subtitle">
                    Enter your registered email address
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
                            formik.touched.email &&
                            formik.errors.email && (
                                <div className="error">
                                    {formik.errors.email}
                                </div>
                            )
                        }

                    </div>

                    <button
                        className="submit-btn"
                        type="submit"
                    >
                        Send Reset Link
                    </button>

                </form>

                <p className="bottom-text">

                    Remember your password?{" "}

                    <Link to="/login">
                        <span>Login</span>
                    </Link>

                </p>

            </div>

        </div>

    );

};

export default ForgotPassword;