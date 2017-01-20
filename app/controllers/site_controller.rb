class SiteController < ApplicationController
  def login; end

  def index
    @error = flash[:notice]
    @current_sitter ||= Sitter.find(session[:sitter_id]) if session[:sitter_id]
  end

end
