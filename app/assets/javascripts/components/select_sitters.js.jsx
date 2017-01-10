var SelectSitters = React.createClass({
  selectSitter(sitter) {
    console.log("you selected " + sitter.id);
    this.props.sittersToMessage(sitter)
  },
  render() {
    var sitterChoices = [];
    for(var i = 0; i < this.props.sitters.length; i++){
      sitterChoices.push(
        <div key={this.props.sitters[i].id}>
          {this.props.sitters[i].name}
          <button className="button" onClick={this.selectSitter.bind(this, this.props.sitters[i])}>Choose this sitter!</button>
        </div>
      )
    }
    return(
      <div>
        {sitterChoices}
      </div>
    )
  }
})
