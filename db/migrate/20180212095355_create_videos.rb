class CreateVideos < ActiveRecord::Migration[5.1]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.string :published, null: false
      t.string :yt_video_id, null: false
      t.string :thumbnail_url, null: false
      t.integer :views, default: 0
      t.integer :likes, default: 0
      t.integer :dislikes, default: 0
      t.belongs_to :channel, foreign_key: true

      t.timestamps
    end
  end
end
