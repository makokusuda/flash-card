import React from "react";
import "./style.css";
import Home from "./pages/Home";

const App: React.FunctionComponent<{
  compiler: string;
  framework: string;
}> = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
