json.content    @message.content
json.image      @message.image.url
json.created_at @message.created_at.strftime
json.name       @message.user.name
json.message_id @message.id
