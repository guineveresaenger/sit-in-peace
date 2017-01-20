class ParentsController < ApplicationController
  puts ENV["PARENT_NAME"]
  puts ENV["PARENT_PASSWORD"]

  http_basic_authenticate_with name: "hello", password: "hello"

  def index; end

  def sitters; end

end
