$(function () {
  //点击去注册账号
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击去登录按钮
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 自定义密码框校验规则
  const { form, layer } = layui;
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });

  //注册绑定submit事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      url: "/api/reguser",
      method: "POST",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message || "注册失败");
        }
        layer.msg(res.message || "注册成功");
        $("#link_login").click();
      },
    });
  });

  //登录绑定submit事件\
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success : function (res) {
          if(res.status !== 0){
              return layer.msg('登录失败')
          }
          layer.msg('登录成功');
          //利用本地存储localStorage存储res的token数据
          localStorage.setItem('token',res.token);
          //利用本地跳转到index页面
          location.href = '/index.html';
      }
    });
  });
});
