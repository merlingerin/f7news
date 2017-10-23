import React from 'react';
import {Page, ContentBlock, Navbar, NavLeft, NavCenter} from 'framework7-react';
import Share from '../Share/Share';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.Vocabulary[props.Options.currentLang].aboutUsView.aboutUs            
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: this.props.Vocabulary[nextProps.Options.currentLang].aboutUsView.aboutUs
        })
    }

    render() {
        return (
                <Page className="AboutUsView" hideBarsOnScroll>
                    <Navbar sliding>
                        <NavLeft>
                            <a className="navbar-icon icon-only link back" >
                                <IconButton><i className="icon-arrow-black" ></i></IconButton>                                                
                            </a>
                        </NavLeft>
                        <NavCenter>
                            {this.state.title}
                        </NavCenter>
                    </Navbar>
                    <ContentBlock className="aboutUs__header">
                            Відтепер усі найцікавіші та найсвіжіші <span className="mark">ФАКТИ України</span> та світу в єдиному мобільному додатку <span className="mark">ФАКТИ ICTV!</span>
                    </ContentBlock>
                    <ContentBlock className="aboutUs__list">
                            <ul className="aboutUs__pros">
                                <li>Читай оперативні новини дня - будь у центрі подій</li>
                                <li>Зберігай цікаві новини</li>
                                <li>Ділись цікавими статтями зі своїми друзями у Facebook та Twitter</li>
                            </ul>
                    </ContentBlock>
                    <ContentBlock className="aboutUs__footer">
                            <p className="confidintation">Політика конфіденційності</p>
                            
                    </ContentBlock>
                    <ContentBlock className="aboutUs__footer">
                            {/* <a href=""> */}
                    </ContentBlock>
                </Page>
        );
    }
};

export default connect(
    state => ({
        Vocabulary: state.Vocabulary,
        Options: state.Options
    })
)(About);
