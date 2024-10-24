import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 120px);
`;

export const Grid = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;

  > div {
    &:nth-child(1) {
      grid-area: 1 / 1 / 2 / 2;
    }
    &:nth-child(2) {
      grid-area: 1 / 2 / 2 / 3;
    }
    &:nth-child(3) {
      grid-area: 1 / 3 / 2 / 4;
    }
    &:nth-child(4) {
      grid-area: 2 / 1 / 4 / 3;
    }
    &:nth-child(5) {
      grid-area: 2 / 3 / 3 / 4;
    }
    &:nth-child(6) {
      grid-area: 3 / 3 / 4 / 4;
    }
  }

  @media (max-width: 1260px) {
    grid-template-columns: 1fr;
    grid-template-rows: unset;

    > div {
      &:nth-child(1) {
        grid-area: unset;
      }
      &:nth-child(2) {
        grid-area: unset;
      }
      &:nth-child(3) {
        grid-area: unset;
      }
      &:nth-child(4) {
        grid-area: unset;
      }
      &:nth-child(5) {
        grid-area: unset;
      }
      &:nth-child(6) {
        grid-area: unset;
      }
    }
  }
`;

export const Loading = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
