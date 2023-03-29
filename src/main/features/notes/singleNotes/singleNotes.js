import ReactQuill from "react-quill";
import PropTypes from "prop-types";

const CustomNotes = ({
  onChange,
  className,
  placeholder,
  defaultValue = "Description",
  modules,
  formats,
}) => {
  return (
    <ReactQuill
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
      modules={modules}
      formats={formats}
    />
  );
};

CustomNotes.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  modules: PropTypes.object,
  formats: PropTypes.object,
};

export default CustomNotes;
