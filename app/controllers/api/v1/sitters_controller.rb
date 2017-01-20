class Api::V1::SittersController < Api::V1::BaseController
  # before_action :set_sitter, only: [:show, :edit, :update, :destroy]

  def index
    respond_with Sitter.all
  end

  def create
    sitter = Sitter.new(sitter_params)
    if sitter.save
      puts "YAY SITTER CREATED"

    else
      puts "NOOOOOOO YOU CANT USE THE SAME NAME"
    end
    respond_with :api, :v1, sitter
  end

  def update
    sitter = Sitter.find(params["id"])
    sitter.update_attributes(sitter_params)
    respond_with sitter, json: sitter
  end

  def destroy
    respond_with Sitter.destroy(params[:id])
  end

  private
    def sitter_params
      params.require(:sitter).permit(:id, :name, :phone, :email)
    end
end
