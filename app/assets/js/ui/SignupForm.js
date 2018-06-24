/**
 * Signup form
 */
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);

    this.state = { email: '', username: '', name: '', password: '' };
  }

  inputChangeHandler(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitHandler(event) {
    event.preventDefault();
    
    axios.post(`/users`, { ...this.state })
      .then(() => {
        window.location = '/html/home.html';
      })
      .catch(console.error);
  }

  render() {
    let { email, username, name, password } = this.state;

    return (
      <form className="SingupForm" onSubmit={this.submitHandler}>
        <h1 className="h3 mb-3 font-weight-normal h1_form">Sign up</h1>

        {/* email address */}
        <label htmlFor="inputEmail">Email address</label>
        <input type="email" id="inputEmail" className="form-control"
          placeholder="Email address" required autoFocus
          name="email" value={email} onChange={this.inputChangeHandler} />

        {/* username */}
        <label htmlFor="inputUsername">Username</label>
        <input type="text" id="inputUsername" className="form-control"
          placeholder="Username" required
          name="username" value={username} onChange={this.inputChangeHandler} />

        {/* name */}
        <label htmlFor="inputName">Name</label>
        <input type="text" id="inputName" className="form-control"
          placeholder="Name" required
          name="name" value={name} onChange={this.inputChangeHandler} />

        {/* password */}
        <label htmlFor="inputPassword">Password</label>
        <input type="password" id="inputPassword" className="form-control"
          placeholder="Password" required
          name="password" value={password} onChange={this.inputChangeHandler} />

        {/* submit button */}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign up
        </button>
      </form>
    );
  }
}
