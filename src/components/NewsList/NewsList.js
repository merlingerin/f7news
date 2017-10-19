import React from 'react';
import {List} from 'framework7-react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { NewsItem, infiniteScroll, Pages, Page } from '../NewsItem/NewsItem';

export const NewsList = (props) => {

    return (
        <List className="news-list" >
            <CSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                    {props.news.map(
                        (item, idx) => {
                            return <NewsItem key={item.id} setCurrentNews={props.setCurrentNews} idx={idx} content={item} />
                        }
                    )}
            </CSSTransitionGroup>                  
        </List>
    );
}