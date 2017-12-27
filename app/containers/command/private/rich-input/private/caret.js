import styled, {keyframes} from 'styled-components';

const blink = keyframes`
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

type Props = {
  theme: ITheme
};

export default styled.div`
  display: inline-block;
  font-size: 1em;
  height: 1.2em;
  border-left: solid thin ${props => props.theme.textColor};
  max-width: 0px;
  animation: 1s ${blink} step-end infinite;
  position: relative;
  left: 0;
  top: 10px;
  padding: 0;
  margin: 0;
`;
