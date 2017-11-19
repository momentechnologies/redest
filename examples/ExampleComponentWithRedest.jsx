import React from 'react';
import { Redest } from 'redest';
import MainLayout from './MainLayout';

class Wrapper extends React.Component {
    componentWillMount() {
        document.title = this.props.clubInfo.data.name;
    }
    render() {
        return <MainLayout />;
    }
}

export default Redest(Wrapper, () => ({
    users: 'all',
}));
