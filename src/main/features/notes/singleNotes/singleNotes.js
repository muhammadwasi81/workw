import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

const CustomNotes = ({
  onChange,
  className,
  placeholder,
  defaultValue,
  modules,
  formats,
}) => {
  return (
    <ReactQuill
      onChange={onChange}
      modules={modules}
      formats={formats}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
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
