import React from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';

export const Lifestyle = () => {
    return (
        <Page>
            <Navbar title="Lifestyle" backLink="Back" sliding />
            <ContentBlock inner>
                <p>Here is Lifestyle page!</p>
            </ContentBlock>
        </Page>
    );
};
