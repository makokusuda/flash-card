import React, { useEffect, useState } from "react";
import Service from "@/services/service";
import PageButton from "@/pages/cardList/PageButton";

interface CardInfo {
  id: number;
  front: string;
  back: string;
  count: number;
  created_at: string;
  file_name?: string;
  image?: string;
}

const Card = () => {
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSet, setCurrentPageSet] = useState(0);
  const [pageList, setPageList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const cardLimit = 2;
  const pageLimit = 3;

  const arrayChunk = (num: number, size: number): number[][] => {
    const array = Array.from({ length: num - 1 + 1 }, (_, i) => 1 + i);
    return array.reduce(
      (acc, value, index) =>
        index % size ? acc : [...acc, array.slice(index, index + size)],
      []
    );
  };

  useEffect(() => {
    const getCards = async () => {
      const cards = await Service.getCards(currentPage, cardLimit);
      const totalCard = cards.data[0].count;
      const pageNum = Math.ceil(totalCard / cardLimit);

      setTotalPage(pageNum);
      setPageList(arrayChunk(pageNum, pageLimit));
      setCards(cards.data);
    };
    getCards();
  }, [currentPage]);

  return (
    <>
      {cards.map((card, index) => {
        return (
          <div key={index}>
            <div>{card.id}</div>
            <div>{card.front}</div>
            <div>{card.back}</div>
            {card.image && <img src={`http://localhost:3000/${card.image}`} />}
          </div>
        );
      })}
      <PageButton
        currentPage={currentPage}
        currentPageSet={currentPageSet}
        pageList={pageList}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
        setCurrentPageSet={setCurrentPageSet}
      />
    </>
  );
};

export default Card;