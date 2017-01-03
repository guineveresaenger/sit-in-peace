class AddDefaultFalseToAppintmentCovered < ActiveRecord::Migration
  def change
    change_column_default :appointments, :covered, false
  end
end
