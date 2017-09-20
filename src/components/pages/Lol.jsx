import React from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';

export const Lol = () => {
    return (
        <Page>
            <Navbar title="Lol" backLink="Back" sliding />
            <ContentBlock inner>
                <p>Here is Lol page!</p>
            </ContentBlock>
        </Page>
    );
};
