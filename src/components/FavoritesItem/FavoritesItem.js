import React from 'react';
import {ListItem, List, ListItemSwipeoutActions, ListItemSwipeoutButton, onSwipeoutDeleted} from 'framework7-react';

export const FavoritesItem = (props) => {
    console.log('ITEM PROPS', props);
    const handleClick = () => {
        props.onDelete(props.content.id);
    }
    return (
        <ListItem className="favorite__item" link={`/news/favorites/${props.content.id}`}  swipeout title={`<span class="card__category">${props.content.category}</span><span class="card__title">${props.content.body.title}</span><div class="card__date">${props.content.body.time}</div>`} onSwipeoutDeleted={onSwipeoutDeleted}>
               
            <ListItemSwipeoutActions>
            <ListItemSwipeoutButton onClick={handleClick} delete>
                <i className='icon-Trash' ></i>                 
            </ListItemSwipeoutButton>
            </ListItemSwipeoutActions>
        </ListItem>
    )
}