class Api::SubscriptionsController < ApplicationController

  before_action :authenticate_user!

  def index
    render json: current_user.channels
  end

end