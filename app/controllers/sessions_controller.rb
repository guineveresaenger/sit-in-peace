class SessionsController < ApplicationController
  
  def create
    sitter = Sitter.from_omniauth(env["omniauth.auth"])
    if Sitter.find_by(name: sitter.name)
      session[:sitter_id] = Sitter.find_by(name: sitter.name).id
    else
      if sitter.save
        session[:sitter_id] = sitter.id
      else
        flash[:notice] = "Something went wrong with your login. Please contact the site administrator for help if the problem persists."
      end
    end
    redirect_to root_path
  end

  def destroy
    session[:sitter_id] = nil
    redirect_to root_path
  end
end
