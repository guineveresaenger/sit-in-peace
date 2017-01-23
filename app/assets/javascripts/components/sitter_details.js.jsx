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

  cancelEdit() {
    console.log("clicked Cancel Edit");
    this.setState({editable: !this.state.editable})
  },

  render() {
    var name = this.state.editable ? <input type='text' ref='name' defaultValue={this.props.sitter.name} /> : <h5>{this.props.sitter.name}</h5>;
    var phone = this.state.editable? <input type='text' ref='name' defaultValue={this.props.sitter.phone} /> :
    <p>{this.props.sitter.phone}</p>
    var email = this.state.editable? <input type='text' ref='name' defaultValue={this.props.sitter.email} /> :
    <p>{this.props.sitter.email}</p>

    return(
      <div className="sitter-list">
        <div className="top-spacing"></div>
        {name}
        {phone}
        {email}
          <button onClick={this.handleDelete} className='button alert'>Delete</button> <button onClick={this.handleEdit} className='button'> {this.state.editable ? 'Submit' : 'Edit' } </button>
          {this.state.editable ? <button onClick={this.cancelEdit} className="button secondary">Cancel Edit</button> : null}
      </div>
    )
  }
})
