import React, { Fragment } from "react";
import { PropsObject } from "../interfaces";

export function LandingPageLayout(props: PropsObject) {
  return (
    <Fragment>
      <div className="h-full">{props.children}</div>
    </Fragment>
  );
}
