import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Images from "../utils/Images";

axios.defaults.baseURL = "http://localhost:3000";

const HelloWorld = () => {
  const [cards, setCards] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const fileInput = useRef(null);

  useEffect(() => {
    const getCards = async () => {
      const cardsInfo = await axios.get("/api/cards");
      setCards(cardsInfo.data);
    };
    getCards();
  }, []);

  const postCard = async () => {
    const fileInfo = fileInput.current.files[0];
    if (fileInfo) {
      const fileExtension = fileInfo.type.split("/")[1];
      const reader = new FileReader();
      reader.readAsDataURL(fileInfo);
      reader.onload = async () => {
        await axios.post("/api/cards", {
          front: front,
          back: back,
          image: String(reader.result).split(",")[1],
          image_extension: fileExtension,
          file_name: fileInfo.name,
        });
      };
    }
  };

  return (
    <div>
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
      {cards.map((card, index) => {
        return (
          <div key={index}>
            <div>{card.front}</div>
            <div>{card.back}</div>
            {card.image && <img src={`http://localhost:3000/${card.image}`} />}
          </div>
        );
      })}
    </div>
  );
};

export default HelloWorld;
