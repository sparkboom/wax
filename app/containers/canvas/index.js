import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {moduleMap} from '../../modules/';
import {getTopLevelNodes} from './selectors';

const CanvasContainer = styled.div`
  height: 100%;
  width: 100%;
`;

class Canvas extends React.Component<any> {

  render() {

    const topLevelComponents = this.props.topLevelNodes.map( node => {
      const object =  moduleMap[node.objectClass];
      if (object){
        return React.createElement(object, {key: node.itemKey }, null);
      }
      return 'Component not recognised :(';
    });

    console.log('topLevelComponents', topLevelComponents);

    return (
    <CanvasContainer>
      {topLevelComponents}
    </CanvasContainer>
    );
  };
}

const connectProps = state => ({
  topLevelNodes: getTopLevelNodes(state),
});

export default connect(connectProps)(Canvas);
