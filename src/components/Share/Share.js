import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';

export default class Share extends Component {
  state = {
    valueSingle: '3',
    valueMultiple: ['3', '5'],
  };

  handleChangeSingle = (event, value) => {
    this.setState({
      valueSingle: value,
    });
  };

  handleChangeMultiple = (event, value) => {
    this.setState({
      valueMultiple: value,
    });
  };

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    });
  }

  render() {
    return (
      <div className="navbar-icon">
        <IconMenu
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
            iconButtonElement={<IconButton><i className="icon Icons icon-share-white" /></IconButton>}
            open={this.state.openMenu}
            onRequestChange={this.handleOnRequestChange}
        >
          <MenuItem value="1" primaryText="Facebook" />
          <MenuItem value="2" primaryText="Twitter" />
          <MenuItem value="3" primaryText="Viber" />
          <MenuItem value="4" primaryText="Другое" />
        </IconMenu>
      </div>
    );
  }
}