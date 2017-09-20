import React from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';

export const World = () => {
    return (
        <Page>
            <Navbar title="World" backLink="Back" sliding />
            <ContentBlock inner>
                <p>Here is World page!</p>
            </ContentBlock>
        </Page>
    );
};
