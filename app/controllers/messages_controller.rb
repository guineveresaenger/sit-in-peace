class MessagesController < ApplicationController
  skip_before_filter :verify_authenticity_token
 #skip_before_filter :authenticate_user!, :only => "reply"

  def reply
    message_body = params["Body"]
    from_number = params["From"]
    boot_twilio
    sms = @client.account.messages.create(
      from: ENV["TWILIO_NUMBER"],
      to: from_number,
      body: "Hi! We're sorry, #{from_number}, but this number cannot reach an actual human."
    )

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
