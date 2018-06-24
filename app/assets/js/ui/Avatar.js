const DefaultAvatar = ({ letter }) => (
  <div className="DefaultAvatar">
    {letter}
  </div>
);

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
