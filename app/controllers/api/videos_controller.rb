class Api::VideosController < ApplicationController

  before_action :set_channel

  def create
    if @channel.videos.first
      destroy
    end
    video = Video.new(video_params)
    video.save ? ( render json: video ) : ( render json: { errors: video.errors.full_messages.join(',')}, status: 422 )
  end

  def destroy
    @channel.videos.first.destroy
  end

  private

    def video_params
      params.require(:video).permit(:title, :yt_video_id, :published, :thumbnail_url, :views, :likes, :dislikes, :channel_id)
    end

    def set_channel
      @channel = current_user.channels.find(params[:channel_id])
    end

end