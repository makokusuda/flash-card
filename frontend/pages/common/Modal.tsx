import React from "react";
import styled from "styled-components";

import Service from "@/services/service";
import Colors from "@/utils/Colors";

const Modal = (props: {
  id: number;
  modal: boolean;
  setModal: any;
  setUpdated: any;
  updated: boolean;
}) => {
  const { id, modal, setModal, setUpdated, updated } = props;

  const deleteStory = (id: number) => {
    Service.deleteCard(id);
    setModal(false);
    setUpdated(!updated);
  };

  return (
    <ModalBackGround style={{ display: modal ? "block" : "none" }}>
      <ModalContent>
        <ModalText>Are you sure you want to delete this story?</ModalText>
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </ModalButton>
          <ModalButton
            data-button={"delete"}
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
  background-color: ${Colors.BackGroundGray};
`;

const ModalContent = styled.div`
  background-color: ${Colors.White};
  margin: calc((100vh - 68px) / 2 - 137px) auto 0;
  padding: 20px;
  border-radius: 4px;
  width: 310px;
`;

const ModalText = styled.div`
  font-size: 18px;
  margin: 20px 0;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 0 auto;
`;

const ModalButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin: 3px;
  border-radius: 4px;
  border: 1px solid ${Colors.Gray};
  font-weight: 500;
  font-size: 16px;
  color: ${Colors.FontGray};
  &[data-button="delete"] {
    border: 1px solid ${Colors.Red};
    color: ${Colors.Red};
  }
`;
