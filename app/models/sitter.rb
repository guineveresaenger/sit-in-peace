class Sitter < ActiveRecord::Base
  has_many :appointments

  validates :name, uniqueness: true

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |sitter|
      sitter.provider = auth.provider
      sitter.uid = auth.uid
      sitter.name = auth.info.name
      sitter.oauth_token = auth.credentials.token
      sitter.oauth_expires_at = Time.at(auth.credentials.expires_at)
      return sitter
    end
  end

end
