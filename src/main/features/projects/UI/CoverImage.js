import { message } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { CameraOutlined } from '@ant-design/icons';
import './style.css';
const imageMimeType = /image\/(png|jpg|jpeg)/i;

function CoverImage(props) {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const imageUploadHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      message.error('Image Type is not valid');
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    console.log('file', file);
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
    // <div className="h-[400px]">
    //   {}
    //   <img
    //     className="h-full object-cover w-full rounded-xl z-0"
    //     src={props.image}
    //     alt="cover photo"
    //   />
    // </div>
    <div class="h-[400px] coverImgWrapper">
      {fileDataURL ? (
        <img
          src={fileDataURL}
          alt="avatar"
          loading="lazy"
          className="h-full object-cover w-full rounded-xl z-0"
        />
      ) : (
        <img
          src={props.image}
          alt="avatar"
          loading="lazy"
          className="h-full object-cover w-full rounded-xl z-0"
        />
      )}
      <div class="profilepic__content">
        <span class="profilepic__icon">
          <CameraOutlined className="uploadIcon" />
        </span>
        <input
          type="file"
          accept="image/*"
          className="imageUpload w-100 h-100"
          onChange={imageUploadHandler}
        />
      </div>
    </div>
  );
}

export default CoverImage;
