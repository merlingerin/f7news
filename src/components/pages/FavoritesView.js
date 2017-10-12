import React, {Component} from 'react';
import {Page, ContentBlock, Navbar, ListItem, List, ListItemSwipeoutActions, ListItemSwipeoutButton, onSwipeoutDeleted} from 'framework7-react';
import {FavoritesItem} from '../FavoritesItem/FavoritesItem';
import {connect} from 'react-redux';

class FavoritesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: props.Favorites
        }
    }

    renderNews() {
        return this.state.favorites.map((item ,idx) => {
                    let parsedItem = JSON.parse(item);
                    return <FavoritesItem key={parsedItem.id} content={parsedItem} onDelete={this.props.onDeleteItem} />;                              
                })
    }

    render() {
        console.log(this.state);
        return (
            <Page className="FavoritesView" hideBarsOnScroll>
                <Navbar title="Избранное" backLink="Back" sliding>
                </Navbar>
                <ContentBlock>
                    <List>
                        { this.state.favorites.length > 0 ? this.renderNews() : <h3>Список пуст.</h3> }
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