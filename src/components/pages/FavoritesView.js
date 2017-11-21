import React, {Component} from 'react';
import {Page, ContentBlock, Navbar, ListItem, List, ListItemSwipeoutActions, ListItemSwipeoutButton, onSwipeoutDeleted, NavLeft, NavCenter} from 'framework7-react';
import {FavoritesItem} from '../FavoritesItem/FavoritesItem';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { store } from '../../store';


class FavoritesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: props.Favorites,
            title: props.Vocabulary[props.Options.currentLang].favoritesView.favorites
        }
    }

    componentDidMount() {
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            favorites: nextProps.Favorites,
            title: nextProps.Vocabulary[nextProps.Options.currentLang].favoritesView.favorites
        })
    }

    renderNews() {
        return this.state.favorites.map((item ,idx) => {
                    return <FavoritesItem key={item.id} content={item} onDelete={this.props.onDeleteItem} />;                              
                })
    }

    render() {

        const emptyListTemplate = () => {
            return (
                <div className="no-favorites">
                    <div className="no-favorites__container">
                        <i className="no-favorites-icon"></i>
                        <span className="no-favorites__text">Збережених новин немає</span>
                    </div>
                </div>
            )
        }

        return (
            <Page className="FavoritesView" hideBarsOnScroll>
                <Navbar sliding>
                    <NavLeft>
                        <a className="navbar-icon icon-only link back" >
                            <IconButton><i className="icon-arrow-black" ></i></IconButton>                                                
                        </a>
                    </NavLeft>
                    <NavCenter>{this.state.title}</NavCenter>
                </Navbar>
                <ContentBlock>
                    <List>
                        { this.state.favorites.length > 0 ? this.renderNews() : emptyListTemplate() }
                    </List>
                </ContentBlock>
            </Page>
        )
    }
}

export default connect(
    state => ({
        Favorites: state.Favorites,
        Vocabulary: state.Vocabulary,
        Options: state.Options
    }),
    dispatch => ({
        onDeleteItem: (idx) => {
            dispatch({type: 'REMOVE_FAVORITES', payload: idx})
        }
    })
)(FavoritesView);