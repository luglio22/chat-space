$(function(){

  function buildHTML(message){
    var html = `<div class="chat-main__message">
                <div class="chat-main__message-name">
                <%= message.user.name %>
                </div>
                <div class="chat-main__message-time">
                <%= message.created_at.strftime('%Y/%m/%d %H:%M') %>
                </div>
                <div class="chat-main__message-body">
                <% if message.content.present? %>
                </div>
                <div class="chat-main__message-body-image">
                <%= message.content %>
                <%= image_tag message.image.url, class: 'lower-message__image' if message.image.present? %>
                <% end %>
                </div>
                </div>
                `
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href + '/messages'
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body--message-list').append(html)
      $(".chat-main__body").animate({scrollTop:$('.chat-main__body--message__list')[0].scrollHeight},500,'swing');
      $('.chat-main__message').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
})
