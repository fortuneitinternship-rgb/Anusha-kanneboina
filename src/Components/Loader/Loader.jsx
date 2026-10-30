
import "./Loader.css";

function Loader({ message = "Loading..." }) {
  return (
    <div
      className="recy-loader"
      role="status"
      aria-live="polite"
    >
      <span className="recy-loader__spinner" aria-hidden="true"></span>
      <p>{message}</p>
    </div>
  );
}

export default Loader;
