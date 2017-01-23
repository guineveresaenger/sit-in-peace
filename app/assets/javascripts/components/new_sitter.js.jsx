var NewSitter = React.createClass({
  handleClick() {
    var name = this.refs.name.value;
    var phone = this.refs.phone.value;
    var email = this.refs.email.value;

    $.ajax({
      url:'/api/v1/sitters',
      type: 'POST',
      data: {sitter: {
        name: name,
        phone: phone,
        email: email,
      }},
      success: (sitter) => {
        this.props.handleSubmit(sitter)
      }

    })

  },
  render() {
    return (
      <div>
        <input ref='name' placeholder="Enter the sitter's name" className="input-field"/><br></br>
        <input ref='phone' placeholder='Enter a ten-digit number, e.g. 1234567890' className="input-field"/><br></br>
        <input ref='email' placeholder="Enter the sitter's email" className="input-field"/><br></br>
        <button onClick={this.handleClick} className="button alert">
          Submit
        </button>
      </div>
    )
  }
})
