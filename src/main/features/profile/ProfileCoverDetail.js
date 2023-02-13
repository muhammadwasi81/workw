import { useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { message, Rate, Skeleton } from 'antd';
import WhiteCard from '../projects/UI/WhiteCard';
import profile from '../../../content/profile.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRatingAction,
  getEmployeeByIdAction,
  updateUserProfileImgAction,
} from './store/action';
import { Link } from 'react-router-dom';
import './styles/profileStyle.css';
import { CameraOutlined } from '@ant-design/icons';
import { STRINGS } from '../../../utils/base';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ProfileCoverDetail = ({ id }) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [rating, setRating] = useState(3);

  const imageUploadHandler = (e) => {
    const fileObj = e.target.files[0];
    if (!fileObj.type.match(imageMimeType)) {
      return message.error(`Image type is not valid`);
    }
    const payload = {
      id: STRINGS.DEFAULTS.guid,
      file: fileObj,
    };
    console.log('payload', payload);
    dispatch(updateUserProfileImgAction(payload));
    setFile(fileObj);
    console.log('file', fileObj);
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

  const dispatch = useDispatch();
  const { employees, loader } = useSelector(
    (state) => state.employeeProfileSlice
  );

  useEffect(() => {
    dispatch(getEmployeeByIdAction(id));
  }, [id]);

  const handleRating = (value) => {
    const payload = {
      ratingAssign: value,
      userId: id,
      id: id
    }
    dispatch(addRatingAction(payload))
  }

  return (
    <WhiteCard className={'z-10 sticky top-0 w-full mt-[-87px] shadow-md'}>
      <div className="flex w-full justify-between text-base items-center h-[80px]">
        <div className="flex gap-2 items-center px-10">
          {loader ? (
            <Skeleton avatar paragraph={{ rows: 4 }} />
          ) : (
            <>
              <div className="profilepic border-4 border-white rounded-lg overflow-hidden -top-8 relative z-50">
                {fileDataURL ? (
                  <img
                    src={fileDataURL}
                    alt="avatar"
                    loading="lazy"
                    className="userImg border-4"
                  />
                ) : (
                  <img
                    src={employees?.image ? employees?.image : profile}
                    alt="avatar"
                    loading="lazy"
                    className="userImg border-4"
                  />
                )}
                <div className="profilepic__content">
                  <span className="profilepic__icon">
                    <CameraOutlined className="uploadIcon" />
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="imageUpload"
                    onChange={imageUploadHandler}
                  />
                </div>
              </div>

              <div className="flex flex-col text-base">
                <span className="text-black text-xl font-extrabold">
                  {`${employees?.firstName} ${employees?.lastName}`}
                </span>
                <span className="text-gray-500 text-sm font-bold flex items-center gap-1">
                  {employees?.designation || 'No Designation'}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="text-black text-base font-bold flex items-center gap-5">
          <Rate 
            allowHalf 
            defaultValue={rating}
            onChange={(value) => handleRating(value)} 
          />
          <Link to="/settings">
            <SettingOutlined className="text-xl !text-primary-color cursor-pointer" />
          </Link>
        </div>
      </div>
    </WhiteCard>
  );
};

export default ProfileCoverDetail;
