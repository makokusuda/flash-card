import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Service from "@/services/service";

const EditCard = () => {
  const history = useHistory();
  const { id } = useParams();
  const fileInput = useRef(null);
  const [changeFile, setChangeFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const getCard = async () => {
      const card = await Service.getCard(id);
      setFront(card.front);
      setBack(card.back);
      if (card.file_name) setFileName(card.file_name);
    };
    getCard();
  }, []);

  const putCard = async () => {
    const file = fileInput.current.files[0];
    if (file) {
      // when file is uploaded
      const image_extension = file.type.split("/")[1];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const image = String(reader.result).split(",")[1];
        await Service.putCard({
          front,
          back,
          image,
          image_extension,
          file_name: file.name,
          id,
          changeFile,
        });
      };
    } else {
      await Service.putCard({
        front,
        back,
        id,
        changeFile,
      });
    }

    window.setTimeout(() => {
      history.push("/");
    }, 300);
  };

  const removeFile = () => {
    fileInput.current.value = "";
    setFileName("");
    setChangeFile(true);
  };

  const onChangeFile = (e) => {
    setFileName(e.target.files[0].name);
    setChangeFile(true);
  };

  return (
    <div>
      this is edit page
      <div>{id}</div>
      <input value={front} onChange={(e) => setFront(e.target.value)} />
      <input value={back} onChange={(e) => setBack(e.target.value)} />
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
      <div onClick={putCard}>Submit</div>
    </div>
  );
};

export default EditCard;
