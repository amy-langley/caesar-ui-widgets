/* eslint-disable react/prefer-stateless-function, react/forbid-prop-types, no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

function emptyCondition(condition) {
  if (condition === null) return true;
  if (condition instanceof Array && condition.length === 0) return true;
  return false;
}

class ConditionViewer extends React.Component {
  render() {
    const { condition } = this.props;
    return emptyCondition(condition) ? (
      <span>
        empty
      </span>
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
