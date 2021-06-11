import React from "react";

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
    <div>
      <div onClick={() => updatePage("prev")}>prev</div>
      <div>
        {pageList[currentPageSet] &&
          pageList[currentPageSet].map((item, index) => {
            return (
              <div
                key={index}
                style={{ color: item === currentPage ? "red" : "gray" }}
              >
                {item}
              </div>
            );
          })}
      </div>
      <div onClick={() => updatePage("next")}>next</div>
    </div>
  );
};

export default PageButton;
