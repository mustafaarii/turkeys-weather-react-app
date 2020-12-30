import React, { Component } from 'react'
import { Container, Content, Header as HeaderR } from 'rsuite'
import Header from './Header'
import Homepage from './Homepage'
import { Switch, Route } from "react-router-dom";
import Weekly from './Weekly';

export default class App extends Component {
  state = {
    cities: null,
    cityNames: null,
  }

  componentDidMount() {
    this.getCities();
  }

  getCities = () => {
    fetch('cities.json')
      .then(res => res.json())
      .then(data => {
        this.setState({ cities: data });
        this.getCitynames(data);
      });
  }

  getCitynames = (cities) => {	
		let cityNames = [];
			cities.forEach(city => {
				cityNames.push(city.name)
			});
			this.setState({cityNames});
  }

  stringToSlug = (text) => {
		var trMap = {
			'çÇ': 'c',
			'ğĞ': 'g',
			'şŞ': 's',
			'üÜ': 'u',
			'ıİ': 'i',
			'öÖ': 'o',
			'â': 'a'
		};
		for (var key in trMap) {
			text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
		}
		return text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
			.replace(/\s/gi, "-") // convert spaces to dashes
			.replace(/[-]+/gi, "-") // trim repeated dashes
			.toLowerCase();

	}
  

  render() {
    return (
      <div>
        <Container>
          <HeaderR>
            <Header />
          </HeaderR>

          <Content>
            <Switch>
              <Route path="/" exact><Homepage cities={this.state.cities} cityNames={this.state.cityNames} stringToSlug = {this.stringToSlug} /></Route>
              <Route path="/haftalik" exact><Weekly cities={this.state.cities} cityNames={this.state.cityNames} stringToSlug = {this.stringToSlug}  /></Route>
            </Switch>
          </Content>
        </Container>
      </div>
    )
  }
}
