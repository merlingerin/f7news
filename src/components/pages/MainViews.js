import React, {PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';          

/*TEST*/
import {
	Framework7App
} from 'framework7-react';

import {routes} from '../../routes';
/*TEST*/

import axios from 'axios';
import { View, Navbar, Pages, Page,
  Views, NavLeft, Link, NavCenter, NavRight,
  infiniteScroll, Icon, Panel
} from 'framework7-react';

import { NewsList } from '../NewsList/NewsList';
// import { LeftPanel } from '../LeftPanel/LeftPanel';
import LeftPanel from '../LeftPanel/LeftPanelUI';
import {connect} from 'react-redux';
import {store} from '../../store';
import {goBack} from 'framework7-redux'


let framework7;
let currentRoute;

export const getFramework7 = () => framework7;
export const getCurrentRoute = () => currentRoute;

class MainViews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            currentPage: 2,
            language: 'ru_RU',
            vocabulary: {},
            // category: 'all',
            category: props.Options.category,
            categoryTitle: 'ГЛАВНЫЕ НОВОСТИ',
            maxPage: false,
            loading: true,
            lazyLoad: false,
            error: false,
            offline: {status: false, text: 'Не удалось загрузить новости'},
            open: false
        }
        this.onInfiniteScroll = this.onInfiniteScroll.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.fetchNews = this.fetchNews.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.renderDate = this.renderDate.bind(this);
        this.onChangeLang = this.onChangeLang.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.apllyMenu = this.apllyMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleToggle = () => this.setState({open: !this.state.open});
    apllyMenu = (open) => this.setState({open: open});
	handleClose = () => this.setState({open: false});

    /*-----------------------------------
    *FETCH NEWS ON LOAD BY CATEGORY
    *-------------------------------------*/
    fetchNews(category, lang, cb)  {
        let currentLang = lang || this.state.vocabulary.data.url;
        this.setState({
            loading: true,
            lazyLoad: true
        })

        const params = new URLSearchParams();
        params.append('page', 1);

        axios.post(`http://fakty.ictv.ua/${currentLang}/widgets_api/${category}/`, params)
        .then((res) => {

            this.setState({
                news: res.data.news,
                category: category,
                loading: false,
                lazyLoad: false
            })
            this.props.onFetchNews(this.state.news)
        !cb ? false : cb();
        })
        .then(() => getFramework7().pullToRefreshDone())
        .catch((err) => {
            throw new Error('Can\'t fetch the news.');
            this.setState({
                error: true,
                loading: false,
                offline: {status: true, text: 'Не удалось загрузить новости'}
            });
        })
    }
    /*-----------------------------------
    *END ./FETCH NEWS ON LOAD BY CATEGORY
    *-------------------------------------*/

    /*-----------------------------------
    *FETCH NEWS ON SCROLL
    *-------------------------------------*/
    fetchNewsOnScroll(category, currentPage, lang, maxPage)  {
        if(this.state.maxPage || this.state.lazyLoad) {
            return false;
        }

        this.setState({
            lazyLoad: true
        });
        let currentLang = lang || this.state.vocabulary.data.url;        
        const params = new URLSearchParams();
        params.append('page', this.state.currentPage);

        axios.post(`http://fakty.ictv.ua/${currentLang}/widgets_api/${category}/`, params)
        .then((res) => {

            res.data.news.filter( (item, idx) => {
                return item.id === this.state.news[0].id ? this.setState({maxPage: true})  : false; 
            })

            if(this.state.maxPage) {
                res.data.news.filter( (item, idx) => {
                    return item.id != this.state.news[0].id ? this.setState({news: [...this.state.news, item]})  : false; 
                });
                return false;
            }
            
            this.setState({
                news: [...this.state.news, ...res.data.news],
                lazyLoad: false,
                currentPage: ++currentPage
            });
            this.props.onAddNews(this.state.news);
        })
        .catch((err) => {
            this.setState({
                error: true,
                loading: false,
                offline: {status: true, text: 'Не удалось загрузить новости'}
            });
            throw new Error('Can\'t load the news on scroll.');
        })
    }
    /*-----------------------------------
    *END ./FETCH NEWS ON SROLL
    *-------------------------------------*/

    /*-----------------------------------
    *CHANGE TITLE
    *-------------------------------------*/
    changeTitle(title) {
        this.setState({
            categoryTitle: title
        })
    }
    /*-----------------------------------
    *END ./CHANGE TITLE
    *-------------------------------------*/

    /*-----------------------------------
    *RENDER DATE OF NEWS
    *-------------------------------------*/
    renderDate(news) {
        let now = new Date().getTime(),
                today = Math.floor(now / (1000  * 60 * 60 * 24)),
                yesterday = Math.floor(now / (1000 * 60 * 60 * 24) - 1);
        let month = new Array(12);
        if(this.state.lang === 'uk_UA') {
            month[0] = "Січ";
            month[1] = "Лют";
            month[2] = "Бер";
            month[3] = "Квіт";
            month[4] = "Трав";
            month[5] = "Черв";
            month[6] = "Лип";
            month[7] = "Серп";
            month[8] = "Вер";
            month[9] = "Жовт";
            month[10] = "Лист";
            month[11] = "Груд";
        } else {
            month[0] = "Янв";
            month[1] = "Фев";
            month[2] = "Март";
            month[3] = "Апр";
            month[4] = "Май";
            month[5] = "Июн";
            month[6] = "Июл";
            month[7] = "Авг";
            month[8] = "Сен";
            month[9] = "Окт";
            month[10] = "Ноя";
            month[11] = "Дек";
        }


        news.map((item, idx) => {

            let newsTime = Math.floor(item.body.date / (60 * 60 * 24));
            const hours = new Date(item.body.date*1000).getHours() < 10 ? '0' + new Date(item.body.date*1000).getHours() : new Date(item.body.date*1000).getHours();
            const minutes = new Date(item.body.date*1000).getMinutes() < 10 ? '0' + new Date(item.body.date*1000).getMinutes() : new Date(item.body.date*1000).getMinutes();
            const itemMonth = month[new Date(item.body.date*1000).getMonth()];
            const day = new Date(item.body.date*1000).getDay();
            const year = new Date(item.body.date*1000).getFullYear();
            if (today === newsTime) {
                item.body.time = `${this.state.vocabulary.data.today}, ${hours}:${minutes}`;
            }
            else if (yesterday === newsTime) {
                item.body.time = `${this.state.vocabulary.data.yesterday}, ${hours}:${minutes}`;            
            }
            else {
            const itemMonth = month[new Date(item.body.date*1000).getMonth()];
                item.body.time = `${day} ${itemMonth} ${year}`;
            }
        });
    }
    /*-----------------------------------
    *END ./RENDER DATE OF NEWS
    *-------------------------------------*/
    componentWillMount() {
        /*================PAINTER STATUSBAR IN APP COLORS==================*/
        if(window.StatusBar) {
            window.StatusBar.backgroundColorByHexString("#FF3500");
        }
        /*================/.END PAINTER STATUSBAR IN APP COLORS==================*/
        
        let lang = '';
        try {
            if(localStorage.getItem('lang')) {
                lang =  localStorage.getItem('lang');       
                this.setState({
                    language: lang,
                    offline: {status: this.state.offline.status, text: this.props.Vocabulary[lang].offline}
                });
            } else {
                lang = this.state.language;
            }
        } catch(err) {
            console.log('Can\'t get(set) a language');
        }
        
        this.setState({
            vocabulary: this.props.Vocabulary[lang],
        });
        this.props.setCurrentLang(lang);

        //CHECK THE INTERNET CONNECTION
        document.addEventListener("offline", onOffline, false);
        function onOffline() {
            this.setState({
                offline: {status: true, text: this.props.Vocabulary[this.state.language].offline},
                loading: false
            })
        }
    }

    componentDidMount() {
        this.fetchNews(this.state.category, this.state.vocabulary.data.url);
    }


    componentWillUpdate(nextProps, nextState) {
        if(this.state.language !== nextState.language) {
            this.fetchNews(this.state.category, nextState.vocabulary.data.url);
            this.setState({
                offline: {status: nextState.offline.status, text: this.props.Vocabulary[nextState.language].offline},
            })
        }
    }

    
    onInfiniteScroll() {
        if(this.state.lazyLoad) return;
        this.fetchNewsOnScroll(this.state.category, this.state.currentPage, this.state.vocabulary.data.url);
    }

    onRefresh() {
        this.fetchNews(this.state.category);
    }

    onChangeLang(lang) {
        this.setState({
            language: lang,
            vocabulary: this.props.Vocabulary[lang]
        });
        this.props.setCurrentLang(lang);
    }

    handleClick() {
        this.fetchNews('all');
    }

    render() {
        if(this.state.news.length > 0) {
                this.renderDate(this.state.news);        
        }

        screen.orientation.lock('portrait').then(function success() {
            console.log("Successfully locked the orientation");
        }, function error(errMsg) {
            console.log("Error locking the orientation :: " + errMsg);
        });
        
        // if(window.codova !== undefined) {
        //     console.log('screenOrientation', window.screenOrientation);            
        // }
        
        const renderNews = () => {
            if(this.state.offline.status) {
                return (
                    <div className="no-connection">
                        <div className="no-connection__container">
                            <i className="offline-icon"></i>
                            <span className="no-connection__text">{this.state.offline.text}</span>
                        </div>
                    </div>
                )
            }
            if(!this.state.offline.status) {
               return (
                    !this.state.loading ? <NewsList setCurrentNews={this.props.setCurrentNews} news={this.state.news} /> : <span className=""></span>
               ) 
            }
        }
            //View animatePages={false}
        return (
            <Framework7App 
                themeType="material"
                swipePanel= "left"
                routes={routes} onFramework7Init={f7 => {framework7 = f7; console.log('Framework7 Object ', framework7);}} 
                onRouteChange={route => currentRoute = route}
            >		
            <Views id="Fucking-view">
                <View id="main-view" main navbarThrough dynamicNavbar={false}  swipeBackPageAnimateShadow={false} swipeBackPageAnimateOpacity={false} url="/"> 
                    <Pages>
                        <Page 
                            hideBarsOnScroll 
                            pullToRefresh 
                            onPtrRefresh={this.onRefresh} 
                            infiniteScroll 
                            onInfinite={this.onInfiniteScroll} 
                            data-ptr-distance="200"
                        >
                            <Navbar>
                                <NavLeft>
                                    <Link icon="icon-Burger icon Icons" onClick={this.handleToggle} /*openPanel="left"*/></Link>
                                </NavLeft>
                                <NavCenter >
                                    <i onClick={this.handleClick} className="icon-Logo"></i>
                                </NavCenter>
                                <NavRight>
                                    <a href="/favorites/" className="navbar-icon icon-only link">
                                        <i className="icon Icons icon-star-white" ></i> 
                                    </a>
                                </NavRight>
                            </Navbar>
                            {renderNews()}
                            {/* !this.state.loading ? <NewsList setCurrentNews={this.props.setCurrentNews} news={this.state.news} /> : <span className=""></span> } */}
                        </Page>
                    </Pages>
                </View>
            </Views>
            <LeftPanel
                apllyMenu ={this.apllyMenu}
                handleClose ={this.handleClose}
                handleToggle ={this.handleToggle}
                open={this.state.open}
                changeTitle={this.changeTitle}
                titles={this.state.vocabulary.menu} 
                onChangeLang={this.onChangeLang} 
                currentLang={this.state.language} 
                fetchNews={this.fetchNews} 
            />
            </Framework7App>

        );
    }
}



MainViews.contextTypes = {
  framework7AppContext: PropTypes.object
};

export default connect(
    state => ({
        News: state.News,
        Options: state.Options,
        Vocabulary: state.Vocabulary
    }),
    dispatch => ({
        onFetchNews: (news) => {
            dispatch({type: 'FETCH_NEWS', payload: news})
        },
        onAddNews: (news) => {
            dispatch({type: 'ADD_NEWS', payload: news})
        },
        setCurrentNews: (news) => {
            dispatch({type: 'SET_CURRENT_NEWS', payload: news})
        },
        setCurrentLang: (lang) => {
            dispatch({type: 'SET_CURRENT_LANG', payload: lang})
        }
    })
)(MainViews);