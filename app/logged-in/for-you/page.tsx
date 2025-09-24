import React from "react";
import SelectedBooks from "./components/SelectedBooks";
import ClientWrapper from "./components/ClientWrapper";

const ForYou = () => {
  return (
    <div className="p-10 ">
      <SelectedBooks />
      <ClientWrapper />
      
    </div>
  );
};

export default ForYou;
