//import React from "react";
import { createTheme } from "@mui/material/styles";
import { brown, pink, purple, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: red[400],
      magic:purple[200]
    },
    brown: {
      main: brown[300],
    },
    promoColor: {
      main: pink[200],
    },
  },
  myField: {
    myNestedField: { margin: "10px 5px" },
  },
});
