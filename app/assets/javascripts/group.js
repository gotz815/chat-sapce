$(function() {
  var searchList = $("#user-search-result");
  function appendUser(user) {
    var html = `
    <div class=" chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`
    searchList.append(html);
  }
  function appendNoUser(message) {
    var html = `
    <div class="chat-group-users">
      <div class="chat-group-user-22 chat-group-user.clearfix">
        <div class ="list-view">${message}</div>
      </div>
    </div>`
    searchList.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input !== "") {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $('#user-search-result').empty();
        if (users.length !== 0) {
           users.forEach(function(user){
             appendUser(user);
           });
         }
         else {
           appendNoUser("一致するユーザーはいません。");
        }
      })
      .fail(function() {
        alert('通信に失敗しました。');
      })
    }
  });

  var added = $('#chat-group-user-8');
  function AddedUser(userId, userName){
    var html = `
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value='${userId}'>
        <p class='chat-group-user__name'>${userName}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
    added.append(html);
  }

  $("#user-search-result").on('click','.chat-group-user__btn--add', function(e) {
    $(this).parent().remove();
    userId = $(this).data('user-id');
    userName = $(this).data('user-name');
    AddedUser(userId,userName);
  })
  $('#chat-group-user-8').on('click','.js-remove-btn', function() {
    $(this).parent().remove();
  })
});
