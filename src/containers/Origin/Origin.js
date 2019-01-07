import React, { PureComponent} from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button, Table } from 'react-bootstrap';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter';

import './Origin.scss';

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/')
    },
    dispatch
  )

/**
 * Origin
 */
class Origin extends PureComponent {

  renderCodeDescription = () => {

    const code_description = "CODE DESCRIPTION";

    return (
      <h4 className="text-left">Relocaliser - {code_description}</h4>
    );
  }

  renderOriginHeader = () => {
    return (
      <div className="page-header">
        <h4>Scanner la localisation d'origine</h4>
      </div>
    )
  }

  renderSearch = () => {
    return (
      <Form inline>
        <FormGroup controlId="formInlineName">
          <FormControl type="text" placeholder="Chercher une localisation" />
        </FormGroup>{' '}
        <Button type="submit">Rechercher</Button>
      </Form>
    );
  };

  renderTable = () => {
    return (
      <Table id="myTable" responsive>
        <thead>
          <tr>
            <th>Site</th>
            <th>Localisation</th>
            <th>Quantité</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>23A</td>
            <td>Rack #1</td>
            <td>5</td>
          </tr>
          <tr>
            <td>24A</td>
            <td>Rack #4</td>
            <td>3</td>
          </tr>
          <tr>
            <td>30B</td>
            <td>Rack #6</td>
            <td>54</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  render() {
    return (
      <div>
        {this.renderCodeDescription()}
        {this.renderOriginHeader()}
        {this.renderSearch()}
        {this.renderTable()}
      </div>
    )
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Origin)
