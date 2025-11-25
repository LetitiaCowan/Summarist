import React from "react";
import SelectedBooks from "./components/SelectedBooks";
import BooksClientWrapper from "../components/clientWrappers/BooksClientWrapper";

const ForYou = () => {
  return (
    <div>
      <SelectedBooks />
      <BooksClientWrapper />
      
    </div>
  );
};

export default ForYou;
