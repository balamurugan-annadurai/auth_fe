import { Link } from "react-router-dom";

const NotFound = () => {
    return (

        <div className="not-found">

            <h1>404</h1>

            <p>
                Oops! The page you're looking for doesn't exist.
            </p>

            <Link to="/">
                <button className="submit-btn" style={{ width: "220px" }}>
                    Back to Home
                </button>
            </Link>

        </div>

    );
};

export default NotFound;