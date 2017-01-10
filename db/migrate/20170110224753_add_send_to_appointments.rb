class AddSendToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :sent, :boolean, :default => false
  end
end
