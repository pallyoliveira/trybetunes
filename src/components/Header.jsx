import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
    this.userExibe = this.userExibe.bind(this);
  }

  componentDidMount() {
    this.getApi();
  }

  async getApi() {
    this.setState({ loading: true });
    const request = await getUser();
    this.setState({
      loading: false,
      user: request,
    });
  }

  userExibe() {
    const { user } = this.state;
    // user possui as chaves: name, email, description e image
    return (
    // ✓ Será validado se o nome da pessoa usuária está presente na tela após o retorno da API
      <span data-testid="header-user-name">{user.name}</span>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : this.userExibe()}
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
