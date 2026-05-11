import "./Alert.css";

const Alert = ({ type, message }) => {
  if (!message) return null;

  return (
    <div className={`custom-alert ${type}`}>
      {message}
    </div>
  );
};

export default Alert;