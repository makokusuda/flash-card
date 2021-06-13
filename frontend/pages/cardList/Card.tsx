import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { CardInfo } from "@/utils/interface";
import Modal from "@/pages/common/Modal";

const Card = (props: { card: CardInfo; setUpdated: any; updated: boolean }) => {
  const { card, setUpdated, updated } = props;
  const [modal, setModal] = useState(false);
  const [windowOffset, setWindowOffset] = useState(0);

  useEffect(() => {
    setWindowOffset(window.scrollY);
    if (modal) {
      document.body.setAttribute(
        "style",
        `position: fixed; top: -${window.scrollY}px; left: 0; right: 0`
      );
    } else {
      document.body.setAttribute(
        "style",
        `position: static; top: 0; left: auto; right: auto`
      );
      window.scrollTo(0, windowOffset);
    }
  }, [modal]);

  return (
    <CardContainer>
      {card.image ? (
        <Image src={`http://localhost:3000/${card.image}`} />
      ) : (
        <DummyImage></DummyImage>
      )}
      <div>
        <div>{card.front}</div>
        <div>{card.back}</div>
      </div>
      <ButtonArea>
        <div onClick={() => setModal(true)}>Delete</div>
        <Link to={`/edit-card/${card.id}`}>
          <div>Edit</div>
        </Link>
      </ButtonArea>
      <Modal
        id={card.id}
        modal={modal}
        setModal={setModal}
        setUpdated={setUpdated}
        updated={updated}
      />
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 200px;
  border: 1px solid #ddd;
  margin: 10px;
  position: relative;
`;

const Image = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  margin: 0 20px;
`;

const DummyImage = styled.div`
  width: 200px;
  height: 150px;
  object-fit: cover;
  margin: 0 20px;
`;

const ButtonArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
