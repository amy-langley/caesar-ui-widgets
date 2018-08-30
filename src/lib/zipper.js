import Node from './node';

class Crumb {
  constructor(parent, left, right) {
    this.parent = parent;
    this.left = left || [];
    this.right = right || [];
  }

  static empty() {
    return [];
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
    return new Zipper(Node.from_a(ary), Crumb.empty());
  }

  static from_json(jsonObj) { // eslint-disable-line camelcase
    return new Zipper(Node.from_json(null, jsonObj), Crumb.empty());
  }

  static from_nodes(node) { // eslint-disable-line camelcase
    return new Zipper(node, Crumb.empty());
  }
}

export default Zipper;
