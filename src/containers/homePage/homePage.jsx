import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  return (
    <>
      <div>homePage</div>
      <Button onClick={()=>history.push('/login')}>Go to Login</Button>
    </>
  );
};

export default HomePage;
