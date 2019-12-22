import { css } from "glamor";

css.insert(`
  @import 'https://fonts.googleapis.com/css?family=Source+Sans+Pro';
`);

css.insert(`
  * {
    -webkit-font-smoothing: antialiased;
    font-family: 'Source Sans Pro', sans-serif;
    box-sizing: border-box;
  }
`);

css.insert(`
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
`);

css.insert(`
  p {
    font-size: 1rem;
    letter-spacing: .03rem;
    font-weight: 400;
  }
`);

css.insert(`
  button {
    border: 0;
  }
`);