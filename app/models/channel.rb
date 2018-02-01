class Channel < ApplicationRecord
  validates_presence_of [:title, :yt_channel_id, :user_id]
  validates_uniqueness_of :yt_channel_id

  belongs_to :user
end
