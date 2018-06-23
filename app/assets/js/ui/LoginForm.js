class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);

    this.state = { username: '', password: '' };
  }

  inputChangeHandler(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitHandler(event) {
    event.preventDefault();
    
    let { username, password } = this.state;

    axios.get(`/auth/signin?username=${username}&password=${password}`)
      .then(console.log)
      .catch(console.error);
  }

  render() {
    let { username, password } = this.state;

    return (
      <form className="form-signin" onSubmit={this.submitHandler}>
        <h1 className="h3 mb-3 font-weight-normal h1_form">Sign in</h1>

        {/* username */}
        <label htmlFor="inputEmail" className="sr-only">Username or email address</label>
        <input type="text" id="inputEmail" className="form-control signin-email" 
          placeholder="Username or email address" required autoFocus
          name="username" value={username} onChange={this.inputChangeHandler} />

        {/* password */}
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" 
          placeholder="Password" required
          name="password" value={password} onChange={this.inputChangeHandler} />

        {/* submit button */}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    );
  } // end of render
}
