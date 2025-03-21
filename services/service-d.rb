require 'sinatra'
require 'net/http'

set :environment, :production

get '/d' do
  uri = URI('http://service-e:5004/e')
  res = Net::HTTP.get_response(uri)
  "Service D -> #{res.body}"
end

