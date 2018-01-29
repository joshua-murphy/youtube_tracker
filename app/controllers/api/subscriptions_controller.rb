class Api::SubscriptionsController < ApplicationController

  before_action :authenticate_user!

  def index
    render json: current_user.subscription
  end

  def create
    sub = current_user.subscription.new(sub_params)
    render json: ( sub.save ? sub : { sub.errors.full_messages.join(',') }, status: 422 )
  end

  def destroy
    Subscription.find(params[:id]).destroy
  end

  private

    def sub_params
      params.require(:subscription).permit(:user_id, :channel_id)
    end

end