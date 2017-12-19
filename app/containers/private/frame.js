import styled from 'styled-components';
import tokens from '../../style-tokens';
import {backGradient} from '../../style-utils';

export default styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  color: ${tokens.textColor};
  ${backGradient(tokens)}
`;
