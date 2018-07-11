$(function(){
  function buildHTML(message){
    if (message.image.url == null){
      message.image.url = ""
    }
      var html = `<div class= "message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">${ message.user_name }
                      </div>
                      <div class="upper-message__date">${ message.created_at }
                      </div>
                    </div>
                    <div class="lower-messagge">
                    <p class="lower-messagge__content">${ message.content }
                    </p>
                    <img src="${message.image.url}",size="256">
                    </div>
                  </div>`
      return html;
    }


    function scrollMessage() {
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
    }

    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $('.form__submit').removeAttr('data-disable-with')
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data);
        $(".messages").append(html);
        console.log(html)
        $('#new_message').prop("disable", true);
        $('#new_message')[0].reset();
        scrollMessage()
      });
    });
    function scrollToBottom() {
        $('.chat-body').scrollTop( $('.chat-messages').height() );
    }

    scrollToBottom();

    // 自動更新のために、メッセージのAPIのURLを取得
    var jsonUrlForAutoReload = window.location.href;

    // 自動更新用のURLにchat_groupsとmessageが含まれているかをチェック
    function isJsonUrlForAutoReload(url){
       if (url.indexOf(/\/chat_groups\/d+\/messages/)){
           return true;
       } else {
           return false;
       }
    }

    // もし、chat_groups/:group_id/messagesのurlだったら、（メッセージ画面だったら、)、自動更新を行う
    if(isJsonUrlForAutoReload(jsonUrlForAutoReload)){
        setInterval(function(){
           $.ajax({
               method: 'GET',
               url: jsonUrlForAutoReload,
               dataType: 'json'
           })
               .done(function(data){
                   var html = '';
                   // forEach関数で、配列を一つ一つ処理
                   data.forEach(function(message_new){
                       html += new_message(message_new);
                   });
                   // html関数は、指定した要素を書き換える removeとappendを一緒にする関数
                   $('ul.chat-messages').html(html);
               })
               .fail(function(){
                   // alert('自動更新失敗');
               });
        //    10秒ごとに自動更新
        }, 10 * 1000);
    }
});

