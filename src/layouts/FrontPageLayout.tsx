import React from "react";
import { PropsObject } from "../interfaces";

export function FrontPageLayout(props: PropsObject) {
  return (
    <html className="h-full bg-gray-100">
      <body className="h-full">{props.children}</body>
    </html>
  );
}
