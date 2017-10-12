import React from 'react';
import {ListItem, List, ListItemSwipeoutActions, ListItemSwipeoutButton, onSwipeoutDeleted} from 'framework7-react';

export const FavoritesItem = (props) => {
    console.log('ITEM PROPS', props);
    return (
        <ListItem swipeout title={props.content.body.title} onSwipeoutDeleted={onSwipeoutDeleted}>
            <ListItemSwipeoutActions>
            <ListItemSwipeoutButton delete>
                <i className='icon-Trash' ></i>                 
            </ListItemSwipeoutButton>
            </ListItemSwipeoutActions>
        </ListItem>
    )
}