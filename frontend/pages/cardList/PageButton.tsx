import React from "react";
import styled from "styled-components";

import Colors from "@/utils/Colors";

interface PageButton {
  currentPage: number;
  currentPageSet: number;
  pageList: number[][];
  setCurrentPage: any;
  setCurrentPageSet: any;
  totalPage: number;
}

const PageButton = (props: PageButton) => {
  const {
    currentPage,
    currentPageSet,
    pageList,
    setCurrentPage,
    setCurrentPageSet,
    totalPage,
  } = props;

  const updateValues = (updatedPage: number, updatedPageSet: number): void => {
    if (!pageList[currentPageSet].includes(updatedPage)) {
      setCurrentPageSet(updatedPageSet);
    }
    setCurrentPage(updatedPage);
  };

  const updatePage = (method: string): void => {
    if (method === "prev" && currentPage > 1) {
      const updatedPage = currentPage - 1;
      const updatedPageSet = currentPageSet - 1;
      updateValues(updatedPage, updatedPageSet);
    } else if (method === "next" && currentPage < totalPage) {
      const updatedPage = currentPage + 1;
      const updatedPageSet = currentPageSet + 1;
      updateValues(updatedPage, updatedPageSet);
    }
  };

  return (
    <ButtonContainer>
      <NumButton onClick={() => updatePage("prev")}>＜</NumButton>
      {pageList[currentPageSet] &&
        pageList[currentPageSet].map((item, index) => {
          return (
            <Number key={index} data-current={item === currentPage}>
              {item}
            </Number>
          );
        })}
      <NumButton onClick={() => updatePage("next")}>＞</NumButton>
    </ButtonContainer>
  );
};

export default PageButton;

const ButtonContainer = styled.div`
  text-align: center;
`;

const Number = styled.div`
  padding: 5px 10px;
  margin-right: 3px;
  display: inline-block;

  &[data-current="true"] {
    background-color: ${Colors.PrimaryBlue};
    color: ${Colors.White};
    font: bold;
  }
`;

const NumButton = styled.span`
  padding: 5px 10px;
  margin-right: 3px;
  display: inline-block;
  border: 1px solid ${Colors.Gray};
`;
