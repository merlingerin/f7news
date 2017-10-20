import React from 'react';
import {Page, ContentBlock, Navbar, NavLeft, NavCenter, NavRight} from 'framework7-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {store} from '../../store';
import {connect} from 'react-redux';
import Share from '../Share/Share';
import IconButton from 'material-ui/IconButton';

class NewsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            bigFont: props.Options.bigFont,
            addedToFavorite: false,
            shareActive: true
        }
        this.changeFont = this.changeFont.bind(this);
        this.addToFavorite = this.addToFavorite.bind(this);
        this.handleShare = this.handleShare.bind(this);
    }

    componentWillMount() {
 
        //CHECK EXIST NEWS IN FAVORITE OR NOT (for offline work)
        let favorites;
        this.props.category ? favorites = this.props.Favorites.map((item) => {return JSON.parse(item)}) : false;  
        
        const news = this.props.category === 'favorites' ? favorites : this.props.News;

        //CHECK ADDED NEW TO FAVORITE OR NOT
        this.props.Favorites.map((item) => {
            let parsedItem = JSON.parse(item);
            console.log('parsedItem.id', parsedItem.id);
            console.log('this.props.postId', this.props.postId);
            +this.props.postId === +parsedItem.id ? this.setState({addedToFavorite: true}) : false;
        })
        
        // GET CURRENT NEWS CONTENT FROM ALL NEWS
        const id = Object.keys(news).filter((item, idx) => {
            return +news[item].id === +this.props.postId ? news[item] : false;
        });
        console.log('props idx', this.props.Favorites.map((item) => {return JSON.parse(item)})); 
        this.setState({
            content: news[id],
        });

    }
    componentDidMount() { 
        this.props.setCurrentNews('');            

        const title = ReactHtmlParser(this.state.content.body.title);
        console.log('this.state.content.body.text', JSON.stringify(this.state.content.body.text));
        
        const caption = JSON.stringify(this.state.content.body.text)
                            .replace(/<img.+?\/>/ig, '')
                            .replace(/\[caption.+\[\/caption\]/ig, '')
                            .replace(/<iframe.+?<\/iframe>/ig, '')
                            .replace(/<script.+?<\/script>/ig, '')
                            .replace(/\\t/gi, '')
                            .replace(/\&nbsp;/gi, '')
                            .replace(/\[democracy .+\"]/gi, '')
                            .replace(/\\r\\n\\r\\n<strong>Фото:<\/strong>.+?"/gi, '')
                            .replace(/<span title=\\"Читайте:.+<\/a><\/span><\/span>\\r\\n\\r\\n/gi, '')                            
                            .replace(/<span title=\"Читайте:.+<\/a><\/span><\/span>\\r\\n\\r\\n/gi, '')                            
                            .replace(/<strong>Читайте.+\.?<\/a><\/span>\\r\\n/gi, '')                            
                            .replace(/<span>Читайте.+\.?<\/span>/gi, '')                            
                            .replace(/<strong>Фото:.+<\/span>/gi, '')                       
                            .replace(/<strong>Видео:.+<\/span>/gi, '')                       
                            .replace(/<strong>Фото.+"fakty_rm_tinymce\\">.+?<\/a><\/span>?./ig, '') //not inportant
                            .replace(/<strong>Читайте.+<span class="fakty_rm_tinymce">.+?<\/span>\r\n\r\n/ig, '') //not important
                            .replace(/<strong>Читайте.+.+?<\/a><\/span>/ig, '') //not important
                            .replace(/<strong>Читайте.+<a href.+\.?<\/a><\/span>\\r\\n\\r\\n/ig, '')
                            .replace(/\\r\\n\\r\\n<strong>Читайте.+\.?<\/a><\/span>\\r\\n/ig, '')
                            .replace(/\\r\\n<strong>Читайте.+\.?<\/a>\\r\\n/ig, '')
                            .replace(/<strong>Смотрите.+<a href.+\.?<\/a><\/span>\\r\\n\\r\\n/ig, '')
                            .replace(/\\r\\n\\r\\n<strong>Смотрите.+\.?<\/a><\/span>\\r\\n/ig, '')
                            .replace(/\\r\\n<strong>Смотрите.+\.?<\/a>\\r\\n/ig, '')
                            .replace(/\\r\\n/ig, '<br>')
                            .replace(/(<br>){1,}"/gi, '"')
                            .replace(/\\"/gi, '"')                            
                            .replace(/(<br>){3,}/gi, '<br>');
        let parsedText = caption;
                                
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
        this.setState({
            addedToFavorite: !this.state.addedToFavorite,
        });
        if(!this.state.addedToFavorite) {
            this.props.onAddFavorite(this.state.content);        
        } else {
            this.props.removeFavorite(this.state.content.id)
        }
    }
    handleShare() {
        let title = this.state.title[0],
            link = this.state.content.link;

        window.plugins.socialsharing.share(title, null, null, link);
    }

    render() {
        console.log('parsedText', this.state.parsedText);
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
                    <NavLeft>
                        <a className="navbar-icon icon-only link back" >
                            <IconButton><i className="icon-arrow-black" ></i></IconButton>                                                
                        </a>
                    </NavLeft>
                    <NavCenter></NavCenter>
                    <NavRight>
                        <a className="navbar-icon icon-only link" onClick={this.changeFont} >
                            <i className={`icon Icons ${this.state.bigFont ? 'icon-AA-big' : 'icon-AA'}`} ></i> 
                        </a>
                        <a className="navbar-icon icon-only link" onClick={this.addToFavorite}>
                            <i className={`icon Icons ${this.state.addedToFavorite ? 'icon-star-black' : 'icon-star-white'}`} ></i> 
                        </a>
                        <a className="navbar-icon icon-only link" onClick={this.handleShare}>
                            {/* <Share /> */}
                            <i className='icon-share-white' ></i>
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
        },
        setCurrentNews: (news) => {
            dispatch({type: 'SET_CURRENT_NEWS', payload: news})
        },
        removeFavorite: (id) => {
            dispatch({type: 'REMOVE_FAVORITES', payload: id})
        }
    })
)(NewsView);