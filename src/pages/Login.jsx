import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
    this.alteraName = this.alteraName.bind(this);
    this.btnSave = this.btnSave.bind(this);
  }

  // Ao clicar no botão Entrar, utilize a função createUser da userAPI para salvar o nome digitado. A função createUser espera receber como argumento um objeto com as informações da pessoa:
  async btnSave() {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, redirect: true });
  }

  alteraName({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  render() {
    const MAX_LENGTH = 3;
    const { name, loading, redirect } = this.state;

    if (loading) return <Loading />;
    if (redirect) return <Redirect exact to="/search" />; // Ajuda do Pablo no uso do Redirect https://reactrouter.com/web/api/Redirect
    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          value={ name }
          onChange={ this.alteraName }
          name="name"
        />
        <button
          type="submit"
          onClick={ this.btnSave }
          data-testid="login-submit-button"
          disabled={ name.length < MAX_LENGTH }
          // https://stackoverflow.com/questions/60634427/how-i-can-disable-and-enable-button-based-on-user-input-in-textinput-component
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
