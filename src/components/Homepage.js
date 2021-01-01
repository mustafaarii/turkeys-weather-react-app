import React, { Component } from 'react'
import '../css/reset.css'
import '../css/responsive.css'
import '../css/style.css'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Loader } from 'rsuite'
export default class Homepage extends Component {

	state = {
		currentCity: "istanbul",
		weather: null
	}

	componentDidMount() {
		this.getWeather(this.state.currentCity);
	}

	renderLoading = () => {
		return (<div className="loading"><Loader content="Yükleniyor..." vertical /></div>)
	}

	changeCity = e => {
		this.setState({ currentCity: e.target.value })
		this.getWeather(this.props.stringToSlug(e.target.value));
	}

	getWeather = (city) => {
		let url = "http://api.weatherapi.com/v1/current.json?key=" + "e1b8b4a8d98c43d0812151809202612&lang=tr&" + "q=" + city + "";
		fetch(url)
			.then(res => res.json())
			.then(data => {
				this.setState({ weather: data })
			})
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
		if (this.state.weather === null) {
			return this.renderLoading();
		}
		else {
			
			return (
				<div className="row">
					<div className="col-lg-3"></div>
					<div className="col-lg-6">
						<div className="col-widget-3">
							<div className="currentWeather">
								<h2>
									{this.state.currentCity}
									<span>Türkiye</span>
								</h2>
								<div className="row align-items-center">
									<div className="col-lg-6">
										<div className="temp-desc">
											<h5>{this.state.weather.current.temp_c}°C</h5>
											<p>{this.state.weather.current.condition.text}</p>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="icon-c">
											<img src="{icon1}" alt="" />
										</div>
									</div>
								</div>
							</div>
							<div className="weatherforecast">
								<ul>
									<li className="day old">
										<div className="dayname">
											<span>Şehirdeki Güncel Vakit :</span>
										</div>

										<div className="temps-day">

											<div className="temp-m-day">{this.state.weather.location.localtime}</div>
										</div>
									</li>
									<li className="day old-in">
										<div className="dayname">
											<span>Son Güncelleme Tarihi :</span>
										</div>

										<div className="temps-day">
											<div className="temp-m-day">{this.state.weather.current.last_updated}</div>
										</div>
									</li>
									<li className="day old">
										<div className="dayname">
											<span>Ortalama Sıcaklık :</span>
										</div>
										<div className="temps-day">
											<div className="temp-m-day">{this.state.weather.current.temp_c}°C</div>
										</div>
									</li>
									<li className="day old-in">
										<div className="dayname">
											<span>Fırtına Hızı :</span>
										</div>

										<div className="temps-day">
											<div className="temp-m-day">{this.state.weather.current.gust_kph} km/sa</div>
										</div>
									</li>
									<li className="day old-in">
										<div className="dayname">
											<span>Hissedilen Sıcaklık :</span>
										</div>
										<div className="temps-day">
											<div className="temp-m-day">5°C</div>
										</div>
									</li>

									<li className="day old">
										<div className="dayname">
											<span>Nem Oranı :</span>
										</div>
										<div className="temps-day">
											<div className="temp-m-day">{this.state.weather.current.humidity} %</div>
										</div>
									</li>
									<li className="day old-in">
										<div className="dayname">
											<span>Bulut Oranı :</span>
										</div>
										<div className="temps-day">
											<div className="temp-m-day">{this.state.weather.current.cloud} %</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
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
								<h2 className="title-wb">Günlük Hava Durumu</h2>
							</div>
						</div>
						{this.renderWeather()}
					</div>
				</div>
			</div>
		);
	}
}
