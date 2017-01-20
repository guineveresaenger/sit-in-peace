class SessionsController < ApplicationController
  def create
    sitter = Sitter.from_omniauth(env["omniauth.auth"])
    if sitter.save
      puts "saved"
      session[:sitter_id] = sitter.id

    else
      flash[:notice] = "You already have logged in with a different service; please use that one."
      puts "throw exception"
    end
    redirect_to root_path
  end

  def destroy
    session[:sitter_id] = nil
    redirect_to root_path
  end
end
