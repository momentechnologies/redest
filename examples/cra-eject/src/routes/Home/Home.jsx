import React, { Component } from 'react';
import { Redest } from 'redest';
import './home.css';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1>Contributers</h1>
                <ul>
                    {this.props.contributers.entities.map(user => {
                        return <li key={user.id}>{user.name}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Redest(Home, () => ({
    contributers: 'all',
}));
