import React from 'react';
import {
	Framework7App
} from 'framework7-react';

import {routes} from '../routes';
import MainViews from './pages/MainViews';

let framework7;
let currentRoute;

export const getFramework7 = () => framework7;
export const getCurrentRoute = () => currentRoute;
export const App = (props) => {	
	//Change themeType to "material" to use the Material theme
	return (
			<Framework7App 
				themeType="material" 
				routes={routes} onFramework7Init={f7 => {framework7 = f7; console.log('Framework7 Object ', framework7);}} 
				onRouteChange={route => currentRoute = route}
			>		
				<MainViews />
			</Framework7App>
	) 
};

