import React, {PropTypes} from 'react';
import axios from 'axios';
import ReactWeather from '../ReactWeather';

class CurrentLocationWeather extends React.Component {
    constructor() {
        super();
        this.state = {
            name: null,
            temp: null,
        };
    }

    componentDidMount() {
        if (!this.state.name) {
            this.getWeather();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.city != prevProps.city) {
            this.getWeather();
        }
    }

    getWeather() {
        if (this.props.city) {
            this.getWeatherByCityName();
        }
        else {
            this.getWeatherByGeolocation();
        }
    }

    getWeatherByCityName() {
        this.getWeatherData({q: this.props.city})
    }

    getWeatherByGeolocation() {
        const geolocation = navigator.geolocation;
        const component = this;

        new Promise((resolve, reject) => {
            if (!geolocation) {
                reject('Geolocation is not supported');
            }

            geolocation.getCurrentPosition((position) => {
                resolve(position);
            }, () => {
                reject('Geolocation failed - permission denied');
            });
        }).then((data) => {
            component.getWeatherData({lat: data.coords.latitude, lon: data.coords.longitude})
        });
    }

    getWeatherData(params) {
        const {appid, units} = this.props;

        axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: Object.assign({
                APPID: appid,
                units,
            }, params),
        }).then((response) => {
            const {data} = response;
            this.setState({
                name: data.name,
                temp: data.main.temp,
                status: (data.clouds && data.clouds.all || data.rain) > 50 ? 'cloud' : 'sun'
            });
        });
    }

    render() {
        const {name, temp, status} = this.state;

        if (!name) {
            return <div>Detecting your geolocation...</div>
        }

        return <ReactWeather city={name} temp={temp} status={status}/>;
    }
}

CurrentLocationWeather.propTypes = {
    city: PropTypes.string,
    appid: PropTypes.string.isRequired,
    units: PropTypes.string,
};

CurrentLocationWeather.defaultProps = {
    appid: '40c593d9a5b09d0b583d7b5698d48d1f',
    units: 'metric',
};

export default CurrentLocationWeather;
