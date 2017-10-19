import React, {Component} from 'react';
import {Page, ContentBlock, Navbar, ListItem, List, ListItemSwipeoutActions, ListItemSwipeoutButton, onSwipeoutDeleted, NavLeft, NavCenter} from 'framework7-react';
import {FavoritesItem} from '../FavoritesItem/FavoritesItem';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';


class FavoritesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: props.Favorites
        }
    }

    
    componentWillReceiveProps(nextProps) {
        this.setState({
            favorites: nextProps.Favorites
        })
    }

    renderNews() {
        return this.state.favorites.map((item ,idx) => {
                    let parsedItem = JSON.parse(item);
                    return <FavoritesItem key={parsedItem.id} content={parsedItem} onDelete={this.props.onDeleteItem} />;                              
                })
    }

    render() {
        return (
            <Page className="FavoritesView" hideBarsOnScroll>
                <Navbar sliding>
                    <NavLeft>
                        <a className="navbar-icon icon-only link back" >
                            <IconButton><i className="icon-arrow-black" ></i></IconButton>                                                
                        </a>
                    </NavLeft>
                    <NavCenter>Избранное</NavCenter>
                </Navbar>
                <ContentBlock>
                    <List>
                        { this.state.favorites.length > 0 ? this.renderNews() : <h3 className="empty-list__title">Список пуст.</h3> }
                    </List>
                </ContentBlock>
            </Page>
        )
    }
}

export default connect(
    state => ({
        Favorites: state.Favorites
    }),
    dispatch => ({
        onDeleteItem: (idx) => {
            dispatch({type: 'REMOVE_FAVORITES', payload: idx})
        }
    })
)(FavoritesView);