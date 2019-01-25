$(function(){

  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}" class="chat-main__message-body"> ` : "" ;
    var html = `<div class="chat-main__message"data-id=${message.id}>
                <div class="chat-main__message-name">
                ${message.name}
                </div>
                <div class="chat-main__message-time">
                ${message.create_time}
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


  //自動更新
  $(function(){
    if(location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(update,5000);
    }
  });
  function update(){
      var message_id = $('.chat-main__message').last().data('id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {id: message_id},
      dataType: 'json'
    })
    .done(function(message){
      message.forEach(function(message){
      var html = buildHTML(message);
      $('.chat-main__body--message-list').append(html);
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight
      })
      })
    })

    .fail(function(){
      alert('自動更新に失敗しました')
    })
  };
});
