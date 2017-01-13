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

    # find appointment by reply message.
    appointment = Appointment.find(message_body.to_i)
    # TODO: only update if sitter_id is null!!! otherwise, send back a different sms!
    appointment.update_attribute(:sitter_id, sitter.id)

  end

  def initiate
    boot_twilio
    sitter_number = params['phone']

    body = "Hello, this is Guinevere. I was hoping you might be available for watching Brendan? Details below. #{params['date']} @ #{params['hour']}: #{params['description']}. If you can do this, please reply with the following number: #{params['appt_id']} "
    sms = @client.account.messages.create(
      from: ENV["TWILIO_NUMBER"],
      to: 2065187269,
      body: "test",
    )
    sms = @client
    redirect_to root_path

  end

  def remind
    boot_twilio


    appointments = Appointment.all
    appointments.each do |appointment|
      if ((appointment.start_time - 1.day) < Time.now) && (appointment.coveresitter_id != 'null') && (appointment.reminder_sent == false)
        # find sitter
        sitter = Sitter.find(appointment.sitter_id)
        body = "Hello, this is Guinevere, sending you a reminder about babysitting Brendan tomorrow. Details: #{appointment.start_time.strftime("%B %-d at %l%P")}: #{appointment.description}. Thanks again and see you soon!"
        @client.account.messages.create(
          from: ENV["TWILIO_NUMBER"],
          to: 2065187269,
          body: "I should get another."
        )
        puts "IS THE ERROR HERE?"
        appointment.update_attribute(:reminder_sent, true)
        puts "END ERROR???"
      end
    end
  end

  private

  def boot_twilio
    account_sid = ENV["ACCOUNT_SID"]
    auth_token = ENV["AUTH_TOKEN"]
    @client = Twilio::REST::Client.new account_sid, auth_token
  end
end
