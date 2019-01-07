import React, { PureComponent } from 'react';
import { Table } from 'react-bootstrap'

/**
 * Destination
 */
export default class Destination extends PureComponent {

    renderCodeDescription = () => {

        const code_description = "CODE DESCRIPTION";

        return (
          <h4 className="text-left">Relocaliser - {code_description}</h4>
        );
    }

    renderDestinationHeader = () => {
        return (
          <div className="page-header">
              <h4>Scanner la localisation d'origine</h4>
          </div>
        )
    }

    renderDestination = () => {
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
                      <td>42B</td>
                      <td>Rack #41</td>
                      <td>56</td>
                  </tr>
                  <tr>
                      <td>21A</td>
                      <td>Rack #13</td>
                      <td>35</td>
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

    renderSearch = () => {
        return (
          <div>
              <input className="form-control" type="text" id="myInput" onKeyUp={this.searchOrigin} placeholder="Chercher une localisation"/>
          </div>
        );
    };

    render() {
        return (
            <div>
                {this.renderCodeDescription()}
                {this.renderDestinationHeader()}
                {this.renderSearch()}
                {this.renderDestination()}
            </div>
        )
    }

}
