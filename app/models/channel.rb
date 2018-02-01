class Channel < ApplicationRecord
  validates_presence_of [:title, :yt_channel_id]

  belongs_to :user
end
