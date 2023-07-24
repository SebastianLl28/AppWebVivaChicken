import React from "react";
import { Outlet } from "react-router-dom";
import AppBarNavigation from "../../components/AppBarNavigation";

const PrivatePage = () => {
  return (
    <div>
      <AppBarNavigation>
        <Outlet />
      </AppBarNavigation>
    </div>
  );
};

export default PrivatePage;
