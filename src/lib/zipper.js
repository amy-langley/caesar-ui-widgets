class Node {
  constructor(value, children) {
    this.value = value;
    this.children = children;
  }

  setValue(newValue) {
    return new Node(newValue, this.children);
  }

  appendChild() {
    return new Node(this.value, this.children.concat(new Node(null, [])));
  }

  removeChild(index) {
    return new Node(
      this.value,
      this.children.slice(0, index).concat(this.children.slice(index + 1)),
    );
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

  to_a() { // eslint-disable-line camelcase
    if (!this.children) {
      return this.value;
    }

    return [this.value].concat(this.children.map(c => c.to_a()));
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
