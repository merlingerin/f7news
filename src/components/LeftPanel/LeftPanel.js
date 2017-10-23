import React, { PropTypes } from 'react';
import {Panel, View, Pages, List, ListItem, Page, Navbar } from 'framework7-react';
import {getCurrentRoute} from '../pages/MainViews';

import { connect } from 'react-redux';

export const LeftPanel = (props, context) => {
	function _handleClick(event) {
		switch(event.target.textContent) {
			case 'НОВОСТИ' || 'Новини':
				props.fetchNews('all');
				break;
			case 'Украина' || 'Україна':
				props.fetchNews('ukraine');				
				break;
			case 'Чрезвычайные происшествия' || 'Надзвичайні події':
				props.fetchNews('proisshestvija');
				break;
			case 'Спорт':
				props.fetchNews('sport');
				break;
			case 'Шоу-бизнес' || 'Шоу-бізнес':
				props.fetchNews('showbiz');
				break
			case 'Lifstyle':
				props.fetchNews('lifestyle');
				break;
			case 'Мир' || 'Світ':
				props.fetchNews('svit');
				break;
			case 'Lol':
				props.fetchNews('lol');
				break;
			default:
				props.fetchNews('ukraine');
				break;
		}
		if(getCurrentRoute()) {
			getCurrentRoute().view.back();			
		}
	}
	function setLang(e) {
		props.onChangeLang(e.target.dataset.lang);
	}
	let activeRu = props.currentLang === 'ru_RU' ? 'active' : '';
	let activeUa = props.currentLang === 'uk_UA' ? 'active' : '';
	let menuTitles = props.titles;
	console.log('RPOPS:::', props);
	return (
		<Panel left reveal layout="dark" >
			<View id="left-panel-view" navbarThrough >
				{context.framework7AppContext.theme.ios ? <Navbar title="Left Panel"></Navbar> : null}
				<Pages>
					<Page>
						{context.framework7AppContext.theme.material ? <Navbar className="ictv-logo" title="">
							<div className="ictv-logo__container icon Icons icon-Logo">
								{<i className=""></i>}
							</div>
							</Navbar> : null}
						<List>
							<ListItem className="navbar__link-title" data-category="all" link="/" onClick={_handleClick} title={menuTitles.news} linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title={menuTitles.ukraine} linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title={menuTitles.emergencies} linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title={menuTitles.lol} linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title={menuTitles.world} linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title={menuTitles.lifestyle} linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title={menuTitles.sport} linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title={menuTitles.showbiz} linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__link-title" link="/about/"  title={menuTitles.aboutUs} linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__link-title" link="/favorites/" title={menuTitles.favorites} linkView="#main-view" linkClosePanel></ListItem>
						</List>
						<div className="language__container">
							<span onClick={setLang} data-lang="ru_RU" className={`pannel__language language__rus ${activeRu}`} >РУС</span>						
							<span onClick={setLang} data-lang="uk_UA" className={`pannel__language language__ua ${activeUa}`} >УКР</span>	
						</div>					
					</Page>
				</Pages>
			</View>
		</Panel>
	);
};

LeftPanel.contextTypes = {
	framework7AppContext: PropTypes.object
};

// export default connect(
// 	state => ({
// 		menu: state.Vocabulary.menu
// 	})
// )(LeftPanel)