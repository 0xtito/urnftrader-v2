import React from "react";
import { Html } from "next/document";

type PropsObject = {
  children: any;
};

function MainAppLayout(props: PropsObject) {
  return (
    <html className="h-full bg-gray-100">
      <body className="h-full">{props.children}</body>
    </html>
  );
}

export default MainAppLayout;
