const { form } = layui;
initArtCateList();

// 获取文章分类的列表
function initArtCateList() {
  $.ajax({
    method: "GET",
    url: "/my/article/cates",
    success: function (res) {
      var htmlStr = template("tpl-table", res);
      $("tbody").html(htmlStr);
    },
  });
}

var layer = layui.layer;
// 通过代理的形式，为 form-add 表单绑定 submit 事件
$("body").on("submit", "#form-add", function (e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/my/article/addcates",
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("新增分类失败！");
      }
      initArtCateList();
      layer.msg("新增分类成功！");
      // 根据索引，关闭对应的弹出层
      layer.close(indexAdd);
    },
  });
});
// 为添加类别按钮绑定点击事件
var indexAdd = null;
$("#btnAddCate").on("click", function () {
  indexAdd = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "添加文章分类",
    content: $("#dialog-add").html(),
  });
});

var indexEdit = null;
$("tbody").on("click", ".btn-edit", function () {
  // 弹出一个修改文章分类信息的层
  indexEdit = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "修改文章分类",
    content: $("#dialog-edit").html(),
  });

  var id = $(this).attr("data-id");
  // 发起请求获取对应分类的数据
  $.ajax({
    method: "GET",
    url: "/my/article/cates/" + id,
    success: function (res) {
      form.val("form-edit", res.data);
    },
  });
});
$("body").on("submit", "#form-edit", function (e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/my/article/updatecate",
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("更新分类数据失败！");
      }
      layer.msg("更新分类数据成功！");
      layer.close(indexEdit);
      initArtCateList();
    },
  });
});
//通过代理为删除按钮绑定点击事件
$('tbody').on('click','.btn-del',function () {
  console.log('ok');
  //获得id
  var id = $(this).attr('data-id');
  //弹出删除框
  layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
    //do something
    $.ajax({
      method : 'GET',
      url : '/my/article/deletecate/'+ id,
      success : function (res) {
        if(res.status !== 0){
          return layer.msg('删除分类失败')
        }
        layer.msg('删除分类成功')
        layer.close(index);
        initArtCateList()
      }
    })
  });
})
