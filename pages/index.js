import React, {useState, useEffect} from 'react';
import styled from 'styled-components'

import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutMenuProfileSidebar } from '../src/lib/AlurakutCommons';
import { MainGrid, GridColumn } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { formatWithValidation } from 'next/dist/next-server/lib/utils';

const URL_GITHUBAPI = `https://api.github.com`;

const ProfileSidebar = ({githubUser}) => {
  return (
    <Box>
      <img src={`https://www.github.com/${githubUser}.png`} 
      alt={githubUser}
      style={{borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = "tpfrois";
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    fetch(`${URL_GITHUBAPI}/users/${githubUser}`)
      .then(res => res.json())
      .then(data => setUserData(prevUserData => ({...prevUserData, ...data})));

    fetch(`${URL_GITHUBAPI}/users/${githubUser}/following`)
      .then(res => res.json())
      .then(data => setUserData(prevUserData => ({...prevUserData, followingUsers: data})));
  }, [githubUser])
  
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <GridColumn className="profileArea" gridArea={"profileArea"}>
         <ProfileSidebar githubUser={githubUser} />
        </GridColumn>

        <GridColumn className="welcomeArea" gridArea={"welcomeArea"}>
          <Box>
            <h1 className="title">Bem-Vindo(a) {userData && userData.name}</h1>
            <OrkutNostalgicIconSet confiavel={3} legal={3} sexy={3} />
          </Box>
        </GridColumn>

        <GridColumn className="relationsArea" gridArea={"relationsArea"}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus Amigos ({userData && userData.following})</h2>
            <ul>
            {userData?.followingUsers && userData.followingUsers.slice(0,6).map(user => (
              <li key={user.login}>
                <a href={`/users/${user.login}`}>
                  <img src={`https://www.github.com/${user.login}.png`} alt={user.login} />
                  <span>{user.login}</span>
                </a>
              </li>
            ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <Box>
            <h2 className="smallTitle">Minhas Comundiades</h2>
          </Box>
        </GridColumn>
      </MainGrid>
    </> 
    )
}
