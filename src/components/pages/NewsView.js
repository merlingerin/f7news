import React from 'react';
import {Page, ContentBlock, Navbar, NavLeft, NavCenter, NavRight} from 'framework7-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {store} from '../../store';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';

import InstagramEmbed from 'react-instagram-embed';
import { Tweet } from 'react-twitter-widgets';

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
        this.lockedOrientation = this.lockedOrientation.bind(this);
    }

    componentWillMount() {
 
        //CHECK EXIST NEWS IN FAVORITE OR NOT (for offline work)
        let favorites;
        this.props.category ? favorites = this.props.Favorites.map((item) => item) : false;  
        
        const news = this.props.category === 'favorites' ? favorites : this.props.News;

        //CHECK ADDED NEW TO FAVORITE OR NOT
        this.props.Favorites.map((item) => {
            +this.props.postId === +item.id ? this.setState({addedToFavorite: true}) : false;
        })
        
        // GET CURRENT NEWS CONTENT FROM ALL NEWS
        const id = Object.keys(news).filter((item, idx) => {
            return +news[item].id === +this.props.postId ? news[item] : false;
        });
        // console.log('props idx', this.props.Favorites.map((item) => {return JSON.parse(item)})); 
        this.setState({
            content: news[id],
        });

    }
    componentDidMount() { 
        //GET VIDEO STREAM LINK
        if( this.state.content.type === 'videos' ) {
            let splitedUrl = this.state.content.body.linkVideo.split('/');
            let videoID = splitedUrl[+splitedUrl.length - 1];
            axios.get(`https://www.youpak.com/watch?v=${videoID}`)
                .then((res) => {
                    return document.createRange().createContextualFragment(res.data).querySelector('#videoholder').firstElementChild.getAttribute('src');
                })
                .then((data) => {
                    this.setState({
                        streamingURL: data
                    })
                });
        }
        this.parseSocialLink(this.state.content);
        this.props.setCurrentNews('');            
        
        const title = ReactHtmlParser(this.state.content.body.title);
        
        const caption = this.state.content.body.text;
                            // .replace(/\[caption.+\[\/caption\]/ig, '')
                            // .replace(/<blockquote class=\\"instagram-media\\".+?<\/blockquote>/gi, '')                            
                            // .replace(/<iframe src=\\"https:\/\/www.youtube.com.*<\/iframe>/ig, '')
                            // .replace(/<iframe src="https:\/\/www.youtube.com.*<\/iframe>/ig, '')
                            // .replace(/\[democracy .+\"]/gi, '')
                            // .replace(/\r\n/ig, '<br>')
                            // .replace(/<br>{2,}/ig, '<br>')
                            // .replace(/<script.+?<\/script>/ig, '');


        let parsedText = caption;

        this.setState({
            title: title,
            parsedText: parsedText,
        });
        console.log('this.content', this.content.getElementsByClassName('instagram-media')[0]);  
    }

    /*===========CHANGE FONT SIZE==============*/
    changeFont() {
        this.props.onChangeFont(!this.state.bigFont); 
        this.setState({
            bigFont: !this.state.bigFont
        })
    }
    /*===========/.END CHANGE FONT SIZE==============*/
    
    /*===========GET SOCIAL LINKS==============*/
    parseSocialLink(obj) {
        if(obj.facebook) {
            console.log('RETURN FACEBOOK WIDGET', obj.facebook);
            return <div class="fb-post" 
                        data-href="https://www.facebook.com/ukr.embassy.usa/photos/a.437547496288488.96187.211311782245395/1582779478431945/?type=3&theater"
                        style="width:100%;">
                    </div>
        }
        if(obj.instagram) {
            return <InstagramEmbed
                url={'https://instagr.am/p/'+obj.instagram}
                maxWidth={document.innerWidth}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
            />
            console.log('RETURN instagram WIDGET', obj.instagram);            
        }
        if(obj.twitter) {
            console.log('RETURN twitter WIDGET', obj.twitter);    
            return <Tweet
                        tweetId={obj.twitter}
                        options={{theme: "light"}}
                    />        
        }
    }
    createInstagramWidget(obj) {
        console.log('SOCIAL OBJECT', obj);
        // axios('')
        return (
            <div className=""></div>
        )
    }
    /*===========/.END GET SOCIAL LINKS==============*/

    /*===========ADD TO FAVORITE==============*/    
    addToFavorite() {
        this.setState({
            addedToFavorite: !this.state.addedToFavorite,
        });
        if(!this.state.addedToFavorite) {
            this.props.onAddFavorite(this.state.content);        
        } else {
            this.props.removeFavorite(this.state.content.id)
        }
        let video = document.querySelector('#video-frame'); 
    }
    /*===========/.END ADD TO FAVORITE==============*/    
    
    /*===========SHARE NEW==============*/        
    handleShare() {
        let title = this.state.title[0],
            link = this.state.content.link;

        window.plugins.socialsharing.share(title, null, null, link);
    }
    /*===========/.END SHARE NEW==============*/        

    /*===========LOCKED UNLOCKED ORIENTATION==============*/            
    lockedOrientation() {
        screen.orientation.lock('portrait').then(function success() {
            console.log("Successfully locked the orientation");
        }, function error(errMsg) {
            console.log("Error locking the orientation :: " + errMsg);
        });
    }
    /*===========/.END LOCKED UNLOCKED ORIENTATION==============*/            

    render() {
        screen.orientation.unlock();

        /*===========LOG NEWS AFTER PARSE==============*/
        // console.log('parsedText', this.state.parsedText);
        /*===========/.END LOG NEWS AFTER PARSE==============*/

        let contentBlock = (type) => {
            if(this.state.content.type === 'videos' && this.state.content.body.linkVideo !== '') { 
         
                screen.orientation.addEventListener('change', function(){
                    let vid = document.querySelector('#video-frame');
         
                    // vid.controls = !vid.controls;
                    function toggleFullScreen() {
                        if (!document.fullscreenElement &&    // alternative standard method
                            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
                            if (vid.requestFullscreen) {
                            vid.requestFullscreen();
                            } else if (vid.msRequestFullscreen) {
                            vid.msRequestFullscreen();
                            } else if (vid.mozRequestFullScreen) {
                            vid.mozRequestFullScreen();
                            } else if (vid.webkitRequestFullscreen) {
                            vid.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                            }
                        } else {
                            if (document.exitFullscreen) {
                            document.exitFullscreen();
                            } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                            } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                            } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                            }
                        }
                    }
                    if(screen.orientation.type === 'landscape-primary' || screen.orientation.type === 'landscape-secondary') {
                        screen.orientation.unlock();
                        toggleFullScreen(); 
                    }
                    if(screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary') {
                        toggleFullScreen();
                    }
                });
                
                return (
                        <div className="NewsView__video" style={{width: '100%', height: (window.innerWidth / 1.78455)  + 'px'}} >
                            <span className="preloader"></span>
                            <video onClick={(e) => console.log('click', e)} id="video-frame" width="100%" height={window.innerWidth / 1.78455} src={this.state.streamingURL}  allowFullScreen controls></video>
                            {/* <video id="video-frame" width={window.innerWidth} height={window.innerWidth / 1.78455}  src={this.state.streamingURL} autoPlay="autoplay" controls="controls"> */}
                        </div>
                );
    
            } else {
                this.lockedOrientation();
                return (<div className="NewsView__img no-image" style={{width: '100%', height: (window.innerWidth / 1.78455)  + 'px'}}>
                            <img src={this.state.content.body.linkImg} alt={this.state.content.category} />
                        </div>)
            }
        } 
        console.log('CONTENT ', this.state.content);
        
        return (
            <Page className="NewsView" hideBarsOnScroll>
                <Navbar className="NewsView__navbar">
                    <NavLeft>
                        <a onClick={this.lockedOrientation} className="navbar-icon icon-only link back" >
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
                            <i className='icon-share-white' ></i>
                        </a> 
                    </NavRight> 
                </Navbar>
                {contentBlock(this.state.content.type)}
                <ContentBlock className={this.state.bigFont ? 'bigFont' : ''} inner>
                <div className="card__category">{this.state.content.category}</div>
                    <div className="card__date">{this.state.content.body.time}</div>
                    {<h3 className="news__title">{this.state.title}</h3>}
                    {this.parseSocialLink(this.state.content.social)}
                    <div className="news__content"  ref = {c => this.content = c} dangerouslySetInnerHTML={{ __html: this.state.parsedText }}></div>
                    {/* <div className="news__content" >
                       {this.state.parsedText}
                    </div>  */}
                </ContentBlock>
            </Page>
        )
    };
}

/*===========MAP REDUXs STATE AND ACTIONS==============*/            
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
/*===========/.END MAP REDUXs STATE AND ACTIONS==============*/            
