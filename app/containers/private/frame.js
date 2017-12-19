import styled from 'styled-components';
import {utils} from '../../style';

export default styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  color: ${p => p.theme.textColor};
  ${p => utils.backGradient(p.theme)}
`;
