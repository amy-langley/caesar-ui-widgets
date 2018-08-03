import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dropdown,
  Glyphicon,
  MenuItem,
} from 'react-bootstrap';
import { Zipper } from '../lib/zipper';

class ConditionViewer extends React.Component {
  constructor(props) {
    super(props);
    const { zipper } = this.props;

    this.state = {
      editing: false,
      valueString: zipper.item.value,
    };

    this.updateValue = this.updateValue.bind(this);
    this.appendChild = this.appendChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
    this.clearValue = this.clearValue.bind(this);

    this.beginEdit = this.beginEdit.bind(this);
    this.rejectEdit = this.rejectEdit.bind(this);
    this.acceptEdit = this.acceptEdit.bind(this);
  }

  clearValue() {
    const { zipper, onEdit } = this.props;
    onEdit(zipper.mutate(n => n.clear()));
  }

  updateValue(event) {
    this.setState({ valueString: event.target.value });
  }

  beginEdit() {
    const { zipper } = this.props;
    this.setState({
      editing: true,
      valueString: zipper.item.value || '',
    });
  }

  appendChild() {
    const { zipper, onEdit } = this.props;
    onEdit(zipper.mutate(n => n.appendChild()));
  }

  acceptEdit() {
    const { zipper, onEdit } = this.props;
    const { valueString } = this.state;

    onEdit(zipper.mutate(n => n.setValue(valueString)));
    this.setState({ editing: false });
  }

  rejectEdit() {
    const { zipper } = this.props;
    this.setState({
      editing: false,
      valueString: zipper.item.value,
    });
  }

  /* eslint-disable no-alert, no-restricted-globals, no-undef  */
  removeChild(index) {
    if (confirm('Are you sure you want to delete this item and its children?')) {
      const { zipper, onEdit } = this.props;
      onEdit(zipper.mutate(n => n.removeChild(index)));
    }
  }
  /* eslint-enable */

  render() {
    const { valueString, editing } = this.state;
    const { onDelete, onEdit, zipper } = this.props;
    const self = this;
    return (
      <span className="form-inline">
        <li className="clearfix">
          <span className="pull-right">
            <Dropdown pullRight disabled={editing}>
              <Dropdown.Toggle className="btn-sm btn-primary">
                <Glyphicon glyph="cog" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem onClick={this.appendChild}>
                  <Glyphicon glyph="plus" className="pull-right" />
                  Add Child
                </MenuItem>
                <MenuItem onClick={this.beginEdit}>
                  <i className="glyphicon glyphicon-pencil pull-right" />
                  Edit
                </MenuItem>
                <MenuItem onClick={this.clearValue}>
                  <i className="glyphicon glyphicon-erase pull-right" />
                  Clear
                </MenuItem>
                <MenuItem onClick={onDelete} disabled={zipper.isRoot()}>
                  <i className="glyphicon glyphicon-remove pull-right" />
                  Remove
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </span>
          <span style={{ display: editing ? 'none' : 'inline' }}>
            { zipper.item.value }
          </span>
          <span style={{ display: editing ? 'inline' : 'none' }}>
            <span className="pull-right">
              <Button onClick={this.acceptEdit} bsClass="btn btn-success btn-sm">
                <i className="glyphicon glyphicon-ok" />
                &nbsp;
                OK
              </Button>
              &nbsp;
              <Button onClick={this.acceptEdit} bsClass="btn btn-default btn-sm">
                <i className="glyphicon glyphicon-remove" />
                &nbsp;
                Cancel
              </Button>
              &nbsp;
            </span>
            <input type="text" className="form-control" value={valueString} onChange={this.updateValue} />
          </span>
        </li>
        <ul className="cv">
          { (zipper.item.children || []).map(
            (child, idx) => (
              <ConditionViewer
                condition={child.item}
                onEdit={onEdit}
                onDelete={() => self.removeChild(idx)}
                zipper={zipper.childAt(idx)}
              />),
          ) }
        </ul>
      </span>
    );
  }
}

ConditionViewer.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  zipper: PropTypes.objectOf(Zipper).isRequired,
};

ConditionViewer.defaultProps = {
  onEdit: () => null,
  onDelete: () => null,
};

export default ConditionViewer;
