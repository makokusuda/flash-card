import React, { useState } from "react";

import uploadCard from "@/utils/uploadCard";
import UploadImage from "@/pages/common/UploadImage";

const AddCard = () => {
  const [back, setBack] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [front, setFront] = useState("");

  const postCard = async () => {
    await uploadCard(file, front, back, undefined, "post");
  };

  return (
    <div>
      This is add page
      <div>
        <input
          onChange={(e) => {
            setFront(e.target.value);
          }}
        />
        <input
          onChange={(e) => {
            setBack(e.target.value);
          }}
        />
        <UploadImage
          fileName={fileName}
          setFile={setFile}
          setFileName={setFileName}
          submitCard={postCard}
        />
      </div>
    </div>
  );
};

export default AddCard;
