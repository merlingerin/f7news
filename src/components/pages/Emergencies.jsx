import React from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';

export const Emergencies = () => {
    return (
        <Page>
            <Navbar title="Emergencies" backLink="Back" sliding />
            <ContentBlock inner>
                <p>Here is Emergencies page!</p>
            </ContentBlock>
        </Page>
    );
};
