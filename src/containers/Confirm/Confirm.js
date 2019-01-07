import React, { PureComponent } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

/**
 * Confirmation
 */
export default class Confirm extends PureComponent {

  renderConfirmation = () => {
    return (
      <div>
        <h2>Confirmation</h2>
        <i className="fas fa-long-arrow-alt-down"></i>
        <h2>Produit 1</h2>
      </div>
    );
  };

  renderConfirmForm = () => {
    return (
      <form>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option value="select">Creet une localisation temporaire</option>
            <option value="other">...</option>
          </FormControl>
        </FormGroup>

        <Button type="submit">Sauvegarder</Button>
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.renderConfirmation()}
        {this.renderConfirmForm()}
      </div>
    )
  }

}
