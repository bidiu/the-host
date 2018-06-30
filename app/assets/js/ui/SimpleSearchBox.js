class SimpleSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);

    this.state = { venueType: '' };
  }

  inputChangeHandler(event) {
    let { value } = event.target;

    this.setState({ venueType: value });
  }

  submitHandler(event) {
    event.preventDefault();

    let { venueType } = this.state;
    venueType = venueType.trim();
    if (venueType) {
      window.location = `/html/search.html?type=${venueType}`;
    } 
  }
  
  render() {
    let { venueType } = this.state;

    let btnStyle = {
      backgroundColor: '#aaa',
      width: '100px',
      height: '46px'
    };

    return (
      
      <form className="SimpleSearchBox" onSubmit={this.submitHandler}>
        <input type="text" placeholder="Search a venue here !" value={venueType} onChange={this.inputChangeHandler}/>
        <input type="submit" value="Search" />
        <i className="fa fa-search fa-lg fa-fw" aria-hidden="true"></i>
      </form>
    
    );
  }
}
