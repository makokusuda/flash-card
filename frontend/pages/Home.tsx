import React, { useEffect, useState } from "react";
import Service from "@/services/service";

const Home = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const cards = await Service.getCards(1, 10);
      setCards(cards.data);
    };
    getCards();
  }, []);

  return (
    <div>
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

export default Home;
