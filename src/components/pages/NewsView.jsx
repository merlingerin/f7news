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
        const title = ReactHtmlParser(this.state.content.body.title);
        const Itext = this.state.content.body.text.replace(this.state.content.body.text.slice(this.state.content.body.text.indexOf('<iframe'), this.state.content.body.text.indexOf('</iframe>')), '');
        // Itext.replace(Itext.slice(Itext))
        const caption = this.state.content.body.text
                        .replace(/\[caption.+\[\/caption\]/ig, '')
                        .replace(/\<a.\>\<\/a\>/ig, '')
                        .replace(/\<iframe.+\<\/iframe\>/ig, '')
                        .replace(/\<strong\>Фото.+\<\/a\>/ig, '')                        
                        .replace(/\<strong\>Смотрите.+\<\/a\>\<\/span\>/ig, '<p class="read-also">$&</p>')
                        .replace(/\<strong\>Читайте.+\<\/a\>\<\/span\>/ig, '<p class="read-also">$&</p>')
                        .replace(/\<strong\>Смотрите:\<\/strong\>.+\<\/a\>/ig, '<p class="read-also">$&</p>')
                        .replace(/\<strong\>Читайте:\<\/strong\>.+\<\/a\>/ig, '<p class="read-also">$&</p>')
                        .replace(/\<strong\>Читайте\<\/strong\>:/ig, '<strong>Читайте:</strong>')
                        .replace(/\<strong\>Смотрите\<\/strong\>:/ig, '<strong>Смотрите:</strong>')
                        .replace(/&nbsp;/ig, '')
                        .replace(/(?:\r\n|\r|\n)/g, '<br />')
                        // .replace(/[(?:\r\n|\r|\n)]{5}/g, '')
                        .replace(/\↵/ig, '')
                        .replace(/\\n/ig, '')                        
                        .replace(/\<img.+\>/ig, '')
                        .replace(/\<script.+\<\/script\>/ig, '')
                        .replace(/\<blockquote.+blockquote\>/ig, '')
                        .replace(/\<blockquote.+\<\/blockquote\>/ig, '')
                        .replace(/\<p class=\"read-also\"\>.+\<\/p\>/ig, '');
        console.log('this.state.content.body.text', this.state.content.body.text.match(/(?:\r\n|\r|\n)/g));
        // const text = ReactHtmlParser(caption, {
        //     transform: function(node) {
        //     if (node.type === 'tag' && node.props.className === 'read-also') {
        //         return null;
        //     }
        //     if (node.type === 'tag' && node.name === 'blockquote') {
        //       return null;
        //     }
        //     if (node.type === 'tag' && node.name === 'iframe') {
        //         return null;
        //     }
        //     if(node.data !== undefined) {
        //         console.log('BEFORE', node.data);
                
        //         node.data
        //             .replace(/&nbsp;/ig, '')
        //             .replace(/(\r\n|\n|\r)/gm, '')
        //             .replace(/\↵/ig, '')
        //             .replace(/\!/ig, '')
        //             console.log('AFTER', node.data);
        //     }
        //   }}); 

        // const contentBlock = (type) => {
        //     if(type === 'videos') {
        //         return (
        //             <div className="NewsView__img NewsView__video">
        //                 <div className="video-container">{this.state.content.body.linkVideo}</div>
        //             </div>
        //         )
        //     } else {
        //         return (
        //             <div className="NewsView__img">
        //                 <img src={this.state.content.body.linkImg} alt={this.state.content.category} />
        //             </div>
        //         )
        //     }
            
        // };
            
        let contentBlock = (type) => {
            if(this.state.content.type === 'videos') {
                return (<div className="NewsView__img NewsView__video">
                                    <iframe width={window.innerWidth} height={window.innerWidth / 1.5} src={`${this.state.content.body.linkVideo}?rel=0&amp;controls=0&amp;showinfo=0`} frameborder="0" allowfullscreen="allowfullscreen"></iframe>
                                </div>)
    
            } else {
                return (<div className="NewsView__img">
                                    <img src={this.state.content.body.linkImg} alt={this.state.content.category} />
                                </div>)
            }
        }

        console.log(window.innerWidth);
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
                {contentBlock(this.state.content.type)}
                <ContentBlock className={this.state.bigFont ? 'bigFont' : ''} inner>
                    <div className="card__category">{this.state.content.category}</div>
                    <div className="card__date">{this.state.content.category}</div>
                    <h3 className="news__title">{title}</h3>
                    {<p dangerouslySetInnerHTML={{ __html: caption }}></p>}                
                </ContentBlock>
            </Page>
        )
    };
}