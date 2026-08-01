import { Link } from "react-router-dom";

import {
    toast,
    Slide
} from "react-toastify";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);

        toast.success(
            "Logged out successfully.",
            {
                position: "top-right",
                autoClose: 3000,
                transition: Slide
            }
        );
    };

    return (
        <>

            <nav className="navbar">

                <h2 className="logo">
                    Demo
                </h2>

                <div className="nav-links">

                    {
                        isLoggedIn ?

                            <>

                                <button className="nav-btn">
                                    Profile
                                </button>

                                <button
                                    className="nav-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            </>

                            :

                            <>

                                <Link to="/login">
                                    <button className="nav-btn">
                                        Login
                                    </button>
                                </Link>

                                <Link to="/register">
                                    <button className="nav-btn">
                                        Register
                                    </button>
                                </Link>

                            </>

                    }

                </div>

            </nav>
        </>
    );
};

export default Home;