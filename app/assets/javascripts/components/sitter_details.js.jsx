var SitterDetails = React.createClass({
  render() {
    return(
      <div>
        { this.props.sitter.id }
        { this.props.sitter.name }
      </div>
    )
  }
})
