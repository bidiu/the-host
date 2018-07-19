class VenueSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler(e) {
    this.props.onNameChange(e.target.value);
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

// TODO use stylable elements
class CustomSelect extends React.Component {
  render() {
    let { value, onChange, options } = this.props;

    return (
      <div>
        <select value={value} onChange={e => onChange(e.target.value)}>
          {options.map(op => <option value={op} key={op}>{op}</option>)}
        </select>
      </div>
    );
  }
}
