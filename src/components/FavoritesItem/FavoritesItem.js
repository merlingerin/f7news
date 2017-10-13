import React from 'react';
import {ListItem, List, ListItemSwipeoutActions, ListItemSwipeoutButton, onSwipeoutDeleted} from 'framework7-react';

export const FavoritesItem = (props) => {
    console.log('ITEM PROPS', props);
    const handleClick = () => {
        props.onDelete(props.content.id);
    }
    return (
        <ListItem link={`/news/favorites/${props.content.id}`}  swipeout title={props.content.body.title} onSwipeoutDeleted={onSwipeoutDeleted}>
            <ListItemSwipeoutActions>
            <ListItemSwipeoutButton onClick={handleClick} delete>
                <i className='icon-Trash' ></i>                 
            </ListItemSwipeoutButton>
            </ListItemSwipeoutActions>
        </ListItem>
    )
}