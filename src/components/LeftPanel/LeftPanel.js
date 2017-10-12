import React, { PropTypes } from 'react';
import {Panel, View, Pages, List, ListItem, Page, Navbar } from 'framework7-react';
import {getCurrentRoute} from '../pages/MainViews';

export const LeftPanel = (props, context) => {
	function _handleClick(event) {
		switch(event.target.textContent) {
			case 'НОВОСТИ':
				props.fetchNews('all');
				break;
			case 'Украина':
				props.fetchNews('ukraine');				
				break;
			case 'Чрезвычайные происшествия':
				props.fetchNews('proisshestvija');
				break;
			case 'Спорт':
				props.fetchNews('sport');
				break;
			case 'Шоу-бизнес':
				props.fetchNews('showbiz');
				break
			case 'Lifstyle':
				props.fetchNews('lifestyle');
				break;
			case 'Мир':
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
							<ListItem className="navbar__link-title" link="/" onClick={_handleClick} title="НОВОСТИ" linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title="Украина" linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title="Чрезвычайные происшествия" linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title="Lol" linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title="Мир" linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title="Lifstyle" linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title="Спорт" linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__sublink-title" link="/" onClick={_handleClick} title="Шоу-бизнес" linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__link-title" link="/about/"  title="ПРО НАС" linkView="#main-view" linkClosePanel></ListItem>
							<ListItem className="navbar__link-title" link="/favorites/" onClick={_handleClick} data-context='{"title": "СОХРАНЁННЫЕ", "category": "features"}' title="Избранное" linkView="#main-view" linkClosePanel></ListItem>
						</List>
					</Page>
				</Pages>
			</View>
		</Panel>
	);
};

LeftPanel.contextTypes = {
	framework7AppContext: PropTypes.object
};