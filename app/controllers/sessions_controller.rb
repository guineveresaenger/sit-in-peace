class SessionsController < ApplicationController
  def create
    sitter = Sitter.from_google(env["omniauth.auth"])
    session[:sitter_id] = sitter.id
    redirect_to root_path
  end

  def destroy
    session[:sitter_id] = nil
    redirect_to root_path
  end
end
