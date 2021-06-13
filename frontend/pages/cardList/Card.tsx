import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <>
      <div>{card.id}</div>
      <div>{card.front}</div>
      <div>{card.back}</div>
      {card.image && <img src={`http://localhost:3000/${card.image}`} />}
      <div onClick={() => setModal(true)}>Delete</div>
      <Link to={`/edit-card/${card.id}`}>
        <div>Edit</div>
      </Link>
      <Modal
        id={card.id}
        modal={modal}
        setModal={setModal}
        setUpdated={setUpdated}
        updated={updated}
      />
    </>
  );
};

export default Card;
