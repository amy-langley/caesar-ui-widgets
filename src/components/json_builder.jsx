import React from 'react';
import PropTypes from 'prop-types';
import Zipper from '../lib/zipper';
import JsonNode from '../lib/json_node';

class JsonBuilder extends React.Component {
  constructor(props) {
    super(props);
    const initialParse = props.initialValue.length > 0
      ? JSON.parse(props.initialValue)
      : {};

    const nodes = JsonNode.from_json(null, initialParse);
    const someNodes = nodes.clone();

    this.state = {
      nodes: someNodes,
      zipper: Zipper.from_nodes(someNodes),
    };
  }

  render() {
    const { nodes, zipper } = this.state;
    return (
      <div>
        <ul>
          { nodes.render() }
        </ul>
        <code>
          { JSON.stringify(zipper.childAt(1).up()) }
        </code>
      </div>
    );
  }
}

JsonBuilder.propTypes = {
  initialValue: PropTypes.string.isRequired,
};

export default JsonBuilder;
