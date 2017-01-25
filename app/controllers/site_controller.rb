class SiteController < ApplicationController
  force_ssl if: :ssl_configured?

  def ssl_configured?
    !Rails.env.development?
  end
  
  def login; end

  def index
    @error = flash[:notice]
    @current_sitter ||= Sitter.find(session[:sitter_id]) if session[:sitter_id]
  end

  def privacypolicy; end

end
