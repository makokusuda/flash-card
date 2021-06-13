import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Service from "@/services/service";
import uploadCard from "@/utils/uploadCard";
import UploadImage from "@/pages/common/UploadImage";

const EditCard = () => {
  const { id } = useParams();

  const [file, setFile] = useState();
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
    await uploadCard(file, front, back, id, "put");
  };

  return (
    <div>
      this is edit page
      <div>{id}</div>
      <input value={front} onChange={(e) => setFront(e.target.value)} />
      <input value={back} onChange={(e) => setBack(e.target.value)} />
      <UploadImage
        fileName={fileName}
        setFile={setFile}
        setFileName={setFileName}
        submitCard={putCard}
      />
    </div>
  );
};

export default EditCard;
