import React, { useEffect } from "react";
import { useHistory } from "@docusaurus/router";

// Redirect root "/" to "/docs/overview/overview"
export default function Home(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    history.replace("/docs/overview/overview");
  }, [history]);

  return <></>;
}
