class Api::UsersController < ApplicationController

  def change_theme
    user = User.find(params[:id])
    user.toggle(:dark_theme).save
    render json: { theme: user.dark_theme }
  end

end
