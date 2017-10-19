import React from 'react';
import {ListItem, Icon} from 'framework7-react';

export const NewsItem = (props) => {
    const {content} = props;
    // const date = new Date(content.body.date);

    const styles = {
        backgroundImage: `url(`+content.body.linkImg+`)`,
        backgroundSize: 'cover',
    }
    const _handleClick = () => {
        props.setCurrentNews(props);
    }
    const Container = function() {
        return (
            <div className="img__container" style={styles}>
            </div>
        )
    }
    // const context = JSON.stringify(content.body);
    return (
        <div className="Card-container" onClick={_handleClick}>
            {/* <Icon onClick={handleClick} className="save-news ictv-icon" ></Icon>         */}
            <ListItem className="Card" link={`/news/${content.id}/`} >
                { Container() }
                <div className="card__footer">
                    <div className="footer__title"><h3 className="mainView-title" dangerouslySetInnerHTML={{ __html: content.body.title }}></h3><div className="card__category">{content.category}</div></div>
                    <div className="footer__date card__date">{content.body.time}</div>
                </div>
            </ListItem>
        </div>
    )
}