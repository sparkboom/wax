import * as React from 'react';
import styled from 'styled-components';

const InterfaceList = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  text-align: right;
  height: 100px;
  font-size: 12px;
  font-family: Helvetica, Arial, sans-serif;
  color: #ddcccc;
`;

const IdSpan = styled.span`
  color: #775555;
`;


const ContextList = ({contextInterfaces}) => (
  <InterfaceList>
  { contextInterfaces && contextInterfaces.map(
    (i, key) => (   <div key={key}>{!i? '<null>':`${i.interfaceName}`}<IdSpan>{` (${i && i.interfaceKey})` }</IdSpan></div>   )
  )}
  </InterfaceList>);

export default ContextList;
