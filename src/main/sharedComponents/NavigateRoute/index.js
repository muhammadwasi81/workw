import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import propTypes from "prop-types";

const PopupModalOrLink = (path, isModalOpen, setIsModalOpen) => {
  console.log(path, isModalOpen, setIsModalOpen);
  const navigate = useNavigate();
  if (isModalOpen) {
    return (
      <Modal
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat id
        culpa corporis! Odio maxime veritatis ut ratione molestias, eveniet
        quidem blanditiis? Distinctio incidunt maxime sed, corrupti eum magnam
        amet at.
      </Modal>
    );
  } else {
    navigate(path);
  }
};

PopupModalOrLink.propTypes = {
  path: propTypes.string,
  isModalOpen: propTypes.bool,
  setIsModalOpen: propTypes.func,
};

export default PopupModalOrLink;
