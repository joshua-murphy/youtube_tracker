class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.string :title, null: false
      t.string :yt_channel_id, null: false
      t.string :profile_image, default: ''

      t.timestamps
    end
  end
end
