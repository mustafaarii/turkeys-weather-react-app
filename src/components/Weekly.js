import React, { Component } from 'react'
import '../css/reset.css'
import '../css/responsive.css'
import '../css/style.css'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Loader } from 'rsuite'

export default class Weekly extends Component {

  state = {
    currentCity: "istanbul",
    location: null,
    forecastday: null,
  }

  componentDidMount() {
    this.getWeather(this.state.currentCity);
  }

  getWeather = (city) => {
    console.log(city);
    let url = "http://api.weatherapi.com/v1/forecast.json?key=" + "e1b8b4a8d98c43d0812151809202612&lang=tr&" + "q=" + city + "&days=7";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ location: data.location, forecastday: data.forecast.forecastday })
      })
  }

  changeCity = e => {
    this.setState({ currentCity: e.target.value })
    this.getWeather(this.props.stringToSlug(e.target.value));
  }

  renderLoading = () => {
    return (
      <Loader content="Yükleniyor..." vertical />
    )
  }

  renderCityForm = () => {

    if (this.props.cityNames !== null) {

      return (
        <Form inline>
          <FormGroup>
            <Label for="exampleSelect">Şehir Seçin  </Label>
            <Input type="select" name="select" id="exampleSelect" onChange={this.changeCity} with="300">
              {
                this.props.cityNames.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))
              }
            </Input>
          </FormGroup>
        </Form>
      )
    }
    else {
      this.renderLoading();
    }
  }

  renderWeather = () => {

    if (this.state.forecastday === null) {
      return (this.renderLoading());
    }
    else {
      console.log(this.state.forecastday)
      return (
        <div className="weeklyWeather">
          {
            this.state.forecastday.map(weather => (
              <div className="weathercard">
                <div className="col-widget-3">
                  <div className="currentWeather">
                    <h2>
                      {this.state.currentCity}
                      <span>Türkiye</span>
                    </h2>
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="temp-desc">
                          <h5>{weather.day.avgtemp_c}°C</h5>
                          <p>{weather.day.condition.text}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="weatherforecast">
                    <ul>
                      <li className="day old">
                        <div className="dayname">
                          <span>Tarih :</span>
                        </div>
                        <div className="temps-day">
                          <div className="temp-m-day">{weather.date}</div>
                        </div>
                      </li>
                      <li className="day old-in">
                        <div className="dayname">
                          <span>Maksimum Sıcaklık :</span>
                        </div>
                        <div className="temps-day">
                          <div className="temp-m-day">{weather.day.maxtemp_c}°C</div>
                        </div>
                      </li>
                      <li className="day old">
                        <div className="dayname">
                          <span>Minimum Sıcaklık :</span>
                        </div>
                        <div className="temps-day">
            <div className="temp-m-day">{weather.day.mintemp_c}°C</div>
                        </div>
                      </li>
                      <li className="day old-in">
                        <div className="dayname">
                          <span>Fırtına Hızı :</span>
                        </div>
                        <div className="temps-day">
            <div className="temp-m-day">{weather.day.maxwind_mph} km/sa</div>
                        </div>
                      </li>
                     </ul>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="weathar-box">
          <div className="container">
            {this.renderCityForm()}
            <div className="row">
              <div className="col-lg-12">
                <h2 className="title-wb">Haftalık Hava Durumu</h2>
              </div>
            </div>
            {this.renderWeather()}
          </div>
        </div>
      </div>
    )
  }
}
