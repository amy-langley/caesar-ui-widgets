import React from 'react';
import css from '../styl/index.styl'; // eslint-disable-line no-unused-vars

const TestComponent = function TestComponent() {
  return (
    <div>
      <p className="test-class">
        test
      </p>
      <button className="btn btn-primary" type="submit">
        BOO
      </button>
    </div>
  );
};

export default TestComponent;
