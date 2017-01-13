class SiteController < ApplicationController
  def index
    @sitters = Sitter.all
    @appointments = Appointment.all
  end

  def sitters
  end
end
