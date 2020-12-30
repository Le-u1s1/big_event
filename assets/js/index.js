$(function () {
  getUserInfo();

  //退出
  $("#btnLogout").on("click", function () {
    // 提示用户是否确认退出
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem("token");
        // 2. 重新跳转到登录页面
        location.href = "/login.html";

        // 关闭 confirm 询问框
        layer.close(index);
      }
    );
  });
});

function getUserInfo(params) {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      // console.log(res);
      //调用renderAvatar渲染用户头像
      renderAvatar(res.data);
    },
    // complete : function (res) {
    //   console.log(res);
    //   if(res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！'){
    //     localStorage.removeItem('token');
    //     location.href = '/login.html'
    //   }
    // }
  });
}

//渲染用户头像的函数
function renderAvatar(user) {
  // console.log(user);
  // debugger
  //1.获取用户的名称
  var name = user.nickname || user.username;
  //2.设置欢迎文本
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  //3.按需求渲染用户的头像
  if (user.user_pic !== null) {
    // debugger
    //3.1.渲染用户图片头像
    console.log('欢迎樊康乐是'+name);
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    //3.2 渲染文本头像
    // debugger
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
