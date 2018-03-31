import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Aux from '../AX';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';
import Classes from './Layout.scss';

const { bool } = PropTypes;

/**
 * Layout for components
 * 
 * @class Layout
 * @extends {React.Component}
 */
class Layout extends React.Component {
    state = {
        showSideDrawer: false,
    }

    static propTypes = {
        showSideDrawer : bool,
        isAuthenticated: bool.isRequired,
    }

    /**
     * Show/hide side drawer
     * 
     * @memberof Layout
     */
    drawerToggleClickedHandler = () => {
        this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }));  
    }    

    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    DrawerToggleClicked={this.drawerToggleClickedHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.drawerToggleClickedHandler} />
                    
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {        
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
