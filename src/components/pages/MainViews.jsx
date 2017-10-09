import React, {PropTypes} from 'react';
import axios from 'axios';

import { View, Navbar, Pages, Page,
  Views, NavLeft, Link, NavCenter, NavRight,
  infiniteScroll, Icon
} from 'framework7-react';

import { NewsList } from '../NewsList/NewsList';
import { LeftPanel } from '../LeftPanel/LeftPanel';
import {getFramework7} from '../App';
import {connect} from 'react-redux';

class MainViews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            currentPage: 2,
            category: 'ukraine',
            categoryTitle: 'ГЛАВНЫЕ НОВОСТИ',
            maxPage: false,
            loading: true,
            lazyLoad: false
        }
        this.onInfiniteScroll = this.onInfiniteScroll.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.fetchNews = this.fetchNews.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.renderDate = this.renderDate.bind(this);
    }

    /*-----------------------------------
    *FETCH NEWS ON LOAD BY CATEGORY
    *-------------------------------------*/
    fetchNews(category, cb)  {

        this.setState({
            loading: true
        })

        const params = new URLSearchParams();
        params.append('page', 1);

        axios.post(`http://fakty.ictv.ua/ru/widgets_api/${category}/`, params)
        .then((res) => {

            this.setState({
                news: res.data.news,
                category: category,
                loading: false
            })
            this.props.onFetchNews(this.state.news)
        !cb ? false : cb();
        })
        .then(() => getFramework7().pullToRefreshDone())
        .catch((err) => {
            throw new Error('Can\'t fetch the news.');
        })
    }
    /*-----------------------------------
    *END ./FETCH NEWS ON LOAD BY CATEGORY
    *-------------------------------------*/

    /*-----------------------------------
    *FETCH NEWS ON SCROLL
    *-------------------------------------*/
    fetchNewsOnScroll(category, currentPage, maxPage)  {
        if(this.state.maxPage || this.state.lazyLoad) {
            return false;
        }

        this.setState({
            lazyLoad: true
        })

        const params = new URLSearchParams();
        params.append('page', this.state.currentPage);

        axios.post(`http://fakty.ictv.ua/ua/widgets_api/${category}/`, params)
        .then((res) => {

           console.log([...this.state.news, ...res.data.news]) 
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
        const now = new Date().getTime();
        news.map((item, idx) => {
            // if ((item.content.time - now) )
            console.log('Date::', (new Date( now ) -  new Date ( item.body.date * 1000 )) > 1000 * 60 * 60 * 24 );        
            // console.log('Date::', 1000 * 60 * 60 * 24);        
        })
    }
    /*-----------------------------------
    *END ./RENDER DATE OF NEWS
    *-------------------------------------*/
    componentDidMount() {
        this.fetchNews(this.state.category);
    }

    componentDidUpdate() {
        console.log('MainView:::', this.state.news);                
    }
    
    onInfiniteScroll() {
        
        if(this.state.lazyLoad) return;
        // this.setState({
        //     lazyLoad: true
        // });
        this.fetchNewsOnScroll(this.state.category, this.state.currentPage);
    }

    onRefresh() {

        this.fetchNews(this.state.category);
    }

    render() {
        if(this.state.news.length > 0) {
                this.renderDate(this.state.news);        
        
        }
        return (
            <Views>
                <View id="main-view" navbarThrough dynamicNavbar={true} main url="/">
                    <Pages>
                        <Page hideBarsOnScroll pullToRefresh onPtrRefresh={this.onRefresh} infiniteScroll onInfinite={this.onInfiniteScroll} data-ptr-distance="200">
                            <Navbar>
                                <NavLeft>
                                    <Link icon="" />
                                </NavLeft>
                                <NavCenter sliding>{this.state.categoryTitle}</NavCenter>
                                <NavRight>
                                    <Link icon="icon-bars" openPanel="left"></Link>
                                </NavRight>
                            </Navbar>
                            { !this.state.loading ? <NewsList news={this.state.news} />  :  <span className=""></span> }
                        </Page>
                    </Pages>
                </View>
                <LeftPanel changeTitle={this.changeTitle} fetchNews={this.fetchNews} />
            </Views>
        );
    }
}

MainViews.contextTypes = {
  framework7AppContext: PropTypes.object
};

export default connect(
    state => ({
        News: state
    }),
    dispatch => ({
        onFetchNews: (news) => {
            dispatch({type: 'FETCH_NEWS', payload: news})
        },
        onAddNews: (news) => {
            dispatch({type: 'ADD_NEWS', payload: news})
        }
    })
)(MainViews);