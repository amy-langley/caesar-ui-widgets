import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
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
    this.removeChild = this.removeChild.bind(this);

    this.beginEdit = this.beginEdit.bind(this);
    this.rejectEdit = this.rejectEdit.bind(this);
    this.acceptEdit = this.acceptEdit.bind(this);
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
          <span style={{ display: editing ? 'none' : 'inline' }}>
            <span className="pull-right">
              <Button onClick={this.beginEdit} bsClass="btn btn-primary btn-sm">
                <i className="glyphicon glyphicon-pencil" />
                &nbsp;
                Edit
              </Button>
              &nbsp;
              <Button onClick={onDelete} bsClass="btn btn-danger btn-sm">
                <i className="glyphicon glyphicon-remove" />
                &nbsp;
                Remove
              </Button>
            </span>
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
              <Button onClick={this.acceptEdit} bsClass="btn btn-warning btn-sm">
                <i className="glyphicon glyphicon-remove" />
                &nbsp;
                Cancel
              </Button>
            </span>
            <input type="text" className="form-control" value={valueString} onChange={this.updateValue} />
          </span>
        </li>
        <ul>
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
