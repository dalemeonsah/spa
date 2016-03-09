# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  contacts = Contact.all
  contacts.to_json
end

get '/contacts/:id' do
  contact = Contact.find(params[:id])
  contact.to_json
end

post '/contacts/new' do
  @contact = Contact.new
  @contact.full_name = params[:fullname]
  @contact.email = params[:email]
  @contact.phone = params[:phone]
  
  if @contact.save
    {contact: @contact, success: true}.to_json
  else
    {contact: @contact, success: false}.to_json
  end
end