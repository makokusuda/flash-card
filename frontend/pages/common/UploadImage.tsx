import React, { useRef } from "react";

const UploadImage = (props: {
  fileName: string;
  setFile: any;
  setFileName: any;
  submitCard: any;
}) => {
  const { fileName, setFile, setFileName, submitCard } = props;

  const fileInput = useRef(null);
  const removeFile = () => {
    fileInput.current.value = "";
    setFileName("");
  };

  const onChangeFile = (e) => {
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={onChangeFile}
      />
      <div onClick={() => fileInput.current.click()}>UPLOAD</div>
      <div>{fileName}</div>
      <div
        onClick={removeFile}
        style={{ display: fileName ? "block" : "none" }}
      >
        Remove file
      </div>
      <div onClick={submitCard}>Submit</div>
    </>
  );
};

export default UploadImage;
