class Api::ChannelsController < ApplicationController
  
  before_action :set_channel, only: [:show, :destroy]

  def index
    render json: Channel.order(created_at: :DESC)
  end

  def show
    render json: @channel
  end

  def create
    channel = Channel.new(channel_params)
    channel.save ? ( render json: channel ) : ( render json: { errors: channel.errors.full_messages.join(',')}, status: 422 )
  end

  def destroy
    @channel.destroy
  end

  private

    def channel_params
      params.require(:channel).permit(:title, :yt_channel_id, :profile_image)
    end

    def set_channel
      @channel = Channel.find(params[:id])
    end

end
