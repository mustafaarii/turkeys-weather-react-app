import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom';
import { Navbar,Nav,Icon } from 'rsuite';
export default class Header extends Component {

    render() {
        return (
            <div>
                <Navbar>
    <Navbar.Header>
    </Navbar.Header>
    <Navbar.Body>
      <Nav>
 
        <Nav.Item componentClass={Link} to="/">Anasayfa</Nav.Item>
        <Nav.Item componentClass={Link} to="/haftalik">Haftalık Hava Durumu</Nav.Item>
     
      </Nav>
     
    </Navbar.Body>
  </Navbar>
            </div>
        )
    }
}
