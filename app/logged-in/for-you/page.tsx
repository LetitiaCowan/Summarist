import React from "react";
import SelectedBooks from "./components/SelectedBooks";
import BooksClientWrapper from "../components/clientWrappers/BooksClientWrapper";

const ForYou = () => {
  return (
    <div className="pt-10 md:pt-0">
      <SelectedBooks />
      <BooksClientWrapper />
      
    </div>
  );
};

export default ForYou;
