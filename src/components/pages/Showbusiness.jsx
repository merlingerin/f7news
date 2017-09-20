import React from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';

export const Showbusiness = () => {
    return (
        <Page>
            <Navbar title="Showbusiness" backLink="Back" sliding />
            <ContentBlock inner>
                <p>Here is Showbusiness page!</p>
            </ContentBlock>
        </Page>
    );
};
