import React from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';

export const About = () => {
    return (
            <Page className="FavoritesView" hideBarsOnScroll>
                <Navbar title="Избранное" backLink="Back" sliding>
                </Navbar>
                <ContentBlock>

                </ContentBlock>
            </Page>
    );
};
