import {
  default as React,
  Component,
  PropTypes,
} from "react";

import { Row, Col } from 'react-bootstrap';

// test added componentes in div too
import DocumentsList from '../containers/documents-list.js';
import { AddDocument } from '../components/add-document.js';

export class test extends Component {
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <main>
        <div className="container">
          <div>
            <AddDocument />
            <DocumentsList />
          </div>
          <div className="container app-footer">
          </div>
        </div>
      </main>
    )
  }
}
