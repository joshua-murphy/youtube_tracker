class Channel < ApplicationRecord
  validates_presence_of [:title, :yt_channel_id, :user_id]

  belongs_to :user
  has_many :videos, dependent: :destroy
end
