class Subscription < ApplicationRecord
  validates_presence_of [:user_id, :channel_id]

  belongs_to :user
  belongs_to :channel
end
