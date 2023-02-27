import React from "react";
import { PropsObject } from "../interfaces";

function MainAppLayout(props: PropsObject) {
  return (
    <html className="h-full bg-gray-100">
      <body className="h-full">{props.children}</body>
    </html>
  );
}

export default MainAppLayout;
