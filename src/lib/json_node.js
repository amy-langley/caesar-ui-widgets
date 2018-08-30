/* eslint-disable no-use-before-define, react/jsx-filename-extension */

import React from 'react';
import Node from './node';

class JsonNode extends Node {
  constructor(key, value, children) {
    super(value, children);
    this.key = key;
  }

  static from_json(key, obj) { // eslint-disable-line camelcase
    if (obj instanceof Object) {
      return new JsonObjectNode(
        key || 'ROOT',
        Object.keys(obj).map(k => JsonNode.from_json(k, obj[k])),
      );
    }

    return new JsonValueNode(key, obj);
  }
}

class JsonObjectNode extends JsonNode {
  constructor(key, children) {
    super(key, null, children);
  }

  render() {
    return (
      <li>
        <strong>
          {this.key}
        </strong>
        <ul>
          {this.children.map(n => n.render())}
        </ul>
      </li>
    );
  }
}

class JsonValueNode extends JsonNode {
  constructor(key, value) {
    super(key, value, null);
  }

  render() {
    return (
      <li>
        <strong>
          {this.key}
        </strong>
        :
        {this.value}
      </li>
    );
  }
}

export default JsonNode;
