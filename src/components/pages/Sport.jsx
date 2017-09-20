import React from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';

export const Sport = () => {
    return (
        <Page>
            <Navbar title="Sport" backLink="Back" sliding />
            <ContentBlock inner>
                <p>Here is Sport page!</p>
            </ContentBlock>
        </Page>
    );
};
