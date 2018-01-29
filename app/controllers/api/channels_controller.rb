class Api::ChannelsController < ApplicationController
  
  before_action :authenticate_user!
  before_action :set_channel, only: [:show, :destroy]

  def index
    render json: current_user.channels.all
  end

  def show
    render json: @channel
  end

  def create
    channel = current_user.channels.new(channel_params)
    render json: ( channel.save ? channel : { channel.errors.full_messages.join(',') }, status: 422 )
  end

  def destroy
    @channel.destroy
  end

  private

    def channel_params
      params.require(:channel).permit(:title, :yt_channel_id, :profile_image)
    end

    def set_channel
      @channel = current_user.channels.find(params[:id])
    end

end