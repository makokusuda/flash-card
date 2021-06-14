import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { CardInfo } from "@/utils/interface";
import Colors from "@/utils/Colors";
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
      <ButtonArea>
        <EditButton onClick={() => setModal(true)}>Delete</EditButton>
        <Link to={`/edit-card/${card.id}`}>
          <EditButton>Edit</EditButton>
        </Link>
      </ButtonArea>
      <CardArea>
        <CardContent>
          {card.image ? (
            <Image src={`http://localhost:3000/${card.image}`} />
          ) : (
            <DummyImage></DummyImage>
          )}
          <TextArea>
            <Text>{card.front}</Text>
            <Text data-card={"back"}>{card.back}</Text>
          </TextArea>

          <Modal
            id={card.id}
            modal={modal}
            setModal={setModal}
            setUpdated={setUpdated}
            updated={updated}
          />
        </CardContent>
      </CardArea>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  width: 400px;
  height: 200px;
  margin: 10px;
  border: 1px solid ${Colors.Gray};
  border-radius: 4px;

  @media screen and (max-width: 480px) {
    width: 300px;
  }
`;

const CardArea = styled.div`
  height: 165px;
  display: flex;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  margin: 0 20px;
  width: 140px;
  height: 100px;
  object-fit: cover;

  @media screen and (max-width: 480px) {
    width: 100px;
  }
`;

const DummyImage = styled.div`
  margin: 0 20px;
  width: 140px;
  height: 100px;
  object-fit: cover;
  background-color: ${Colors.BackGroundBlue};

  @media screen and (max-width: 480px) {
    width: 100px;
  }
`;

const TextArea = styled.div`
  max-width: 220px;
  @media screen and (max-width: 480px) {
    width: 160px;
    font-size: 14px;
  }
`;

const Text = styled.div`
  overflow-wrap: break-word;
  &[data-card="back"] {
    margin-top: 10px;
  }
`;

const ButtonArea = styled.div`
  text-align: right;
  height: 35px;
`;

const EditButton = styled.div`
  padding: 5px 10px;
  margin: 3px;
  display: inline-block;
  border: 1px solid ${Colors.Gray};
  border-radius: 4px;
  color: ${Colors.FontGray};
`;
