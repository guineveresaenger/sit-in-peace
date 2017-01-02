class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.string   "description"
      t.datetime "start_time"
      t.datetime "end_time"
      t.boolean "covered"
      t.belongs_to :parent, index: true
      t.belongs_to :sitter, index: true


      t.timestamps null: false
    end
  end
end
