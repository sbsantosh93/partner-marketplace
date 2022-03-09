import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth;
  // console.log(currentUser)
  return (
    <>
      {currentUser && (
        <div>
          {currentUser && <pre> {JSON.stringify(currentUser, null, 2)}</pre>}
        </div>
      )}
    </>
  );
};

export default Profile;
