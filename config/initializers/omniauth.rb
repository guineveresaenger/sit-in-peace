OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["GOOGLE_CLIENT_ID"], ENV["GOOGLE_CLIENT_SECRET"], {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end

# Rails.application.config.middleware.use OmniAuth::Builder do
#   provider :facebook, ENV["FACEBOOK_APP_ID"], ENV["FACEBOOK_APP_SECRET"], {:client_options => {:ssl => {:ca_file => Rails.root.join("cacert.pem").to_s}}}
# end
