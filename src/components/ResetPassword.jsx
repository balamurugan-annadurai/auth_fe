import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {

    // JWT Token from URL
    const { token } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);

    // Verify Token
    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios.get("/verify-token",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setIsValidToken(true);
            } catch (error) {
                toast.error(error.response?.data?.message || "Invalid or expired token.");
                setIsValidToken(false);
            } finally {
                setLoading(false);
            }
        };
        verifyToken();
    }, [token]);

    const formik = useFormik({

        initialValues: {
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: yup.object({
            newPassword: yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .required("New Password is required"),
            confirmPassword: yup
                .string()
                .oneOf(
                    [yup.ref("newPassword")],
                    "Passwords do not match"
                )
                .required("Confirm Password is required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.put(
                    "/change-password",
                    {
                        newPassword: values.newPassword
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                toast.success(response.data.message);
                formik.resetForm();
                navigate("/login");
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Password change failed."
                );
            }
        }
    });

    // Loading Screen
    if (loading) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">
                        Verifying Link...
                    </h2>

                    <p className="auth-subtitle">
                        Please wait while we verify your password reset link.
                    </p>
                </div>
            </div>
        );
    }

    // Invalid Token Screen
    if (!isValidToken) {
        return (
            <div className="auth-page">

                <div className="auth-card">

                    <h2 className="auth-title">
                        Invalid or Expired Link
                    </h2>

                    <p className="auth-subtitle">
                        This password reset link is invalid or has expired.
                    </p>

                    <Link
                        to="/forgot-password"
                        className="submit-btn"
                    >
                        Request New Link
                    </Link>

                </div>

            </div>
        );
    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h2 className="auth-title">
                    Reset Password
                </h2>

                <p className="auth-subtitle">
                    Create a new password for your account.
                </p>

                <form onSubmit={formik.handleSubmit}>

                    <div className="form-group">

                        <label>New Password</label>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            {...formik.getFieldProps("newPassword")}
                        />

                        {
                            formik.touched.newPassword &&
                            formik.errors.newPassword &&
                            <div className="error">
                                {formik.errors.newPassword}
                            </div>
                        }

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            placeholder="Confirm password"
                            {...formik.getFieldProps("confirmPassword")}
                        />

                        {
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword &&
                            <div className="error">
                                {formik.errors.confirmPassword}
                            </div>
                        }

                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Change Password
                    </button>

                </form>

                <p className="bottom-text">

                    Back to{" "}

                    <Link to="/login">
                        <span>Login</span>
                    </Link>

                </p>

            </div>

        </div>

    );

};

export default ResetPassword;