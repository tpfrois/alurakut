import React from "react";

import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export default function ProfileCardList({ title, list, isCommunity }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({list?.length})
      </h2>
      <ul>
        {list &&
          list.slice(0, 6).map(item => (
            <li key={isCommunity ? item.id : item.login}>
              <a
                href={isCommunity ? item.link : `/users/${item.login}`}
                target="_blank"
              >
                <img
                  src={isCommunity ? item.image : item.avatar_url}
                  alt={isCommunity ? item.title : item.login}
                />
                <span>{isCommunity ? item.title : item.login}</span>
              </a>
            </li>
          ))}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}
