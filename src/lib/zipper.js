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

  to_a() { // eslint-disable-line camelcase
    if (!this.children || this.children.length === 0) {
      return this.value;
    }

    return [this.value].concat(this.children.map(c => c.to_a()));
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
      {
        value: someNode.value,
        children: (someNode.children || []).slice(0),
      },
    );
  }
}

class Crumb {
  constructor(parent, left, right) {
    this.parent = parent;
    this.left = left || [];
    this.right = right || [];
  }
}

class Zipper {
  constructor(item, crumbs) {
    this.item = item;
    this.crumbs = crumbs || [];
  }

  mutate(lambda) {
    return new Zipper(lambda(this.item), this.crumbs);
  }

  childAt(index) {
    return new Zipper(this.item.children[index], [this.crumbFrom(index)].concat(this.crumbs));
  }

  crumbFrom(index) {
    return new Crumb(
      this.item.value,
      this.item.children.slice(0, index),
      this.item.children.slice(index + 1),
    );
  }

  isRoot() {
    return this.crumbs.length === 0;
  }

  to_a() { // eslint-disable-line camelcase
    return this.item.to_a();
  }

  to_nodes() { // eslint-disable-line camelcase
    return this.item;
  }

  up() {
    const crumb = this.crumbs[0];
    return new Zipper(
      new Node(
        crumb.parent,
        crumb.left.concat(this.item, crumb.right),
      ),
      this.crumbs.slice(1),
    );
  }

  static from_a(ary) { // eslint-disable-line camelcase
    return new Zipper(Node.from_a(ary), []);
  }

  static from_nodes(node) { // eslint-disable-line camelcase
    return new Zipper(node, []);
  }
}

export { Zipper, Node };
export default Zipper;
