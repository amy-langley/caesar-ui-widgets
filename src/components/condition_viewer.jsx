/* eslint-disable
  react/prefer-stateless-function, react/forbid-prop-types,
  no-nested-ternary, react/no-multi-comp
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function emptyCondition(condition) {
  if (condition === null) return true;
  if (condition instanceof Array && condition.length === 0) return true;
  return false;
}

class ConditionViewer extends React.Component {
  render() {
    const { condition } = this.props;
    return emptyCondition(condition) ? (
      <li>
        <Button bsStyle="primary">
          Insert
        </Button>
      </li>
    ) : (condition instanceof Array) ? (
      <span>
        <li>
          { condition[0] }
        </li>
        <ul>
          { condition.slice(1).map(val => <ConditionViewer condition={val} />) }
        </ul>
      </span>
    ) : (
      <span>
        <li>
          { condition }
        </li>
      </span>
    );
  }
}

ConditionViewer.propTypes = {
  condition: PropTypes.array.isRequired,
};

export default ConditionViewer;
