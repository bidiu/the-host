class _SimpleSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);

    this.state = { venueName: '' };
  }

  inputChangeHandler(event) {
    let { value } = event.target;

    this.setState({ venueName: value });
  }

  submitHandler(event) {
    event.preventDefault();

    let { venueName } = this.state;
    venueName = venueName.trim();

    if (venueName) {
      window.location = `/html/search.html?name=${venueName}`;
    } else {
      let message = 'Please input something before searching.';
      this.props.addNotification(new NotificationEntry({ message, timeout: 3000 }));
    } 
  }
  
  render() {
    let { venueName } = this.state;

    return (
      <div className="SimpleSearchBox" onSubmit={this.submitHandler}>
        <input type="text" placeholder="Search a venue here!"
          value={venueName} onChange={this.inputChangeHandler}
          className="SimpleSearchBox-input"/>
        <i className="material-icons SimpleSearchBox-btn"
          onClick={this.submitHandler}>
          search
        </i>
      </div>
    );
  }
}

const SimpleSearchBox = withNotifications(_SimpleSearchBox);
