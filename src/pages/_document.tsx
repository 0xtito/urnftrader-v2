import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props: any) {
  // Problem with this strategy is that _document only renders on the server side, so
  // this page does not update when navigate between pages
  // let htmlClasses: string = "";
  // let bodyClasses: string = "";
  // switch (props.__NEXT_DATA__.page) {
  //   case "/":
  //     // console.log("main page");
  //     htmlClasses = "h-full bg-gray-900";
  //     bodyClasses = "h-full";
  //     break;
  //   case "/app":
  //     htmlClasses = "h-full bg-white";
  //     bodyClasses = "h-full overflow-hidden";
  //     break;
  //   case "/app/collections":
  //     htmlClasses = "h-full bg-white";
  //     bodyClasses = "h-full overflow-hidden";
  //     break;
  // }

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
