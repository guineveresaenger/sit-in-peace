class MessagesController < ApplicationController
  skip_before_filter :verify_authenticity_token
 #skip_before_filter :authenticate_user!, :only => "reply"

  def reply
    message_body = params["Body"]
    from_number = params["From"]
    # find sitter with that phone number
    sitter = Sitter.find_by(phone: from_number[2..11])

    # send the reply
    boot_twilio
    sms = @client.account.messages.create(
      from: ENV["TWILIO_NUMBER"],
      to: from_number,
      body: "Thank you so much for helping me out, #{sitter.name}."
    )

    # update the appointment...!
    appointment = Appointment.find(message_body.to_i)
    appointment.update_attribute(:sitter_id, 9)

    puts message_body.to_i
    puts sitter.name


  end

  def initiate
    boot_twilio
    sitter_number = params['phone']

    body = params['body']
    sms = @client.account.messages.create(
      from: ENV["TWILIO_NUMBER"],
      to: sitter_number,
      body: 'This is posted from Ajax.' + body,
    )
    redirect_to root_path

  end


  private

  def boot_twilio
    account_sid = ENV["ACCOUNT_SID"]
    auth_token = ENV["AUTH_TOKEN"]
    @client = Twilio::REST::Client.new account_sid, auth_token
  end
end
