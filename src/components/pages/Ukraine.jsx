import React from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';

export const Ukraine = () => {
    return (
        <Page>
            <Navbar title="Ukraine" backLink="Back" sliding />
            <ContentBlock inner>
                <p>Here is Ukraine page!</p>
            </ContentBlock>
        </Page>
    );
};
