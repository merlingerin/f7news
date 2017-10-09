import React from 'react';
import {List} from 'framework7-react';
import { NewsItem, infiniteScroll, Pages, Page } from '../NewsItem/NewsItem';

export const NewsList = (props) => {
    return (
        <List className="news-list" >
            {props.news.map(
                (item, idx) => {
                    return <NewsItem key={item.id} idx={idx} content={item} />
                }
            )}                        
        </List>
    );
}