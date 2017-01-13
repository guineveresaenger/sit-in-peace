class AddReminderSentToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :reminder_sent, :boolean, :default => false
  end
end
