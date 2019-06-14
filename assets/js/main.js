layui.use(['jquery', 'layer', 'element', 'form', 'laydate', 'layedit'], function () {
    var $ = layui.$;
    var layer = layui.layer;
    var element = layui.element;
    var form = layui.form;
    var laydate = layui.laydate;
    var layedit = layui.layedit; // 富文本编辑器

    /************* Header start *************/

    // 登出
    $('#logout>a').on('click', function () {
        layer.confirm('确认退出本系统吗?', function (index) {
            layer.close(index); // 关闭确认框
        });
    });

    /************* Header end *************/

    /************* Left start *************/
    // 切换菜单
    $(document).on('click', '.layui-nav .layui-nav-item a', function () {
        // var that = this;
        var url = $(this).data('url');
        $('#content-iframe').attr('src', url);

        if ($(this).parents('.layui-header').length > 0) {
            // console.log('顶部导航');
            $('.layui-side').find('.layui-this').removeClass('layui-this');
        } else {
            // console.log('左侧导航');
            $('.layui-header').find('.layui-this').removeClass('layui-this');
        }
    });

    // 监听左侧导航点击
    element.on('nav(left)', function (elem) {
        // console.log(elem); //得到当前点击的DOM对象
    });

    // 监听顶部导航点击
    element.on('nav(top)', function (elem) {
        // console.log(elem); //得到当前点击的DOM对象
    });

    /************* Left end *************/


    /************* form start *************/

    // 刷新渲染, 主要用在后期增加的dom上
    // form.render(); //更新全部
    // form.render('select'); //刷新select选择框渲染
    // form.render(null, 'test1'); //更新 lay-filter="test1" 所在容器内的全部表单状态
    // form.render('select', 'test2'); //更新 lay-filter="test2" 所在容器内的全部 select 状态

    // 监听select选择
    form.on('select(test1)', function (data) {
        console.log(data);
    });

    // 监听checkbox复选
    form.on('checkbox(test2)', function (data) {
        console.log(data.elem); //得到checkbox原始DOM对象
        console.log(data.elem.checked); //是否被选中，true或者false
        console.log(data.value); //复选框value值，也可以通过data.elem.value得到
        console.log(data.othis); //得到美化后的DOM对象
    });

    // 监听switch开关
    form.on('switch(test3)', function (data) {
        console.log(data.elem); //得到checkbox原始DOM对象
        console.log(data.elem.checked); //开关是否开启，true或者false
        console.log(data.value); //开关value值，也可以通过data.elem.value得到
        console.log(data.othis); //得到美化后的DOM对象
    });

    // 监听radio单选
    form.on('radio(test4)', function (data) {
        console.log(data.elem); //得到radio原始DOM对象
        console.log(data.value); //被点击的radio的value值
    });

    // 监听submit提交
    form.on('submit(test5)', function (data) {
        console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    // 表单初始赋值
    //formTest 即 class="layui-form" 所在元素对应的 lay-filter="" 对应的值
    form.val('formTest', {
        // title: '初始值',
        // city: 2,
        'like[write]': true // 或者1
    });

    // 表单验证
    // <input type="text" lay-verify="email">
    // 还同时支持多条规则的验证，如下：
    // <input type="text" lay-verify="required|phone|number">

    // 自定义验证规则
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });

    /*
    当你自定义了类似上面的验证规则后，你只需要把 key 赋值给输入框的 lay-verify 属性即可：
    <input type="text" lay-verify="username" placeholder="请输入用户名">
    <input type="password" lay-verify="pass" placeholder="请输入密码">
    * */


    /************* form end *************/


    // 日期
    //执行一个laydate实例
    laydate.render({
        elem: '#test1', //指定元素
        type: 'time' // 类型, 时间
    });


    // 建立编辑器
    layedit.build('edit-demo', {
        height: 200,
        uploadImage: {
            url: '/upload/',
            type: 'post'
        },
        tool: [
            'strong', //加粗
            'italic', //斜体
            'underline', //下划线
            'del', //删除线
            '|', //分割线
            'left', //左对齐
            'center', //居中对齐
            'right', //右对齐
            '|', //分割线
            'link', //超链接
            'unlink', //清除链接
            '|', //分割线
            'face', //表情
            'image', //插入图片
            '|', //分割线
            'help' //帮助
        ]
    });


});