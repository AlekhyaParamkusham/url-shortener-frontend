import { css } from "styled-components";

export const small = (props) => {
  return css`
    @media only screen and (max-width: 320px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (min-width: 321px) and (max-width: 480px) {
      ${props}
    }
  `;
};

export const mobileLand = (props) => {
  return css`
    @media only screen and (min-width: 480px) and (max-width: 599px) {
      ${props}
    }
  `;
};

export const smallTablet = (props) => {
  return css`
    @media only screen and (min-width: 600px) and (max-width: 767px) {
      ${props}
    }
  `;
};

export const tabletPo = (props) => {
  return css`
    @media only screen and (min-width: 767.5px) and (max-width: 991px) {
      ${props}
    }
  `;
};

export const desktop = (props) => {
  return css`
    @media only screen and (min-width: 992px) {
      ${props}
    }
  `;
};

export const large = (props) => {
  return css`
    @media only screen and (min-width: 1200px) {
      ${props}
    }
  `;
};
