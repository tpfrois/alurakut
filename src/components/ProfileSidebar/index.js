import React from "react";

import { Box } from "../Box";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";

const ProfileSidebar = ({ githubUser }) => {
  return (
    <Box as="aside">
      <img
        src={`https://www.github.com/${githubUser}.png`}
        alt={githubUser}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://www.github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};

export default ProfileSidebar;
