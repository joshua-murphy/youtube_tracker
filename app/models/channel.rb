class Channel < ApplicationRecord
  validates_presence_of [:title, :yt_channel_id]

  has_many :subscriptions
  has_many :users, through: :subscriptions
end
