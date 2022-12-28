import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { addSticky } from '../newStickyNotes/store/actions';
import { targetStickyDescription } from '../newStickyNotes/store/stickySlice';

const SingleNotes = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const { listArray } = useSelector((state) => state.stickySlice);
  console.log(listArray, 'listArray');
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
  const descHandler = (value) => {
    setDescription(value);
    console.log(description, 'descHandler');
    listArray.map((item) => {
      console.log(item.id, 'item.id');
      dispatch(targetStickyDescription({ id: item.id, value }));
    });
    addSticky({
      attachments: [],
      description: value,
    });
  };
  return (
    <ReactQuill
      onChange={(value) => descHandler(value)}
      modules={modules}
      formats={formats}
      className={'stickyNoteItem-textarea'}
      placeholder={'please enter your notes here'}
      defaultValue={'<h2>React Quill Rich Text Editor</h2>'}
    />
  );
};

export default SingleNotes;
