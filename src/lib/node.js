class Node {
  constructor(value, children) {
    this.value = value;
    this.children = children;
  }

  setValue(newValue) {
    const n = Node.clone(this);
    n.value = newValue;
    return n;
  }

  /* eslint-disable class-methods-use-this */
  clear() {
    return new Node(null, []);
  }
  /* eslint-enable */

  appendChild() {
    const n = Node.clone(this);
    n.children.push(new Node(null, []));
    return n;
  }

  removeChild(index) {
    const n = Node.clone(this);
    n.children = n.children.slice(0, index).concat(n.children.slice(index + 1));
    return n;
  }

  clone() {
    return Node.clone(this);
  }

  to_a() { // eslint-disable-line camelcase
    if (!this.children || this.children.length === 0) {
      return this.value;
    }

    return [this.value].concat(this.children.map(c => c.to_a()));
  }

  static from_json(key, obj) { // eslint-disable-line camelcase
    if (typeof key === 'object') {
      return new Node(
        key || 'root',
        Object.keys(obj).map(k => Node.from_json(k, obj[k])),
      );
    }

    return new Node(key, [obj]);
  }

  static from_a(ary) { // eslint-disable-line camelcase
    if (ary == null) {
      return new Node(null);
    }

    if (!(ary instanceof Array)) {
      return new Node(ary);
    }

    return new Node(ary[0], ary.slice(1).map(a => Node.from_a(a)));
  }

  static clone(someNode) {
    return Object.assign(
      Object.create(
        Object.getPrototypeOf(someNode),
      ),
      someNode,
      {
        children: (someNode.children || []).slice(0),
      },
    );
  }
}

export default Node;
