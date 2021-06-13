import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Card from "@/pages/cardList/Card";
import { CardInfo } from "@/utils/interface";
import PageButton from "@/pages/cardList/PageButton";
import Service from "@/services/service";

const arrayChunk = (num: number, size: number): number[][] => {
  const array = Array.from({ length: num - 1 + 1 }, (_, i) => 1 + i);
  return array.reduce(
    (acc, value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );
};

const Home = () => {
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSet, setCurrentPageSet] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [pageList, setPageList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [updated, setUpdated] = useState(false);

  const cardLimit = 5;
  const pageLimit = 3;

  useEffect(() => {
    const getCards = async () => {
      const cards = await Service.getCards(currentPage, cardLimit);
      const totalCard = cards[0].count;
      const pageNum = Math.ceil(totalCard / cardLimit);

      setCards(cards);
      setFetching(false);
      setPageList(arrayChunk(pageNum, pageLimit));
      setTotalPage(pageNum);
    };
    getCards();
    window.scrollTo(0, 0);
  }, [currentPage, updated]);

  return (
    <div>
      <CardArea>
        {fetching && <div>Loading...</div>}
        {cards.map((card, index) => {
          return (
            <div key={index}>
              <Card card={card} setUpdated={setUpdated} updated={updated} />
            </div>
          );
        })}
      </CardArea>
      <PageButton
        currentPage={currentPage}
        currentPageSet={currentPageSet}
        pageList={pageList}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
        setCurrentPageSet={setCurrentPageSet}
      />
    </div>
  );
};

export default Home;

const CardArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
`;
