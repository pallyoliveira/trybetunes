import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.getApi();
  }

  async getApi() {
    this.setState({ loading: true });
    const request = await getUser();
    this.setState({
      user: request,
      loading: false,
      name,
    });
  }

  render() {
    return (
      <header data-testid="header-component" />
    );
  }
}

export default Header;
