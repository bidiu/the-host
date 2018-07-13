class Popup extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let { open, children } = this.props;

    return (
      <div className={`Popup ${open ? 'Popup-show' : ''}`}>
        <Fade in={open} classNames="Popup-fade">
          {children}
        </Fade>
      </div>
    );
  }
}
