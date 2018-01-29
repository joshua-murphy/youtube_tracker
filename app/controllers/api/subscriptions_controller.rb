class Api::SubscriptionsController < ApplicationController
  def index
    client = ::Google::APIClient.new
  
    youtube = client.discovered_api('youtube', 'v3')
    client.authorization = nil
    result = client.execute :key => ENV[API_KEY], :api_method => youtube.videos.list, :parameters => {:id => 'oy8zdV8p3kg', :part => 'snippet'}
    result = JSON.parse(result.data.to_json)
  end

end
