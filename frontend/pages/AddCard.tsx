import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Service from "@/services/service";

const AddCard = () => {
  const history = useHistory();
  const fileInput = useRef(null);
  const [back, setBack] = useState("");
  const [fileName, setFileName] = useState("");
  const [front, setFront] = useState("");

  const postCard = async () => {
    const file = fileInput.current.files[0];
    if (file) {
      // when file is uploaded
      const image_extension = file.type.split("/")[1];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const image = String(reader.result).split(",")[1];
        await Service.postCard({
          front,
          back,
          image,
          image_extension,
          file_name: file.name,
        });
      };
    } else {
      await Service.postCard({
        front,
        back,
      });
    }

    window.setTimeout(() => {
      history.push("/");
    }, 300);
  };

  const removeFile = () => {
    fileInput.current.value = "";
    setFileName("");
  };

  const onChangeFile = (e) => {
    setFileName(e.target.files[0].name);
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
        <div onClick={postCard}>Submit</div>
      </div>
    </div>
  );
};

export default AddCard;
