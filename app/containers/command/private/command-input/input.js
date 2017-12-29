import styled from 'styled-components';

export default styled.input`

  color: ${p => p.theme.textColor};

  margin: 0;
  max-width: 100%;

  flex: 1 0 auto;

  outline: 0;

  tap-highlight-color: rgba(255,255,255,0);

  text-align: center;
  line-height: 1.21428571em;
  padding: .67857143em 1em;
  background: rgba(0, 0, 0, 0.2);

  border: 1px solid rgba(34,36,38,.15);
  border-radius: .3rem;

  transition: box-shadow .1s ease,border-color .1s ease;

  box-shadow: none;

  font-size: 40px;
  font-weight: lighter;
`;
