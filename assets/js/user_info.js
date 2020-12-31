var form = layui.form;
$(function () {
  form.verify({
    nickname: function (value) {
      if (value.length > 10) {
        return "昵称长度必须在 1 ~ 10 个字符之间！";
      }
    },
  });
});

initUserInfo();

// 初始化用户的基本信息
function initUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败！");
      }
      console.log(res);
      form.val("formUserInfo", res.data);
    },
  });
}

//为重置按钮添加点击事件
$("#btnReset").on("click", function (e) {
  //阻止默认事件
  e.preventDefault();
  initUserInfo();
});

$(".layui-form").on("submit", function (e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/my/userinfo",
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        layer.msg(res.message);
        return;
      }
      layer.msg("更新用户信息成功！");
      // 调用父页面中的方法，重新渲染用户的头像和用户的信息
      window.parent.getUserInfo();
    },
  });
});
