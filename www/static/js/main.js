$(function() {
	$("#GM").click(function(){
		localStorage.clear();
	})
	//试卷名称
	var test="ui1710-2"
	//分数设置 单选2分,多选3分
	var sco1 = 2;
	var sco2 = 3;
	//考试时间设置180分钟
	var t = 0.1 * 60;
	//初始化判断
	if(localStorage.getItem(test)!="off"){
		var timer = setInterval(runTime, 1000);
		//单选框选中
		$("#radio ol").on("click", "li", function() {
			$(this).parent().find("input").prop("checked", false);
			$(this).children("input").prop("checked", true);
		});
		//复选框选中
		$("#checkbox ol").on("click", "li", function(e) {
			if (e.target.tagName == "INPUT") {
				$(this).prop("checked", function(i, val) {
					return !val;
				});
			} else {
				$(this).children("input").prop("checked", function(i, val) {
					return !val;
				});
			}
		});
		//答题后给序号添加选中状态
		$(".testList ol").on("click","li",function(){
			var listNum="#"+$(this).children("input").attr("name");
			$(".listNum").children("a").each(function(){
				if($(this).attr("href")==listNum){
					$(this).addClass("active");
				}
			});
		});
	}else{
		$(".testMain input").attr("disabled",true);
		$(".testSub").html("少侠，胜败乃兵家常事。考试已结束，请下次再来！").addClass("timeOut");
	}
	//计时器
	function runTime() {
		if(localStorage.getItem("timeLeft")==null){
			localStorage.setItem("timeLeft", t);
		}
		if (localStorage.getItem("timeLeft") > 0) {
			t=localStorage.getItem("timeLeft");
			t--;
			localStorage.setItem("timeLeft", t);
			$(".testTime").html(checkTime(Math.floor(t / 60 / 60 % 24)) + ":" + checkTime(Math.floor(t / 60 % 60)) + ":" + checkTime(Math.floor(t % 60)));
		}else if(localStorage.getItem("timeLeft") <= 0){
			clearInterval(timer);
			$(".testMain").submit();
			localStorage.setItem(test, "off");
		}
		// 当数字小于10时候在前面添加个0
		function checkTime(i) {
			if (i < 10) {
				i = "0" + i
			}
			return i
		}
	}
	//按题目数量添加序号
	var len1 = $("#radio .testList").length;
	var len2 = $("#checkbox .testList").length;
	for (var i = 0; i < len1; i++) {
		$("#radioList").append("<a></a>");
	}
	for (var i = 0; i < len2; i++) {
		$("#checkboxList").append("<a></a>");
	}

	//设置序号内容
	$(".listNum").each(function(i) {
		var type = $(this).attr("data-type");
		$(this).children("a").html(function(i) {
			return i + 1;
		}).attr("href", function(i) {
			return "#" + type + i;
		});
	});
	
	//计算原始题目数量分数(共计 10 题,每题 3 分,共计 30 分)
	$(".testTitle-con").html(function() {
		if ($(this).attr("data-type") == "radio") {
			return "( 共计 <b>" + len1 + "</b> 题,每题 <b>" + sco1 + "</b> 分,共计 <b>" + len1 * sco1 + "</b> 分 )";
		} else if ($(this).attr("data-type") == "checkbox") {
			return "( 共计 <b>" + len2 + "</b> 题,每题 <b>" + sco2 + "</b> 分,共计 <b>" + len2 * sco2 + "</b> 分 )";
		}
	});

	//题库序号加ID
	$(".testList").each(function() {
		var id = $(this).parent().attr("id") + $(this).index();
		$(this).attr("id", id);
	});
	//题库选项加name
	$(".testList").children("ol").each(function() {
		var name = $(this).parent().attr("id")
		$(this).find("input").attr("name", name);
	})
	
})