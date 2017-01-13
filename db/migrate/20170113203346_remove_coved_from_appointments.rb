class RemoveCovedFromAppointments < ActiveRecord::Migration
  def change
    remove_column :appointments, :covered
  end
end
