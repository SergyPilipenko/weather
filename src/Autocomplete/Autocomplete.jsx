import React, {PropTypes} from 'react';
import fetchJsonp from 'fetch-jsonp';
import './Autocomplete.scss';

class Autocomplete extends React.Component {

    constructor() {
        super();
        this.state = {
            data: null,
            value: ''
        };

        this.suggestCities = this.suggestCities.bind(this);
        this.selectCity = this.selectCity.bind(this);
    }

    suggestCities(event) {
        // Updating state of local value.
        this.setState({value: event.target.value});

        if (!event.target.value || event.target.value.length < 3) {
            return;
        }

        fetchJsonp('http://gd.geobytes.com/AutoCompleteCity?q=' + event.target.value)
            .then((response) => {
                return response.json()
            }).then((json) => {
            this.setState({data: json});
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    selectCity(event) {
        // Getting correct city name.
        const value = event.currentTarget.textContent.substr(0, event.currentTarget.textContent.indexOf(','));

        // Changing value.
        this.setState({data: null, value: value});

        if (this.props.callback) {
            this.props.callback(value);
        }
    }

    render() {
        let {data, value} = this.state;
        let cities = '';
        let input = '';
        if (data) {
            cities = data.map(item => <li key={item} onClick={this.selectCity}>{item}</li>);
        }

        return <div className="autocomplete-container">
            <input onChange={this.suggestCities} value={value} placeholder="Search city..."/>
            <ul>
                {cities}
            </ul>
        </div>;
    }
}

Autocomplete.propTypes = {
    callback: PropTypes.func
};
Autocomplete.defaultProps = {};

export default Autocomplete;
