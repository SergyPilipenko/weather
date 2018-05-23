import React, {PropTypes} from 'react';
import CurrentLocationWeather from '../CurrentLocationWeather';
import Autocomplete from '../Autocomplete';
import './CityWeather.scss';

class CityWeather extends React.Component {

    constructor() {
        super();
        this.state = {
            city: null
        };

        this.changeCity = this.changeCity.bind(this);
    }

    changeCity(city) {
        this.setState({city: city});
    }

    render() {
        const {city} = this.state;
        return <div className="cityweather-container">
            <CurrentLocationWeather city={city}/>
            <Autocomplete callback={this.changeCity}/>
        </div>;
    }
}

export default CityWeather;
