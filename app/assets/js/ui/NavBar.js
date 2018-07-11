class NavBarUser extends React.Component {
  constructor(props) {
    super(props);
    this.signoutHandler = this.signoutHandler.bind(this);
  }

  signoutHandler(event) {
    axios.get('/auth/signout')
      .then(() => {
        window.location = '/html/home.html';
      })
      .catch(console.err);
  }

  render() {
    let { user } = this.props;

    let style = {
      cursor: 'pointer'
    };

    let nameStyle = {
      'WebkitAppearance': 'initial',
      'verticalAlign': 'initial'
    };

    return (
      <div style={style}>
        <a href={`/html/user.html?userId=${user._id}`}>
          <Avatar user={user} />
        </a>
        <span className="dropdown">
          <div className="btn" type="button" id="dropdownMenuButton" style={nameStyle}
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {user.name}
          </div>
          <div className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
            onClick={this.signoutHandler}>
            <div className="dropdown-item">Sign out</div>
          </div>
        </span>
      </div>
    );
  }
}

class NavBarSignin extends React.Component {
  render() {
    return (
      <div className="NavBarSignin">
        <button className="btn btn-outline-success px-4"
          onClick={() => window.location = '/html/sign_up.html'}>
          Join
        </button>
        <a className="nav-link" href="/html/sign_in.html">
          or sign in
        </a>
      </div>
    );
  }
}

class NavBar extends React.Component {
  render() {
    let { curPath } = this.props;
    let user = getCurUser();

    return (
      <nav className="NavBar navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <a className="navbar-brand" href="/html/home.html"><img src="/img/logo5.png"/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {/* faq tab */}
            <li className={`nav-item ${curPath === '/html/faqs.html' ? 'active' : ''}`}>
              <a className="nav-link" href="/html/faqs.html">FAQ</a>
            </li>

          </ul>
          {user && <NavBarUser user={user} />}
          {!user && curPath !== '/html/sign_in.html' && curPath !== '/html/sign_up.html'
            && (<NavBarSignin />)
          }
        </div>
      </nav>
    );
  }
}

/** all common components are in this file, since almost all pages will need import this file */

class ThostFooter extends React.Component {
  render() {
    return (
      <div className="ThostFooter">
        <div>
          <div className="ThostFooter-block">
            <div className="ThostFooter-block-title">
              The Host
            </div>
            <div>
              <a href="#">About Us</a>
            </div>
            <div>
              <a href="#">Careers</a>
            </div>
            <div>
              <a href="#">Diversity & Belonging</a>
            </div>
          </div>
          <div className="ThostFooter-block">
            <div className="ThostFooter-block-title">
              Hosting
            </div>
            <div>
              <a href="#">Become a Host</a>
            </div>
            <div>
              <a href="#">Why Host</a>
            </div>
            <div>
              <a href="#">Hospitality</a>
            </div>
            <div>
              <a href="#">Responsible Hosting</a>
            </div>
          </div>
          <div className="ThostFooter-block">
            <div className="ThostFooter-block-title">
              Discover
            </div>
            <div>
              <a href="#">Trust & Safety</a>
            </div>
            <div>
              <a href="#">Local Experience</a>
            </div>
            <div>
              <a href="#">Thost Citizen</a>
            </div>
            <div>
              <a href="#">Events</a>
            </div>
          </div>
          <div className="ThostFooter-block">
            <div className="ThostFooter-block-title">
              Legal
            </div>
            <div>
              <a href="#">Terms of Use</a>
            </div>
            <div>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="ThostFooter-copy">
          &copy; The Host, 2018
        </div>
      </div>
    );
  }
}
