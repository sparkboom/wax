import styled from 'styled-components';

export default styled.div`

  color: ${p => p.theme.textColor};
  margin: 0;
  max-width: 100%;
  flex: 1 0 auto;
  outline: 0;
  text-align: center;
  line-height: 1.2em;
  padding: .7em 1em;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 0.5em;
  box-shadow: none;

  font-family: system-ui;
  font-size: 40px;
  font-weight: lighter;
  border: solid thin blue;

  &:focus {
    border: solid thin red;
  }
`;
