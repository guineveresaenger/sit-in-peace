class Api::V1::AppointmentsController < Api::V1::BaseController

  def index
    respond_with Appointment.all
  end

  def create
    respond_with :api, :v1, Appointment.create(appointment_params)
  end

  def update
    appointment = Appointment.find(params["id"])
    appointment.update_attributes(appointment_params)
    respond_with appointment, json: appointment
  end

  def destroy
    respond_with Appointment.destroy(params[:id])
  end

  private

    def appointment_params
      params.require(:appointment).permit(:id, :description, :start_time, :end_time, :sitter_id, :reminder_sent)
    end
end
