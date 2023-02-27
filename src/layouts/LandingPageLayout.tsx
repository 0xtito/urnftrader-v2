import React from "react";
import { PropsObject } from "../interfaces";

function LandingPageLayout(props: PropsObject) {
  return (
    <html className="h-full bg-gray-900">
      <body className="h-full">{props.children}</body>
    </html>
  );
}

export default LandingPageLayout;
