import "./errorPage.scss";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="errorPage">
      <div className="error-page">
        <p>
          ERROR 404
          <br />
          Page Not Found
        </p>
        <Link className="link" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
