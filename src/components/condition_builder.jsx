
import React from 'react';
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  Panel,
  Row,
} from 'react-bootstrap';
import css from '../styl/index.styl'; // eslint-disable-line no-unused-vars
import ConditionViewer from './condition_viewer';
import HumanReadableSubtree from './human_readable_subtree';
import Zipper from '../lib/zipper';

class ConditionBuilder extends React.Component {
  constructor() {
    super();

    const initString = '["or", ["gte", ["const", 4], ["const", 3]], ["eq", ["lookup", "c.val", 0], ["const", 2]]]';

    this.state = {
      conditionString: initString,
      showBuilder: false,
      validCondition: true,
      lastParse: JSON.parse(initString),
      zipper: Zipper.from_a(JSON.parse(initString)),
    };

    this.toggleBuilder = this.toggleBuilder.bind(this);
    this.updateCondition = this.updateCondition.bind(this);
    this.updateExpression = this.updateExpression.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }

  getValidationState() {
    const { validCondition } = this.state;
    return validCondition ? 'success' : 'error';
  }

  updateExpression(newZipper) {
    let zipper = newZipper;
    while (!zipper.isRoot()) {
      zipper = zipper.up();
    }

    const lastParse = zipper.to_a();
    const conditionString = JSON.stringify(lastParse);

    this.setState({
      zipper,
      lastParse,
      conditionString,
    });
  }

  toggleBuilder() {
    const { showBuilder } = this.state;
    this.setState({ showBuilder: !showBuilder });
  }

  updateCondition(evt) {
    const expr = evt.target.value;
    let { lastParse, validCondition, zipper } = this.state;

    try {
      const parse = JSON.parse(expr);
      if (parse != null && parse instanceof Array) {
        validCondition = true;
        lastParse = parse;
        zipper = Zipper.from_a(lastParse);
      } else {
        validCondition = false;
      }
    } catch (ex) {
      validCondition = false;
    }
    this.setState({
      conditionString: expr,
      validCondition,
      lastParse,
      zipper,
    });
  }

  render() {
    const {
      showBuilder,
      conditionString,
      lastParse,
      zipper,
    } = this.state;
    const builderDisplay = showBuilder ? 'block' : 'none';

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={12}>
            <h1>
              Condition Builder
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <FormGroup
              controlId="formCondition"
              validationState={this.getValidationState()}
            >
              <ControlLabel>
                Condition
              </ControlLabel>
              <FormControl
                type="text"
                value={conditionString}
                onChange={this.updateCondition}
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ display: builderDisplay }}>
          <Col xs={12} md={12}>
            <Panel>
              <Panel.Body className="condition-viewer">
                <Grid fluid>
                  <Row>
                    <Col xs={6} md={6}>
                      <ul className="cv">
                        <ConditionViewer
                          condition={lastParse}
                          onEdit={this.updateExpression}
                          zipper={zipper}
                        />
                      </ul>
                    </Col>
                  </Row>
                </Grid>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div className="pull-right">
              <button
                type="submit"
                className="btn btn-default"
                data-toggle="collapse"
                data-target="#builder"
                href="builder"
                aria-expanded="false"
                aria-controls="builder"
                onClick={() => this.toggleBuilder()}
              >
                Condition Builder
              </button>
              &nbsp;
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
            <strong>
              If&nbsp;
            </strong>
            <HumanReadableSubtree zipper={zipper} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
/* eslint-enable */

export default ConditionBuilder;
