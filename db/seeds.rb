# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Appointment.destroy_all
Sitter.destroy_all

sitter_one = Sitter.create!(
  {
    name: "Me",
    phone: "2065187269",
    email: "me@awesome.com"
  }
)

sitter_two = Sitter.create!(
  {
    name: "Myself",
    phone: "2065187269",
    email: "myself@better.com"
  }
)

Sitter.create!(
  {
    name: "andI",
    phone: "2065187269",
    email: "not_andy@meh.com"
  }
)

sitter_one.appointments.create!([
  {
    description: "THIS WEEK!",
    start_time: DateTime.new(2017,1,16,8),
  },
  {
    description: "Watch Brendan",
    start_time: DateTime.new(2017,1,17,8),
  }]
)

sitter_two.appointments.create!(
  {
    description: "NEXT WEEK!",
    start_time: DateTime.new(2017,1,24,8)
  }
)

Appointment.create!({
    description: "SHOULD BE LAST ONE",
    start_time: DateTime.new(2017,1,18,8),
})
