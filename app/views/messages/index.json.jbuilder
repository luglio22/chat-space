json.array! @new_messages do |message|
json.name          message.user.name
json.create_time      message.created_at.strftime('%Y/%m/%d %H:%M')
json.content       message.content
json.image         message.image.url
json.id            message.id
end