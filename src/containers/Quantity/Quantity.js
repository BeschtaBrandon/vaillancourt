import React, { PureComponent } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import './Quantity.scss';

/**
 * Quantity
 */
export default class Quantity extends PureComponent {


  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  renderCodeDescription = () => {

    const code_description = "CODE DESCRIPTION";

    return (
      <h4 className="text-left">Relocaliser - {code_description}</h4>
    );
  }

  renderQuantityForm = () => {
    return (
        <Form inline>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Quantite disponible a cette localisation</ControlLabel>
            <p className="lead">45 Unités</p>
          </FormGroup>
          <FormGroup controlId="formInlineName">
            <FormControl type="text" />
          </FormGroup>
          <FormGroup controlId="formInlineName">
            <FormControl componentClass="select" placeholder="select">
              <option value="select">Unités</option>
              <option value="other">...</option>
            </FormControl>
          </FormGroup>
          <Button type="submit">Déplacer Vers</Button>
        </Form>
    );
  }

  render() {
    return (
      <div>
      {this.renderCodeDescription()}
      {this.renderQuantityForm()}
      </div>
    );
  }
}
