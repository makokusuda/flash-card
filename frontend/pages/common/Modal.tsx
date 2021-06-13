import React from "react";
import styled from "styled-components";

import Service from "@/services/service";

const Modal = (props: { id: number; modal: boolean; setModal: any }) => {
  const { id, modal, setModal } = props;

  const deleteStory = (id: number) => {
    Service.deleteCard(id);
    setModal(false);
  };

  return (
    <ModalBackGround style={{ display: modal ? "block" : "none" }}>
      <ModalContent>
        <ModalText>
          <ModalTitle>Delete</ModalTitle>
          <div>{id}</div>
          Are you sure you want to delete this story?
        </ModalText>
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </ModalButton>
          <ModalButton
            onClick={() => {
              deleteStory(id);
            }}
          >
            Delete
          </ModalButton>
        </ModalButtonContainer>
      </ModalContent>
    </ModalBackGround>
  );
};

export default Modal;

const ModalBackGround = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: calc((100vh - 68px) / 2 - 137px) auto 0;
  padding: 20px;
  border-radius: 4px;
`;

const ModalText = styled.div``;

const ModalTitle = styled.div`
  font-weight: 500;
  line-height: 1.25;
  color: #1c1c1c;
  margin-bottom: 12px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-weight: 500;
  line-height: 1.6;
`;
