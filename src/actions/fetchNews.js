// import React from 'react';
import axios from 'axios';

function fetchNews(category, cb) {

    const params = new URLSearchParams();
    params.append('page', '1');

    axios.post(`http://fakty.ictv.ua/ua/widgets_api/${category}/`, params)
    .then((res) => {

        arguments.length == 2 ? cb(res) : false;      

    })
    .catch((err) => {
        throw new Error('Can\'t fetch the news.');
    })
}

 export {fetchNews};


// lazyLoad = () => {

// }



// const params = new URLSearchParams();
//     params.append('page', '' + currentPage);

//     axios.post(`http://fakty.ictv.ua/ua/widgets_api/${category}/`, params)
//     .then((res) => {
//         let noPage = false;
//         this.state.news.filter(function(item) {
//             return res.data.news[0].id === item.id ? noPage = true : false;
//         });

//         if(onScroll) {
//             if(!noPage) {
//                 const newState = [...this.state.news, ...res.data.news];
                
//                 this.setState({
//                     news: [...this.state.news, ...res.data.news],
//                     currentPage: ++currentPage,
//                     infinitePreloader: false
//                 });
//             } else {
//                 false;
//             }
//         } else {
//             this.setState({
//                 news: res.data.news,
//                 currentPage: 1,
//                 loading: false
//             });
//         }


//         arguments.length == 2 ? cb() : false;

//     })
//     .catch((err) => {
//         console.log(err);
//     })