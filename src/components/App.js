import React from 'react';
import MainViews from './pages/MainViews';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const App = (props) => {	
	//Change themeType to "material" to use the Material theme
	return (
		<MuiThemeProvider>
			<MainViews />
		</ MuiThemeProvider>
	) 
};

