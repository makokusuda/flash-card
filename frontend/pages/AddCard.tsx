import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Service from "@/services/service";
import Colors from "@/utils/Colors";

const AddCard = () => {
  const history = useHistory();
  const fileInput = useRef(null);
  const [back, setBack] = useState("");
  const [fileName, setFileName] = useState("");
  const [front, setFront] = useState("");
  const [message, setMessage] = useState("");

  const postCard = async () => {
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
    <AddCardArea>
      <Title>Create New Card</Title>
      <Message>{message}</Message>
      <CardInput>
        <Heading>Front</Heading>
        <TextArea
          onChange={(e) => {
            setFront(e.target.value);
          }}
        />
      </CardInput>
      <CardInput>
        <Heading>Back</Heading>
        <TextArea
          onChange={(e) => {
            setBack(e.target.value);
          }}
        />
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
      <SubmitButton onClick={postCard}>Submit</SubmitButton>
    </AddCardArea>
  );
};

export default AddCard;

const AddCardArea = styled.div`
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
  height: 60px;
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
