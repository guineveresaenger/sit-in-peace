# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170113195450) do

  create_table "appointments", force: :cascade do |t|
    t.string   "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.boolean  "covered",       default: false
    t.integer  "parent_id"
    t.integer  "sitter_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.boolean  "sent",          default: false
    t.boolean  "reminder_sent", default: false
  end

  add_index "appointments", ["parent_id"], name: "index_appointments_on_parent_id"
  add_index "appointments", ["sitter_id"], name: "index_appointments_on_sitter_id"

  create_table "parents", force: :cascade do |t|
    t.string   "name"
    t.string   "phone"
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sitters", force: :cascade do |t|
    t.string   "name"
    t.string   "phone"
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
