/**
 * Signup form
 */
class _SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      email: '', username: '', name: '', password: '',
      errors: {
        email: false,
        username: false,
        name: false,
        password: false
      }
    };

    this.errorMsgs = {
      email: 'Must be valid email address, 8 ~ 32 characters long.',
      username: 'Must be 3 ~ 32 characters long.',
      name: 'Must be 3 ~ 32 characters long.',
      password: 'Must be 8 ~ 32 characters long.',
    };
  }

  inputChangeHandler(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitHandler(event) {
    let { addNotification } = this.props;
    event.preventDefault();
    
    axios.post(`/users`, { ...this.state })
      .then(() => {
        window.location = '/html/home.html';
      })
      .catch(err => {
        let payload = err.response.data;
        let message = null;

        if (payload.status === 400) {
          message = 'Please correct invalid inputs.';
          this.setState({ errors: payload.details });
        } else {
          message = payload.details || payload.message;
        }

        addNotification(new NotificationEntry({ message, timeout: 3000 }));
      });
  }

  render() {
    let { email, username, name, password, errors } = this.state;

    return (
      <form className="SingupForm" onSubmit={this.submitHandler}>
        <h1 className="h3 mb-3 font-weight-normal h1_form">Sign up</h1>

        {/* email address */}
        <label htmlFor="inputEmail">Email address</label>
        {errors.email &&
          <div className="SingupForm-err-msg">{this.errorMsgs.email}</div>
        }
        <input type="email" id="inputEmail" className="form-control"
          placeholder="Email address" autoFocus
          name="email" value={email} onChange={this.inputChangeHandler} />

        {/* username */}
        <label htmlFor="inputUsername">Username</label>
        {errors.username &&
          <div className="SingupForm-err-msg">{this.errorMsgs.username}</div>
        }
        <input type="text" id="inputUsername" className="form-control"
          placeholder="Username"
          name="username" value={username} onChange={this.inputChangeHandler} />

        {/* name */}
        <label htmlFor="inputName">Name</label>
        {errors.name &&
          <div className="SingupForm-err-msg">{this.errorMsgs.name}</div>
        }
        <input type="text" id="inputName" className="form-control"
          placeholder="Name"
          name="name" value={name} onChange={this.inputChangeHandler} />

        {/* password */}
        <label htmlFor="inputPassword">Password</label>
        {errors.password &&
          <div className="SingupForm-err-msg">{this.errorMsgs.password}</div>
        }
        <input type="password" id="inputPassword" className="form-control"
          placeholder="Password"
          name="password" value={password} onChange={this.inputChangeHandler} />

        {/* submit button */}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign up
        </button>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          Already have an account? <a href="/html/sign_in.html">Sign in</a>
        </div>
      </form>
    );
  }
}

const SignupForm = withNotifications(_SignupForm);
