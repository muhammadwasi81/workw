const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    //[{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ direction: "rtl" }],
    [{ align: ["center"] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    //[{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ direction: "rtl" }],
    [{ align: ["center"] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};
const meetingDuration = [
  { label: "15 min", value: "15 minutes" },
  { label: "30 min", value: "30 minutes" },
  { label: "45 min", value: "45 minutes" },
  { label: "60 min", value: "60 minutes" },
  // { label: '02 hr', value: '2 hours' },
];
const travelDuration = [
  { label: "0 min", value: 0 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
];
const preparationDuration = [
  { label: "0 min", value: 0 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
];

export {
  modules,
  formats,
  meetingDuration,
  travelDuration,
  preparationDuration,
};
