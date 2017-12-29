// @flow
import React from 'react';
import styled from 'styled-components';
import InputContainer from './input-container';
import Input from './input';

export default (props: {}) => <InputContainer><Input type="text" {...props} /></InputContainer>;
