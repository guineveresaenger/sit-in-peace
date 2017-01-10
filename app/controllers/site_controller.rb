class SiteController < ApplicationController
  def index
    @sitters = Sitter.all
  end

  def sitters
  end
end
