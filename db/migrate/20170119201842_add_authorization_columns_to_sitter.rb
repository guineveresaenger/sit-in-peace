class AddAuthorizationColumnsToSitter < ActiveRecord::Migration
  def change
    add_column :sitters, :provider, :string
    add_column :sitters, :uid, :string
    add_column :sitters, :oauth_token, :string
    add_column :sitters, :oauth_expires_at, :datetime
  end
end
