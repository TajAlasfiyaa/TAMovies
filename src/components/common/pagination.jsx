/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Paginition = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <ul className="pagination justify-content-center">
      {pages.map((page) => (
        <li key={page}>
          <a
            className={currentPage === page ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Paginition;
