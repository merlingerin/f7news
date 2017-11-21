import React, { PropTypes } from 'react';
import {Panel, View, Pages, List, ListItem, Page, Navbar } from 'framework7-react';
import {getCurrentRoute} from '../pages/MainViews';

import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class LeftPanel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: this.props.open
		}
		this._handleClick = this._handleClick.bind(this);
	}
	_handleClick(event) {
		switch(event.target.textContent) {
			case 'НОВОСТИ' || 'Новини':
				this.props.fetchNews('all');
				break;
			case 'Украина' || 'Україна':
				this.props.fetchNews('ukraine');				
				break;
			case 'Чрезвычайные происшествия' || 'Надзвичайні події':
				this.props.fetchNews('proisshestvija');
				break;
			case 'Спорт':
				this.props.fetchNews('sport');
				break;
			case 'Шоу-бизнес' || 'Шоу-бізнес':
				this.props.fetchNews('showbiz');
				break
			case 'Lifstyle':
				this.props.fetchNews('lifestyle');
				break;
			case 'Мир' || 'Світ':
				this.props.fetchNews('svit');
				break;
			case 'Lol':
				this.props.fetchNews('lol');
				break;
			default:
				this.props.fetchNews('ukraine');
				break;
		}
		if(getCurrentRoute()) {
			getCurrentRoute().view.back();			
		}
		this.props.apllyMenu(!open);
	}
	setLang = (e) => {
		this.props.onChangeLang(e.target.dataset.lang);
	}

	_handleMenu = (open) => {
		this.props.apllyMenu(open);		
	}

	_handleClose = () => {
		this.props.apllyMenu(!open);		
	}

	render() {
		let activeRu = this.props.currentLang === 'ru_RU' ? 'active' : '';
		let activeUa = this.props.currentLang === 'uk_UA' ? 'active' : '';
		let menuTitles = this.props.titles;
		return (
			<Drawer
				className='Menu'
				docked={false}
				width={280}
				swipeAreaWidth={50}
				containerClassName={'Menu_Container'}
				open={this.props.open}
				onRequestChange={(open) => this._handleMenu(open)}
			>
			<div className="ictv-logo__container icon Icons icon-Logo"></div>
						<List>
							<ListItem className="navbar__link-title" data-category="all" link="/" onClick={this._handleClick} title={menuTitles.news} linkView="#main-view"></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={this._handleClick} title={menuTitles.ukraine} linkView="#main-view"></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={this._handleClick} title={menuTitles.emergencies} linkView="#main-view"></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={this._handleClick} title={menuTitles.lol} linkView="#main-view"></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={this._handleClick} title={menuTitles.world} linkView="#main-view"></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={this._handleClick} title={menuTitles.lifestyle} linkView="#main-view"></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={this._handleClick} title={menuTitles.sport} linkView="#main-view"></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={this._handleClick} title={menuTitles.showbiz} linkView="#main-view"></ListItem>
							<ListItem className="navbar__link-title" onClick={this._handleClose} link="/about/"  title={menuTitles.aboutUs} linkView="#main-view" ></ListItem>
							<ListItem className="navbar__link-title" onClick={this._handleClose} link="/favorites/" title={menuTitles.favorites} linkView="#main-view" ></ListItem>
						</List>
						<div className="language__container">
							<span onClick={this.setLang} data-lang="ru_RU" className={`pannel__language language__rus ${activeRu}`} >РУС</span>						
							<span onClick={this.setLang} data-lang="uk_UA" className={`pannel__language language__ua ${activeUa}`} >УКР</span>	
						</div>	
			</Drawer> 
		)
	}
};

LeftPanel.contextTypes = {
	framework7AppContext: PropTypes.object
};

export default connect(
    state => ({
        Options: state.Options,
        Vocabulary: state.Vocabulary
    }),
    dispatch => ({
        handleClose: (open) => {
            dispatch({type: 'OPEN_MENU', payload: open})
        }
    })
)(LeftPanel);