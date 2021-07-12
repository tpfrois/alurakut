import styled from 'styled-components';

export const MainGrid = styled.main`
  width: 100%;
  max-width: 500px;

  margin: 0 auto;
  padding: 16px;

  grid-gap: 10px;

  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }

  @media(min-width: 860px ) {
    max-width: 1110px;

    display: grid;
    grid-template-areas: "profileArea welcomeArea relationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`;

export const GridColumn = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
`;
