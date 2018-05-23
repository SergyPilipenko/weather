import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {Autocomplete, CurrentLocationWeather, CityWeather, ReactWeather} from '../src';

storiesOf('React Weather', module)
    .add('ReactWeather', () => (
        <ReactWeather city="Kiev"/>
    ))
    .add('Autocomplete', () => (
        <Autocomplete/>
    ))
    .add('CurrentLocationWeather', () => (
        <CurrentLocationWeather/>
    ))
    .add('CityWeather', () => (
        <CityWeather/>
    ));
