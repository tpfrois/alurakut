import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { MainGrid, GridColumn } from "../src/components/MainGrid";
import { Box } from "../src/components/Box";
import ProfileSidebar from "../src/components/ProfileSidebar";
import ProfileCardList from "../src/components/ProfileCardList";

import { getUser, getUserFollowing } from "../src/services/github";

const GARTIC_HELPER_IMG =
  "https://github.com/tpfrois/gartichelper/blob/main/public/icons/favicon-310.png?raw=true";

export default function Home(client) {
  const githubUser = "tpfrois";
  const [githubUserData, setGithubUserData] = useState(undefined);
  const [imageUpload, setImageUpload] = useState(false);
  const [communities, setCommunities] = useState([
    {
      id: 0,
      title: "Gartic Helper",
      imageUrl: GARTIC_HELPER_IMG,
      url: "https://gartichelper.me",
      creatorSlug: "tpfrois",
    },
  ]);

  useEffect(() => {
    // Get initial user data
    (async () => {
      const userData = await getUser(githubUser);
      setGithubUserData(userData);

      const userFollowing = await getUserFollowing(githubUser);

      const cardUsers = userFollowing.map(user => ({
        id: user.login,
        title: user.login,
        imageUrl: user.avatar_url,
        url: user.html_url,
      }));

      setGithubUserData(prevUserData => ({
        ...prevUserData,
        followingUsers: cardUsers,
      }));
    })();
  }, [githubUser]);

  useEffect(() => {
    // Get initial communities
    (async () => {
      const { data } = await axios.get("/api/communities");
      const communities = data.communities;
      setCommunities(oldCommunities => [...oldCommunities, ...communities]);
    })();
  }, []);

  const handleNewCommunity = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const community = {
      title: formData.get("title"),
      imageUrl: formData.get("imageUrl"),
      url: formData.get("link"),
      creatorSlug: githubUser,
      image: null,
    };

    try {
      const { data } = await axios.post("/api/communities", community);

      setCommunities(oldCommunities => [
        ...oldCommunities,
        { id: data.communities.id, ...community },
      ]);
    } catch (error) {
      console.error(error);
    }
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
                disabled
              >
                {imageUpload
                  ? "Utilizar URL de Imagem"
                  : "Enviar uma imagem do computador"}
              </button>
              <div>
                {imageUpload ? (
                  <input
                    type="file"
                    name="imageFile"
                    accept="image/png, image/jpeg"
                  />
                ) : (
                  <input
                    type="url"
                    name="imageUrl"
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
