class SiteController < ApplicationController
  def index

    @current_sitter ||= Sitter.find(session[:sitter_id]) if session[:sitter_id]


  end

  def sitters
  end
end
