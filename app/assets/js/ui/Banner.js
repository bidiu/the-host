const withNotifications = (WrappedComponent) => 
  (props) => (
    <NotificationContext.Consumer>
      {({ entries, addNotification, removeNotification }) => (
        <WrappedComponent entries={entries} 
          addNotification={addNotification}
          removeNotification={removeNotification}
          {...props} />
      )}
    </NotificationContext.Consumer>
  );

const { Transition, TransitionGroup, CSSTransition } = ReactTransitionGroup;

const Fade = ({ children, classNames="Fade", timeout = 1000, ...props }) => (
  <CSSTransition
    appear={true}
    mountOnEnter={true}
    unmountOnExit={true}
    classNames={classNames}
    timeout={timeout}
    {...props}>
    {children}
  </CSSTransition>
);

/**
 * base class for Banner and MobileBanner
 */
class AbstractBanner extends React.Component {
  /** close button click handler */
  onCloseClicked = function (e) {
    let removeNotification = this.props.removeNotification;
    let entry = this.props.entry;
    let onClose = entry.onClose;

    removeNotification(entry.id);
    if (typeof onClose === 'function') { onClose(); }
  }.bind(this);

  composeOnClick(handler) {
    return (e) => {
      let removeNotification = this.props.removeNotification;
      let entry = this.props.entry;

      removeNotification(entry.id);
      if (typeof handler === 'function') { handler(e); }
    };
  }

  componentDidMount() {
    let timeout = this.props.entry.timeout;

    if (typeof timeout === 'number') {
      this.timerId = setTimeout(() => {
        this.onCloseClicked();
      }, timeout);
    }
  }

  componentWillUnmount() {
    if (this.timerId) { clearTimeout(this.timerId); }
  }
}

const Banner = withNotifications(
  class extends AbstractBanner {
    render() {
      let { entry } = this.props;

      return (
        <div className="Banner ink-popup font-primary-light bg-color-light">
          <i className="material-icons md-24 Banner-icon">{entry.icon}</i>
          <span className="Banner-text">{entry.message}</span>
          {entry.buttons.map(btn => {
            return React.cloneElement(
              btn, {
                className: 'Banner-button ink-link',
                onClick: this.composeOnClick(btn.props.onClick)
              }
            )
          })}
          <i className="material-icons md-18 Banner-close ink-link-var1"
            onClick={this.onCloseClicked}>
            close
          </i>
        </div>
      );
    }
  }
);

const BannerList = withNotifications(
  ({ entries, displayLimit = 2 }) => {
    // if (viewportType === VIEWPORT_MOBILE) { displayLimit = 1; }
    let entriesToDisplay = entries.slice(0, displayLimit).reverse();
    // let fadeClassNames = viewportType === VIEWPORT_MOBILE ? 
    //   'MobileBanner-Fade' : 
    //   'Banner-Fade';
    let fadeClassNames = 'Banner-Fade';

    return (
      <div className="BannerList">
        <TransitionGroup component={null}>
          {entriesToDisplay.map(entry => (
            <Fade key={entry.id} classNames={fadeClassNames}>
              <Banner entry={entry} />
            </Fade>
          ))}
        </TransitionGroup>
      </div>
    );
  }
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);

    this.state = {
      entries: [],
      addNotification: this.addNotification,
      removeNotification: this.removeNotification
    }
  }

  addNotification(entry) {
    this.setState(({ entries, ...others }) => ({
      entries: [...entries, entry],
      ...others
    }));
  }

  removeNotification(entryId) {
    this.setState(({ entries, ...others }) => {
      let i = entries.map(e => e.id).indexOf(entryId);
      if (i === -1) { return { entries, ...others }; }
      
      // return the next state
      return {
        entries: [...entries.slice(0, i), ...entries.slice(i + 1)],
        ...others
      };
    });
  }

  render() {
    return (
      <NotificationContext.Provider value={this.state}>
        <BannerList />
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}
