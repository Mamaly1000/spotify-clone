import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState(false);

  const anchor = "left";

  return (
    <React.Fragment key={anchor}>
      <Button onClick={() => setState(true)}>{anchor}</Button>
      <SwipeableDrawer
        anchor={anchor}
        open={state}
        onClose={() => setState(false)}
        onOpen={() => setState(true)}
      ></SwipeableDrawer>
    </React.Fragment>
  );
}
