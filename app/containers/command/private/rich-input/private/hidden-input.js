import styled from 'styled-components';

export default styled.input.attrs({
  type: 'text'
})`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #883355;

  border: thin solid purple;

  &:focus {
    outline: none;
  }
`;
