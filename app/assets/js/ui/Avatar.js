const DefaultAvatar = ({ letter }) => {
  let style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#efefef'
  };

  return (
    <div className="DefaultAvatar" style={style}>
      {letter}
    </div>
  );
};

class Avatar extends React.Component {
  render() {
    let { avatarUrl, name } = this.props.user;

    return (
      <div className="Avatar">
        {avatarUrl ? (
          "Haha"
        ) : (
          <DefaultAvatar letter={name[0]} />
        )}
      </div>
    );
  }
}
