class MessagesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def reply
    boot_twilio
    message_body = params["Body"]
    from_number = params["From"]
    # find sitter with that phone number
    sitter = Sitter.find_by(phone: from_number[2..11])
    # find appointment by reply message.
    appointment = Appointment.find(message_body.to_i)

    #if there is already sitter_id, tell sitter appointment is covered, and don't update sitter id.
    if appointment.sitter_id
      # find actual sitter
      # TODO: if sitter just replied twice, tell them they've already accepted this commitment. Don't share the covering sitter's name.
      covering_sitter = Sitter.find(appointment.sitter_id)
      @client.account.messages.create(
        from: ENV["TWILIO_NUMBER"],
        to: from_number,
        body: "Thank you so much for offering, #{sitter.name}! However, #{covering_sitter.name} is already helping me on this one."
      )
    else # send confirmation and update sitter_id
      @client.account.messages.create(
        from: ENV["TWILIO_NUMBER"],
        to: from_number,
        body: "Thank you so much for helping me out, #{sitter.name}. You're on the schedule. I'll send you a reminder the day before."
      )
      appointment.update_attribute(:sitter_id, sitter.id)
      # also send confirmation to Parent (me!!)
      @client.account.messages.create(
        from: ENV["TWILIO_NUMBER"],
        to: ENV["PARENT_NUMBER"],
        body: "#{sitter.name} is taking care of an appointment for you."
      )
    end
  end

  def initiate
    boot_twilio
    sitter_number = params['phone']
    date = DateTime.parse(params['start_time'])
    body = "Hello, this is Guinevere. I was hoping you might be available for watching Brendan? Details below. #{date.strftime("%B %-d at %l%P")}: #{params['description']}. If you can do this, please reply with the following number: #{params['appointment_id']} "
    @client.account.messages.create(
      from: ENV["TWILIO_NUMBER"],
      to: sitter_number,
      body: body,
    )

    redirect_to parents_index_path

  end

  def remind
    boot_twilio
    # logger.debug "sent reminder!"

    # TODO fix time zone issue with Time.now grrrr

    appointments = Appointment.where(start_time: ((Time.now-8.hours)..((Time.now - 8.hours) + 1.day)))

    appointments.each do |appointment|
      puts "HEY APPOINTMENT"
      puts appointment.description
      if ((appointment.start_time - 1.day) < Time.now) && (appointment.sitter_id) && (appointment.reminder_sent == false)
        # find sitter
        if Sitter.find(appointment.sitter_id)
          sitter = Sitter.find(appointment.sitter_id)
        else
          next
        end
        body = "Hello, this is Guinevere, sending you a reminder about babysitting Brendan tomorrow. Details: #{appointment.start_time.strftime("%B %-d at %l%P")}: #{appointment.description}. Thanks again and see you soon!"
        @client.account.messages.create(
          from: ENV["TWILIO_NUMBER"],
          to: sitter.phone,
          body: body,
        )
        appointment.update_attribute(:reminder_sent, true)
      end
    end
  end

  private

  def boot_twilio
    account_sid = ENV["TWILIO_ACCOUNT_SID"]
    auth_token = ENV["TWILIO_AUTH_TOKEN"]
    @client = Twilio::REST::Client.new account_sid, auth_token
  end
end
