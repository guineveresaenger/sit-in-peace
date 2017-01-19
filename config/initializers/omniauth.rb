OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '915352720138-m0tulre5ridtfasp1gh6u0jqk09mo4t0.apps.googleusercontent.com', 'c6YghbWJYP0EA7eiZkt_IbZc', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end
