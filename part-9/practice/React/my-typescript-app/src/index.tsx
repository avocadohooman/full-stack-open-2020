import React from 'react';
import ReactDOM from 'react-dom';
import ProptTypes from 'prop-types';

interface WelcomeProps {
	name: string;
}

const Welcome = (props: WelcomeProps) => {
	return <h1>Hello, {props.name} </h1>;
};

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById("root"));
