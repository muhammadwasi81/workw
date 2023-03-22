import { useState, useEffect } from "react";
import { message } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import "./style.css";
import { updateUserCoverImgAction } from "../../profile/store/action";
import { useDispatch } from "react-redux";
import { STRINGS } from "../../../../utils/base";
import { useSelector } from "react-redux";
import coverImage from "../../../../content/default-cover.png";
import { useParams } from "react-router-dom";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ProfileCover = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const param = useParams();
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const { employees } = useSelector((state) => state.employeeProfileSlice);

  const imageUploadHandler = (e) => {
    const fileObj = e.target.files[0];
    if (!fileObj.type.match(imageMimeType)) {
      return message.error(`Image Type is not valid`);
    }
    const payload = {
      id: STRINGS.DEFAULTS.guid,
      file: fileObj,
    };
    console.log("payload", payload);
    dispatch(updateUserCoverImgAction(payload));
    setFile(fileObj);
    console.log("file", fileObj);
  };

  useEffect(() => {
    console.log("file", file);
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div className="h-[400px] coverImgWrapper">
      {fileDataURL ? (
        <img
          src={fileDataURL}
          alt="avatar"
          loading="lazy"
          className="h-full object-cover w-full rounded-xl z-0"
        />
      ) : (
        <img
          src={employees?.coverImage ? employees?.coverImage : coverImage}
          alt="avatar"
          loading="lazy"
          className="h-full object-cover w-full rounded-xl z-0"
        />
      )}
      {user.id === param.id && (
        <div className="profilepic__content">
          <span className="profilepic__icon">
            <CameraOutlined className="uploadIcon" />
          </span>
          <input
            type="file"
            accept="image/*"
            className="imageUpload w-100 h-100"
            onChange={imageUploadHandler}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileCover;
