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

export { modules, formats };
