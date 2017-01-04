# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Appointment.create!([
  {
    description: "THIS WEEK!",
    start_time: DateTime.new(2017,01,05,8)
  },
  {
    description: "NEXT WEEK!",
    start_time: DateTime.new(2017,01,10,8)
  },
  {
    description: "Watch Brendan",
    start_time: DateTime.new(2017,01,03,8)
  },
  {
    description: "SHOULD BE LAST ONE",
    start_time: DateTime.new(2017,01,04,8)
  },

])
