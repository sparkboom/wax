import React from 'react';
import { connect } from 'react-redux';
import { routes, getRoutePathname } from '../../routes';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {CommandInput} from '../../components';

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

class Canvas extends React.Component {

  render() {
    return (
    <div>

      <InputContainer>
        <CommandInput />
      </InputContainer>);
    </div>)
  }
}

export default withRouter(connect()(Canvas));
