import React, { useState, useEffect } from "react";

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/lib/AlurakutCommons";
import { MainGrid, GridColumn } from "../src/components/MainGrid";
import { Box } from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import ProfileCardList from "../src/components/ProfileCardList";

const URL_GITHUBAPI = `https://api.github.com`;
const GARTIC_HELPER_IMG =
  "https://github.com/tpfrois/gartichelper/blob/main/public/icons/favicon-310.png?raw=true";

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

export default function Home() {
  const githubUser = "tpfrois";
  const [githubUserData, setGithubUserData] = useState(undefined);
  const [imageUpload, setImageUpload] = useState(true);
  const [communities, setCommunities] = useState([
    {
      id: 0,
      title: "Gartic Helper",
      image: GARTIC_HELPER_IMG,
      link: "https://gartichelper.me",
    },
  ]);

  useEffect(() => {
    fetch(`${URL_GITHUBAPI}/users/${githubUser}`)
      .then(res => res.json())
      .then(data =>
        setGithubUserData(prevUserData => ({ ...prevUserData, ...data }))
      );

    fetch(`${URL_GITHUBAPI}/users/${githubUser}/following`)
      .then(res => res.json())
      .then(data => {
        const cardUsers = data.map(user => ({
          id: user.login,
          title: user.login,
          image: user.avatar_url,
          link: user.html_url,
        }));
        setGithubUserData(prevUserData => ({
          ...prevUserData,
          followingUsers: cardUsers,
        }));
      });
  }, [githubUser]);

  const handleNewCommunity = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageFile = formData.get("file");
    const community = {
      id: new Date().toISOString(),
      title: formData.get("title"),
      image: imageFile ? URL.createObjectURL(imageFile) : formData.get("image"),
      link: formData.get("link"),
    };
    setCommunities(oldCommunities => [...oldCommunities, community]);
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <GridColumn className="profileArea" gridArea={"profileArea"}>
          <ProfileSidebar githubUser={githubUser} />
        </GridColumn>

        <GridColumn className="welcomeArea" gridArea={"welcomeArea"}>
          <Box>
            <h1 className="title">
              Bem-Vindo(a) {githubUserData && githubUserData.name}
            </h1>
            <OrkutNostalgicIconSet confiavel={3} legal={3} sexy={3} />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleNewCommunity}>
              <div>
                <input
                  type="text"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  required
                />
              </div>
              <button
                onClick={() =>
                  setImageUpload(prevImageUpload => !prevImageUpload)
                }
                type="button"
              >
                {imageUpload
                  ? "Utilizar URL de Imagem"
                  : "Enviar uma imagem do computador"}
              </button>
              <div>
                {imageUpload ? (
                  <input
                    type="file"
                    name="file"
                    accept="image/png, image/jpeg"
                  />
                ) : (
                  <input
                    type="url"
                    name="image"
                    aria-label="Coloque uma URL ou envie uma imagem para usarmos de capa"
                    placeholder="Coloque uma URL ou envie uma imagem  para usarmos de capa"
                    required
                  />
                )}
              </div>
              <div>
                <input
                  type="url"
                  name="link"
                  aria-label="Coloque um link para a comunidade"
                  placeholder="Coloque um link para a comunidade"
                  required
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </GridColumn>

        <GridColumn className="relationsArea" gridArea={"relationsArea"}>
          <ProfileCardList
            title="Meus Amigos"
            list={githubUserData?.followingUsers}
          />
          <ProfileCardList title="Minhas Comunidades" list={communities} />
        </GridColumn>
      </MainGrid>
    </>
  );
}
