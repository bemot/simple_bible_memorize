import React, { Component } from 'react';
import data from "./og";

const oneVerse = data.books[61].chapters[4].verses[6].text;
console.log(oneVerse);

class Example1 extends Component {
    render() {
	return (
            <ul>
                {oneVerse}
            </ul>
        );
    }
}
export default Example1;
