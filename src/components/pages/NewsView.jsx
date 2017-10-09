import React from 'react';
import {Page, ContentBlock, Navbar, NavLeft, NavCenter, NavRight, Link, Icon} from 'framework7-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {getCurrentRoute} from '../App';
import {store} from '../../store';

export default class NewsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: store.getState().News[this.props.idx],
            bigFont: store.getState().Options.bigFont
        }
        this.changeFont = this.changeFont.bind(this);
    }

    changeFont() {
        const that = this;

        store.dispatch({type: 'CHANGE_FONT', payload: !that.state.bigFont});
        this.setState({
            bigFont: store.getState().Options.bigFont
        })
    }

    render() {
        console.log('store.getState()', store.getState());
        const title = ReactHtmlParser(this.state.content.body.title);
        const Itext = this.state.content.body.text.replace(this.state.content.body.text.slice(this.state.content.body.text.indexOf('<iframe'), this.state.content.body.text.indexOf('</iframe>')), '');
        // Itext.replace(Itext.slice(Itext))
        const caption = this.state.content.body.text
                        .replace(/\[caption.+\[\/caption\]/g, '')
                        .replace(/\<a.\>\<\/a\>/g, '')
                        .replace(/\<iframe.+\<\/iframe\>/g, '')
                        .replace(/\\n/g, '')
                        .replace(/\<strong\>Смотрите\<\/strong\>.+\<\/a\>\<\/span\>/g, '<p class="read-also">$&!</p>')
                        .replace(/\<blockquote.+\<\/blockquote\>/g, '');

        const text = ReactHtmlParser(caption);
        // console.log('Text', new Date(this.state.content.body.date).getDate());

        return (
            <Page className="NewsView" hideBarsOnScroll>
                <Navbar className="NewsView__navbar">
                    <NavLeft backLink="Back"></NavLeft>
                    <NavCenter></NavCenter>
                    <NavRight>
                        <a className="navbar-icon icon-only link" onClick={this.changeFont} >
                            <i className="icon Icons" style={this.state.bigFont ? {backgroundImage: `url(${require('../../images/icons/AA-big.svg')})`} : {backgroundImage: `url(${require('../../images/icons/AA.svg')})`}}></i> 
                        </a>
                        <a className="navbar-icon icon-only link">
                            <i className="icon Icons" style={{backgroundImage: `url(${require('../../images/icons/star-white.svg')})`}}></i> 
                        </a>
                        <a className="navbar-icon icon-only link">
                            <i className="icon Icons" style={{backgroundImage: `url(${require('../../images/icons/share-white.svg')})`}}></i> 
                        </a>
                    </NavRight> 
                </Navbar>
                <div className="NewsView__img">
                    <img src={this.state.content.body.linkImg} alt={this.state.content.category} />
                </div>
                <ContentBlock className={this.state.bigFont ? 'bigFont' : ''} inner>
                    <div className="card__category">{this.state.content.category}</div>
                    <div className="card__date">{this.state.content.category}</div>
                    <h3 className="news__title">{title}</h3>
                    {text}
                    {/* <p dangerouslySetInnerHTML={{ __html: this.state.content.body.text }}></p> */}
                </ContentBlock>
            </Page>
        )
    };
}