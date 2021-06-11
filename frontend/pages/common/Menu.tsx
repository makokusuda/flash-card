import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <Link to="/add-card">
        <div>Add a card</div>
      </Link>
    </div>
  );
};

export default Menu;
