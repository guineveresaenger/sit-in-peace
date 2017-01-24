class SessionsController < ApplicationController
  def create
    sitter = Sitter.from_omniauth(env["omniauth.auth"])


    if Sitter.find_by(name: sitter.name)
      puts "sitter already exists"
      session[:sitter_id] = Sitter.find_by(name: sitter.name).id

    else
      if sitter.save
        puts "saved"
        session[:sitter_id] = sitter.id

      else
        flash[:notice] = "You already have logged in with a different service; please use that one."
        puts "throw exception"
      end
    end
    redirect_to root_path
  end

  def destroy
    session[:sitter_id] = nil
    redirect_to root_path
  end
end
