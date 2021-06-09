import React, { useState, useRef } from "react";
import Service from "@/services/service";

const AddCard = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const fileInput = useRef(null);

  const postCard = async () => {
    const fileInfo = fileInput.current.files[0];
    if (fileInfo) {
      const fileExtension = fileInfo.type.split("/")[1];
      const reader = new FileReader();
      reader.readAsDataURL(fileInfo);
      reader.onload = async () => {
        const image = String(reader.result).split(",")[1];
        await Service.postCard(
          front,
          back,
          image,
          fileExtension,
          fileInfo.name
        );
      };
    }
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
        <input ref={fileInput} type="file" />
        <button onClick={postCard}>Submit</button>
      </div>
    </div>
  );
};

export default AddCard;
