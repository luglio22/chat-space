$(function(){

  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}" class="chat-main__message-body"> ` : "" ;
    var html = `<div class="chat-main__message">
                <div class="chat-main__message-name">
                ${message.name}
                </div>
                <div class="chat-main__message-time">
                ${message.strftime}
                </div>
                <div class="chat-main__message-body">
                </div>
                <div class="chat-main__message-body-image">
                ${message.content}
                <p>${image}</p>
                </div>
                </div>
                `
    return html;
  }

  $('#submitbutton').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__body').append(html)
      $('.chat-main__message').val('')
      $(".form__submit").removeAttr("disabled");
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight
      })
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
  })
})
