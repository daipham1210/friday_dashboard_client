import React from 'react';
import './App.scss';
import background from "./assets/background.jpg";
import WeatherWidget from "./widgets/weather";
import CurrencyWidget from "./widgets/currency";
import Todos from "./widgets/todos";
import { DateTimeWidget } from "./widgets/datetime";
import 'bootstrap/dist/css/bootstrap.css';
import { getData } from "./api/request";
import { onFetchData } from "./action"; 
import { CircularProgress } from '@material-ui/core'; 
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    getData().then(data => {
      this.props.fetchData(data)
    }).catch(error => {
      console.log(`Encountered error: `, error);
    });
  }

  render() {
    return (
      <div className="container">
        { 
          !this.props.isLoaded &&  
          <div className="loading">
            <CircularProgress />
          </div> 
        }
        <div className="App">
          <img className="background" src={background} alt="background" />
          <div className="row">
            <div className="col-md-8">
              <WeatherWidget />
            </div>
            <div className="col-md-4">
              <DateTimeWidget />
            </div>
          </div>
          <div className="row">
            <CurrencyWidget />
          </div>
          <div className="row row-todo">
            <Todos />
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData: data => {
      dispatch(onFetchData(data))
    }
  }
}
const mapStateToProps = state => {
  return {
    isLoaded: state.isLoaded
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)