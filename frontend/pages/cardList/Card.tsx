import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CardInfo } from "@/utils/interface";
import Modal from "@/pages/common/Modal";

const Card = (props: { card: CardInfo }) => {
  const { card } = props;
  const [modal, setModal] = useState(false);

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
      <Modal id={card.id} modal={modal} setModal={setModal} />
    </>
  );
};

export default Card;
