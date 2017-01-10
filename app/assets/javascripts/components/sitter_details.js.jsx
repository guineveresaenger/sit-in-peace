var SitterDetails = React.createClass({
  getInitialState() {
    return {editable: false}
  },
  handleDelete() {
    this.props.handleDelete(this.props.sitter.id)
  },

  handleEdit(){
    this.setState({editable: !this.state.editable});
    if(this.state.editable) {
      var name = this.refs.name.value;
      var phone = this.props.sitter.phone;
      var email = this.props.sitter.email;
      var sitter = {
        id: this.props.sitter.id,
        name: name,
        phone: phone,
        email: email
      }
      this.props.handleEdit(sitter);
    };
    this.setState({editable: !this.state.editable});
  },

  render() {
    var name = this.state.editable ? <input type='text' ref='name' defaultValue={this.props.sitter.name} /> : <h5>{this.props.sitter.name}</h5>;

    return(
      <div>
        { this.props.sitter.id }
        {name}
          <button onClick={this.handleDelete} >Delete</button> <button onClick={this.handleEdit}> {this.state.editable ? 'Submit' : 'Edit' } </button>
      </div>
    )
  }
})
