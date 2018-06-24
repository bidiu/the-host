class NavBarUser extends React.Component {
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
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">Sign out</a>
          </div>
        </span>
      </div>
    );
  }
}

class NavBarSignin extends React.Component {
  render() {
    return (
      <div>
        <button className="btn btn-outline-success px-4"
          onClick={() => window.location = '/html/sign_up.html'}>
          Join
        </button>
        <a className="nav-link" href="/html/sign_in.html"
          style={{ color: 'rgba(0,0,0,.5)', display: 'inline-block' }}>
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
        <a className="navbar-brand" href="/html/home.html">The Host</a>
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
