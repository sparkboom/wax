// @flow
import * as React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  text-align: center;
  position: absolute;
  margin: 0;
  padding: 20px 60px;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default (props: {}) => <InputContainer {...props} />;
