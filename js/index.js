

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 27) { // 按 Esc
        //要做的事情
        alert("esc");
    }
    if (e && e.keyCode == 113) { // 按 F2
        //要做的事情
        alert("f2");
    }
    if (e && e.keyCode == 70) { // enter 键
        //要做的事情
        // alert("enter");
        var searchWord = prompt("请输入检索单词", ""); //将输入的内容赋给变量 name ，
        if(searchWord != null && searchWord != ''){
            window.open("https://www.baidu.com/s?wd="+searchWord);
        }

        //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值
        // if (name)//如果返回的有内容
        // {
        //     alert("欢迎您：" + name)
        // }
    }
};