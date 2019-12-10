import React from "react";
import { weatherDesc } from "./weatherCode";
import { connect } from "react-redux";
import { getDayOfWeek } from "../../utils/getDayOfWeek";

class WeatherWidget extends React.Component {
  render() {
    const currentWeather = this.props.currentWeather;
    const weekWeather = this.props.weekWeather;
    const images = require.context('../../assets/weatherIcons', true);

    return (
      <div className="weather">
        <div className="row current">
          <div className="col-md-6">
            <span className="weather-desc">{ currentWeather && weatherDesc(currentWeather.code) }</span>
            <img src={currentWeather ? images(`./${currentWeather.icon}.png`) : ''} alt="icon"/>
            <span className="temp">{ currentWeather && Math.round(currentWeather.temp)}°</span> 
          </div>
          <div className="col-md-6">
            <ul>
              <li>Khả năng có mưa: { currentWeather && currentWeather.pop}%</li>
              <li>Độ ẩm: { currentWeather && currentWeather.rh}%</li>
              <li>Gió: { currentWeather && currentWeather.wind_spd} km/h</li>
            </ul>
          </div>
        </div>
        <div className="row">
          { weekWeather && weekWeather.map((day, index) => 
            {
              let icon = images(`./${day.icon}.png`);

              return (
              <div className="col-md group" key={index}>
                <div className="group-heading">
                  {getDayOfWeek(day.dow)}
                </div>
                <div className="group-content">
                  <img className="icon" src={icon} alt="icon"/>
                </div>
                <div className="">
                  <span className="font-weight-bold">{Math.round(day.max_temp)}°</span>&nbsp;
                  {Math.round(day.min_temp)}°
                </div>
              </div>
              )
            }
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentWeather: state.data.current_weather,
    weekWeather: state.data.week_weather
  }
}
export default connect(mapStateToProps, null)(WeatherWidget)