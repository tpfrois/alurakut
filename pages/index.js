import React from 'react';
import styled from 'styled-components'

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const Column = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
`;

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
  const friends = ['andre1202002', 'rafaballerini', 'jvenus99', 'arthurluiz', 'thainajardim', 'giovannamoeller', 'danielhe4rt']; 
  
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <Column className="profileArea" gridArea={"profileArea"}>
         <ProfileSidebar githubUser={githubUser} />
        </Column>

        <Column className="welcomeArea" gridArea={"welcomeArea"}>
          <Box>
            <h1 className="title">Bem-Vindo(a)</h1>
            <OrkutNostalgicIconSet confiavel={3} legal={3} sexy={3} />
          </Box>
        </Column>

        <Column className="relationsArea" gridArea={"relationsArea"}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus Amigos ({friends.length})</h2>
            <ul>
            {friends.slice(0,6).map(friend => (
              <li key={friend}>
                <a href={`/users/${friend}`}>
                  <img src={`https://www.github.com/${friend}.png`} alt={friend} />
                  <span>{friend}</span>
                </a>
              </li>
            ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <Box>
            <h2 className="smallTitle">Minhas Comundiades</h2>
          </Box>
        </Column>
      </MainGrid>
    </> 
    )
}
