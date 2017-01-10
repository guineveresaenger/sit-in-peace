# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Appointment.destroy_all

Appointment.create!([
  {
    description: "THIS WEEK!",
    start_time: DateTime.new(2017,1,9,8),
    sitter_id: 6
  },
  {
    description: "Watch Brendan",
    start_time: DateTime.new(2017,1,10,8),
    sitter_id: 6
  },
  {
    description: "NEXT WEEK!",
    start_time: DateTime.new(2017,1,17,8)
  },
  {
    description: "SHOULD BE LAST ONE",
    start_time: DateTime.new(2017,1,11,8),
    sitter_id: 7
  },

])

Sitter.create!([
  {
    name: "Me",
    phone: "2065187269",
    email: "me@awesome.com"
  },
  {
    name: "Myself",
    phone: "2065187269",
    email: "myself@better.com"
  },
    name: "andI",
    phone: "2065187269",
    email: "not_andy@meh.com"
  ])
