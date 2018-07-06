class VenueSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler(e) {
    this.props.onNameChange(e.target.value.trim());
  }

  render() {
    // venue name (macthing venue's both name and about)
    let { name, onNameChange, onBtnClick } = this.props;

    return (
      <div className="VenueSearchBox ink-popup">
        <input type="text" placeholder="Search something"
          value={name} onChange={this.inputChangeHandler}
          className="VenueSearchBox-input"/>
        <i className="material-icons VenueSearchBox-btn"
          onClick={onBtnClick}>
          search
        </i>
      </div>
    );
  }
}
