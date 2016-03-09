class AddContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :full_name      
      t.string :email
      t.string :phone
    end
  end
end
