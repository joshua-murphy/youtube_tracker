json.array! @channels do |channel|
  json.id channel.id
  json.profile_image channel.profile_image
  json.title channel.title
  json.yt_channel_id channel.yt_channel_id
  json.video channel.videos.last
  json.created_at channel.created_at
end