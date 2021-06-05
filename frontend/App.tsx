import React from "react";
import "./style.css";
import HelloWorld from "./pages/HelloWorld";

const App: React.FunctionComponent<{
  compiler: string;
  framework: string;
}> = () => {
  return (
    <div>
      <HelloWorld />
    </div>
  );
};

export default App;
