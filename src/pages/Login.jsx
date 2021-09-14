import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    this.alteraName = this.alteraName.bind(this);
  }

  alteraName({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  click() {
    this.createUser(user);
  }

  render() {
    const MAX_LENGTH = 3;
    const { name } = this.state;
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
          onClick={ this.click }
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
