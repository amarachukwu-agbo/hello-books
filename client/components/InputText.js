const inputText = ({
  input, label, type, icon, meta: { touched, error },
}) => (
    <div>
        <i className="material-icons prefix">{ icon }</i>
        <label className = "flow-text truncate"> { label } </label>
        <input className = "inputText" {...input} type={type} />
        {touched && error && <span className = "error flow-text"> {error}</span>}
    </div>
);

export default inputText;

