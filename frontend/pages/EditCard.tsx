import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import Service from "@/services/service";
import Colors from "@/utils/Colors";

const EditCard = () => {
  const history = useHistory();
  const { id } = useParams();
  const fileInput = useRef(null);
  const [changeFile, setChangeFile] = useState(false);
  const [back, setBack] = useState("");
  const [fileName, setFileName] = useState("");
  const [front, setFront] = useState("");
  const [message, setMessage] = useState("");

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
    if (!front || !back) return setMessage("Front and Back are mandatory!");
    if (front.length > 50 || back.length > 50)
      return setMessage("Front and Back should be less than 50 characters");
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
    <EditCardArea>
      <Title>Edit Card</Title>
      <Message>{message}</Message>
      <CardInput>
        <Heading>Front</Heading>
        <TextArea value={front} onChange={(e) => setFront(e.target.value)} />
      </CardInput>
      <CardInput>
        <Heading>Back</Heading>
        <TextArea value={back} onChange={(e) => setBack(e.target.value)} />
      </CardInput>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={onChangeFile}
      />
      <UploadArea>
        <FileName>{fileName}</FileName>
        <UploadImage onClick={() => fileInput.current.click()}>
          Add Photo
        </UploadImage>
        {fileName && (
          <UploadImage onClick={removeFile}>Remove Photo</UploadImage>
        )}
      </UploadArea>
      <SubmitButton onClick={putCard}>Submit</SubmitButton>
    </EditCardArea>
  );
};

export default EditCard;

const EditCardArea = styled.div`
  text-align: center;
  @media screen and (max-width: 480px) {
    padding: 0 10px;
  }
`;

const Title = styled.div`
  font-size: 30px;
  margin: 20px 0;
`;

const Message = styled.div`
  color: ${Colors.Red};
  text-align: left;
  margin: 0 auto;
  width: 400px;
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;

const CardInput = styled.div``;

const Heading = styled.div`
  width: 400px;
  text-align: left;
  margin: 20px auto 10px;
  font-size: 20px;
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;

const TextArea = styled.textarea`
  resize: none;
  width: 400px;
  height: 100px;
  border: 1px solid ${Colors.Gray};
  border-radius: 4px;
  font-size: 16px;
  @media screen and (max-width: 480px) {
    width: 95%;
  }
`;

const UploadArea = styled.div`
  width: 400px;
  text-align: left;
  margin: 20px auto 10px;
`;

const FileName = styled.div`
  margin: 10px 0;
`;

const UploadImage = styled.div`
  border: 1px solid ${Colors.Gray};
  border-radius: 4px;
  font-size: 20px;
  padding: 5px 10px;
  margin: 3px;
  display: inline-block;
`;

const SubmitButton = styled.div`
  padding: 5px 10px;
  margin: 3px;
  width: 400px;
  margin: 0 auto;
  border: 1px solid ${Colors.Gray};
  border-radius: 4px;
  color: ${Colors.White};
  font-weight: bold;
  font-size: 20px;
  background-color: ${Colors.PrimaryBlue};
  @media screen and (max-width: 480px) {
    width: 95%;
  }
`;
