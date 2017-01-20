class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  helper_method :current_sitter
  # @super_user = http_basic_authenticate_with name: "me", password: "@home"

  def current_sitter
    @current_sitter ||= Sitter.find(session[:sitter_id]) if session[:sitter_id]
  end

end
