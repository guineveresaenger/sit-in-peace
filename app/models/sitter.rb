class Sitter < ActiveRecord::Base
  has_many :appointments

  def self.from_google(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |sitter|
      sitter.provider = auth.provider
      sitter.uid = auth.uid
      sitter.name = auth.info.name
      sitter.oauth_token = auth.credentials.token
      sitter.oauth_expires_at = Time.at(auth.credentials.expires_at)
      sitter.save!
    end
  end

  def self.from_facebook(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |sitter|
      sitter.provider = auth.provider
      sitter.uid = auth.uid
      sitter.name = auth.info.name
      sitter.oauth_token = auth.credentials.token
      sitter.oauth_expires_at = Time.at(auth.credentials.expires_at)
      sitter.save!
    end
  end

end
