import React from "react";
import { Html } from "next/document";

type PropsObject = {
  children: any;
};

function LandingPageLayout(props: PropsObject) {
  return (
    <html className="h-full bg-gray-900">
      <body className="h-full bg-gray-900">{props.children}</body>
    </html>
  );
}

export default LandingPageLayout;
