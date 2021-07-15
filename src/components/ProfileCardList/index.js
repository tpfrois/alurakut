import React from "react";

import { Link } from "../../lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export default function ProfileCardList({ title, list }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} <span className="counter">({list?.length})</span>
      </h2>
      <ul>
        {list &&
          list.slice(0, 6).map(item => (
            <li key={item.id}>
              <a href={item.url} target="_blank">
                <img src={item.imageUrl} alt={item.title} />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
      </ul>
      <hr />
      <Link href="/" className="seeAll">
        Ver todos
      </Link>
    </ProfileRelationsBoxWrapper>
  );
}
