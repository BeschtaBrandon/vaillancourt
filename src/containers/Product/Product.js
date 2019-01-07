import React, { PureComponent } from 'react'
import BarcodeScanner from '../shared/BarcodeScanner';
import { Form, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import './Product.scss';


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class Product extends PureComponent {

  renderManualInput = () => {
    return (
      <Form>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Entrer un code de produit"
            placeholder="Enter text"
          />
        <FormGroup>
            <Button type="submit">Commencer</Button>
        </FormGroup>
      </Form>
    );
  };

   renderHeader = () => {
     return (
       <div className="page-header">
         <h4>Scanner un produit pour commencer</h4>
       </div>
     )
   }

  render() {
    return (
      <div className="barcodeScanner">
        { this.renderHeader() }
        <BarcodeScanner active="true"/>
        { this.renderManualInput() }
      </div>
    )
  }

}

export default Product;
