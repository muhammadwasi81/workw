import { Dropdown, Image, Menu, Space } from 'antd';
import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  closeStickyNote,
  handleOpenSticky,
  targetStickyDescription,
  targetTitleVal,
} from '../newStickyNotes/store/stickySlice';
import {
  CopyOutlined,
  CloseOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import StickyColor from '../newStickyNotes/view/components/StickyColor';
import {
  deleteStickyAction,
  getStickyAttachmentAction,
  getStickyNoteDescAction,
  getStickyNoteTitleAction,
} from '../newStickyNotes/store/actions';
import ShareComponent from '../newStickyNotes/view/components/ShareComponent';
import { createGuid } from '../../../../utils/base';
import useDebounce from '../../../../utils/Shared/helper/use-debounce';
import { useEffect } from 'react';

const SingleNotes = ({ item }) => {
  const dispatch = useDispatch();
  const [openColor, setOpenColor] = useState(true);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [openShare, setOpenShare] = useState(false);
  const tilteDebounce = useDebounce(title, 500);
  const descriptionDebounce = useDebounce(description, 500);

  const { openSticky } = useSelector((state) => {
    return state.stickySlice;
  });

  const openNewStickyHandler = () => {
    dispatch(handleOpenSticky(item.id));
  };

  const setTitleValue = (value) => {
    const id = item.id;
    dispatch(targetTitleVal({ id, value }));
    dispatch(
      getStickyNoteTitleAction({ ...item, attachments: [], title: value })
    );
  };

  const setDescriptionValue = (value) => {
    const id = item.id;
    dispatch(targetStickyDescription({ id, value }));
    console.log(value, 'description');
    dispatch(
      getStickyNoteDescAction({ ...item, attachments: [], description: value })
    );
  };

  useEffect(() => {
    if (tilteDebounce) setTitleValue(tilteDebounce);
  }, [tilteDebounce]);

  useEffect(() => {
    if (descriptionDebounce) setDescriptionValue(descriptionDebounce);
  }, [descriptionDebounce]);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [],
    ],
  };
  const formats = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ direction: 'rtl' }],
      [{ align: ['center'] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };
  const imgSrc = item.attachments;

  const openShareHandler = () => {
    console.log(' share');
    setOpenShare((openShare) => !openShare);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.description);
  };
  const closeStickyNotes = () => {
    dispatch(closeStickyNote(item.id));
  };

  const deleteStickyNotes = () => {
    dispatch(deleteStickyAction(item.id));
  };

  const uploadImageHandler = (e) => {
    const image = e.target.files[0];
    const id = item.id;
    dispatch(
      getStickyAttachmentAction({
        attachments: [{ file: image, id: createGuid() }],
        id,
        description: item.description,
        title: item.title,
        color: item.colorCode,
      })
    );
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div onClick={openShareHandler}>
              <ShareAltOutlined />
              <a className="drop-downList">Share</a>
            </div>
          ),
          key: '0',
        },
        {
          label: (
            <div onClick={copyToClipboard}>
              <CopyOutlined />
              <a className="drop-downList">Copy</a>
            </div>
          ),
          key: '1',
        },
        {
          label: <div>{openColor && <StickyColor item={item} />}</div>,
          key: '2',
        },
      ]}
    />
  );
  return (
    <div
      className="stickyNote_container"
      onClick={openNewStickyHandler}
      // style={{
      //   position: 'absolute',
      //   zIndex: item.id === openSticky ? 3 : 2,
      // }}
    >
      {/* <div
        className="stickyNote_header handle"
        style={{ backgroundColor: item.colorCode }}
      >
        <input
          placeholder={'ddsdsdsdsdsdsd'}
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={item.title}
          style={{ backgroundColor: item.colorCode }}
          className="sticky_titleContainer"
        />

        <div className="leftNote_Icon">
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <EllipsisOutlined className="threedot_Icon" />
              </Space>
            </a>
          </Dropdown>
          <DeleteOutlined onClick={deleteStickyNotes} className="margin_Icon" />
          <CloseOutlined onClick={closeStickyNotes} className="margin_Icon" />
        </div>
      </div> */}

      {openShare && (
        <ShareComponent item={item} handleClose={() => setOpenShare(false)} />
      )}
      <div className="textArea_container">
        <ReactQuill
          onChange={(value) => setDescription(value)}
          modules={modules}
          formats={formats}
          className={'stickyNoteItem-textarea'}
          placeholder={'dsdsdsdsdsd'}
          defaultValue={item.description}
        />
        {/* 
        <div className="img-input-container">
          <PictureOutlined className="image_icon text-[20px]" />
          <input
            type="file"
            onChange={uploadImageHandler}
            className="img-input"
          />
        </div> */}
      </div>
      {imgSrc.length > 0 ? (
        <div className="image_body">
          {imgSrc.map((item) => {
            return (
              <Image
                key={item.id}
                preview={true}
                src={item.path}
                className="image"
              />
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SingleNotes;
