import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

function HomeNav() {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();
  const homeNav = user ? (
    <div className="homeNav">
      <h1 onClick={() => history.push("/")} className="logo">
        Forever Note
      </h1>
      <p>Welcome {user.username}</p>
      <div>
        <Link to="/" onClick={logout}>
          LOGOUT
        </Link>
      </div>
    </div>
  ) : (
    <div className="homeNav">
      <h1 className="logo">Forever Note</h1>
      <Link to="/login">LOGIN</Link>
      <Link to="/register">REGISTER</Link>
    </div>
  );

  return homeNav;
}

export default HomeNav;
