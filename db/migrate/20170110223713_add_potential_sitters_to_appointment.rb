class AddPotentialSittersToAppointment < ActiveRecord::Migration
  def change
    add_column :appointments, :pot_sitters, :array, :default => []
  end
end
