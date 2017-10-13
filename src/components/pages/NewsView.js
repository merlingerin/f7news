import React from 'react';
import {Page, ContentBlock, Navbar, NavLeft, NavCenter, NavRight} from 'framework7-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {store} from '../../store';
import {connect} from 'react-redux';

class NewsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            bigFont: props.Options.bigFont
        }
        this.changeFont = this.changeFont.bind(this);
        this.addToFavorite = this.addToFavorite.bind(this);
    }

    componentWillMount() {
        let favorites;
        this.props.category ? favorites = this.props.Favorites.map((item) => {return JSON.parse(item)}) : false;  
        
        const news = this.props.category === 'favorites' ? favorites : this.props.News;
        const id = Object.keys(news).filter((item, idx) => {
            return +news[item].id === +this.props.postId ? news[item] : false;
        });
        console.log('props idx', this.props.Favorites.map((item) => {return JSON.parse(item)}));
        
        this.setState({
            content: news[id]
        });    
    }
    componentDidMount() {
        const title = ReactHtmlParser(this.state.content.body.title);
        const caption = this.state.content.body.text
                        .replace(/\[caption.+\[\/caption\]/ig, '')
                        .replace(/<a.><\/a>/ig, '')
                        .replace(/<iframe.+<\/iframe>/ig, '')
                        .replace(/<strong\>Фото.+<\/a>/ig, '')                        
                        .replace(/<strong>Смотрите.+<\/a><\/span>/ig, '<p class="read-also">$&</p>')
                        .replace(/<strong\>Читайте.+<\/a><\/span>/ig, '<p class="read-also">$&</p>')
                        .replace(/<strong>Смотрите:<\/strong>.+<\/a>/ig, '<p class="read-also">$&</p>')
                        .replace(/<strong>Читайте:<\/strong>.+<\/a>/ig, '<p class="read-also">$&</p>')
                        .replace(/\<strong\>Читайте\<\/strong\>:/ig, '<strong>Читайте:</strong>')
                        .replace(/\<strong\>Смотрите\<\/strong\>:/ig, '<strong>Смотрите:</strong>')
                        .replace(/&nbsp;/ig, '')
                        .replace(/(?:\r\n|\r|\n)/g, '<br />')
                        .replace(/\↵/ig, '')
                        .replace(/\\n/ig, '')                        
                        .replace(/\<img.+\>/ig, '')
                        .replace(/\<script.+\<\/script\>/ig, '')
                        .replace(/\<blockquote.+blockquote\>/ig, '')
                        .replace(/\<blockquote.+\<\/blockquote\>/ig, '')
                        .replace(/\<p class=\"read-also\"\>.+?\<\/p\>/ig, '')
                        .replace(/(<br \/>){2,}/g, '<br />');                 
                        // .replace(/[.+<br \/>][^.+<p\/><br \/>]/gi, 'Hello');
                        // .replace(/[^>]\<br \/\>/g, '$&<br />');                                                                          
                        // .replace(/(\<br  \/\>){1,}/g, '<br />');       
        let parsedText = caption.split('<br />')
                                .map(function(item, idx) {
                                        let parsedItem = `<p>${item}</p>`;
                                        
                                        return parsedItem;
                                })
                                .join('<br />').replace(/<p><strong>Фото:<\/strong>.+?<\/p>/g, '')
                                .replace(/<p><strong>Видео:<\/strong>.+?<\/p>/g, '')
                                .replace(/<p><\/span><\/p><\/p>/g, '')
                                .replace(/<p><\/p>/g, '')
                                .replace(/(<p>(<p.+?<\/p>)<\/p>)/gi,'$2')
                                .replace(/<p class="jsna"><\/p><br \/>/gi,'')
                                .replace(/(\<br \/\>){2,}/g, '<br />');
        this.setState({
            title: title,
            parsedText: parsedText
        })  
    }

    changeFont() {
        this.props.onChangeFont(!this.state.bigFont); 
        this.setState({
            bigFont: !this.state.bigFont
        })

    }

    addToFavorite() {
        this.props.onAddFavorite(this.state.content)
    }

    render() {
        console.log(this.props);
        let contentBlock = (type) => {
            if(this.state.content.type === 'videos' && this.state.content.body.linkVideo !== '') {
                return (<div className="NewsView__video" >
                                    <iframe width={window.innerWidth} height={window.innerWidth / 1.5} src={`${this.state.content.body.linkVideo}?rel=0&amp;controls=0&amp;showinfo=0`} frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
                                </div>)
    
            } else {
                return (<div className="NewsView__img" style={{width: window.innerWidth  + 'px', height: (window.innerWidth / 1.5)  + 'px'}}>
                                    <img src={this.state.content.body.linkImg} alt={this.state.content.category} />
                                </div>)
            }
        }
        return (
            <Page className="NewsView" hideBarsOnScroll>
                <Navbar className="NewsView__navbar">
                    <NavLeft backLink="Back"></NavLeft>
                    <NavCenter></NavCenter>
                    <NavRight>
                        <a className="navbar-icon icon-only link" onClick={this.changeFont} >
                            <i className={`icon Icons ${this.state.bigFont ? 'icon-AA-big' : 'icon-AA'}`} ></i> 
                        </a>
                        <a className="navbar-icon icon-only link" onClick={this.addToFavorite}>
                            <i className="icon Icons icon-star-black" ></i> 
                        </a>
                        <a className="navbar-icon icon-only link">
                            <i className="icon Icons icon-share-white"></i> 
                        </a>
                    </NavRight> 
                </Navbar>
                {contentBlock(this.state.content.type)}
                <ContentBlock className={this.state.bigFont ? 'bigFont' : ''} inner>
                    <div className="card__category">{this.state.content.category}</div>
                    <div className="card__date">{this.state.content.body.time}</div>
                    {<h3 className="news__title">{this.state.title}</h3>}
                    {<div className="news__content" dangerouslySetInnerHTML={{ __html: this.state.parsedText }}></div>}
                </ContentBlock>
            </Page>
        )
    };
}

export default connect(
    state => ({
        News: state.News,
        Options: state.Options,
        Favorites: state.Favorites,
    }),
    dispatch => ({
        onAddFavorite: (pieceOfNews) => {
            dispatch({type: 'ADD_FAVORITES', payload: pieceOfNews})
        },
        onChangeFont: (currentSize) => {
            dispatch({type: 'CHANGE_FONT', payload: currentSize})
        }
    })
)(NewsView);