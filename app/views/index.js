import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout';
import routes from '../routes';
import RouteList from '../views/components/RouteList';
import { authOperations } from '../state/ducks/auth';

import './index.scss';

class App extends Component {
    componentDidMount() {
        this.props.onTtyAutoSignUp()
    }
    
    render() {
        return (
            <Layout>
                <RouteList routes={routes} />
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = {
    onTtyAutoSignUp: authOperations.authCheckState
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

