/*-------------------------- +
  »ñÈ¡id, class, tagName
 +-------------------------- */
var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};
var dragMinWidth	= "250px";
var dragMinHeight	= "124px";
var dragMinTop		= "0px";
var dragMinLeft		= "0px";
/*-------------------------- +
  ÍÏ×§º¯Êý
 +-------------------------- */
function drag(oDrag, handle,isTips)
{
	var disX = dixY = 0;
	var oMin = get.byClass("min", oDrag)[0];
	var oMax = get.byClass("max", oDrag)[0];
	var oRevert = get.byClass("revert", oDrag)[0];
	var oClose = get.byClass("close", oDrag)[0];
	if(isTips != null)
		oClose.setAttribute("isTips",isTips);
	handle = handle || oDrag;
	//handle.style.cursor = "move";
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		disX = event.clientX - oDrag.offsetLeft;
		disY = event.clientY - oDrag.offsetTop;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
			var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
			
			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);
			//iL >= maxL && (iL = maxL);
			//iT >= maxT && (iT = maxT);
			oDrag.style.left = iL + "px";
			oDrag.style.top = iT + "px";
			
			return false
		};
		
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	};	
	//×î´ó»¯°´Å¥
	oMax.onclick = function ()
	{
		oDrag.style.top = oDrag.style.left = 0;
		oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
		oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
		this.style.display = "none";
		oRevert.style.display = "block";
	};
	//»¹Ô­°´Å¥
	oRevert.onclick = function ()
	{
		oDrag.style.width = dragMinWidth;
		oDrag.style.height = dragMinHeight;
		oDrag.style.left = dragMinLeft;
		oDrag.style.top = dragMinTop;
		this.style.display = "none";
		oMax.style.display = "block";
	};
	//×îÐ¡»¯°´Å¥
	oMin.onclick = function ()
	{
		oDrag.style.display = "none";
		var oA = document.createElement("a");
		oA.className = "open";
		oA.href = "javascript:;";
		oA.title = "»¹Ô­";
		document.body.appendChild(oA);
		oA.onclick = function ()
		{
			oDrag.style.display = "block";
			document.body.removeChild(this);
			this.onclick = null;
		};
	};

	//¹Ø±Õ°´Å¥
	oClose.onclick = function (event)
	{
		if($event(event).getAttribute("isTips") == "1")
		{
			if(!window.confirm("未保存是否关闭，是直接关闭，否不关闭�?"))
				return false;
		}
		oDrag.style.display = "none";
		/*
		var oA = document.createElement("a");
		oA.className = "open";
		oA.href = "javascript:;";
		oA.title = "»¹Ô­";
		document.body.appendChild(oA);
		oA.onclick = function ()
		{
			oDrag.style.display = "block";
			document.body.removeChild(this);
			this.onclick = null;
		};*/
		endCovered();
		if(typeof(closePopupDefineFunc) == "function")
			closePopupDefineFunc();
		/*处理tip 框不隐藏问题*/
		if(typeof(hideAllErrInfo) == "function")
			 hideAllErrInfo();
		phpHide('99','none');

	};
	//×èÖ¹Ã°ÅÝ
	oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event)
	{
		this.onfocus = function () {this.blur()};
		(event || window.event).cancelBubble = true	
	};
}
/*-------------------------- +
  ¸Ä±ä´óÐ¡º¯Êý
 +-------------------------- */
function resize(oParent, handle, isLeft, isTop, lockX, lockY,isResize)
{
	if(isResize)
	{
		handle.onmousedown = function (event)
		{
			var event = event || window.event;
			var disX = event.clientX - handle.offsetLeft;
			var disY = event.clientY - handle.offsetTop;	
			var iParentTop = oParent.offsetTop;
			var iParentLeft = oParent.offsetLeft;
			var iParentWidth = oParent.offsetWidth;
			var iParentHeight = oParent.offsetHeight;
			
			document.onmousemove = function (event)
			{
				var event = event || window.event;
				
				var iL = event.clientX - disX;
				var iT = event.clientY - disY;
				var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
				var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;			
				var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
				var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
				
				isLeft && (oParent.style.left = iParentLeft + iL + "px");
				isTop && (oParent.style.top = iParentTop + iT + "px");
				
				iW < dragMinWidth && (iW = dragMinWidth);
				iW > maxW && (iW = maxW);
				lockX || (oParent.style.width = iW + "px");
				
				
				iH < dragMinHeight && (iH = dragMinHeight);
				iH > maxH && (iH = maxH);
				lockY || (oParent.style.height = iH + "px");
				$(oParent).find(".content")[0].style.height = (iH-40)+"px";

				if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
				
				return false;	
			};
			document.onmouseup = function ()
			{
				document.onmousemove = null;
				document.onmouseup = null;
			};
			return false;
		}
	}
};

function openWin(nW,nH,id,bol,isTips,defaultTop,isAdaption)
{
	var oDrag = document.getElementById(id);
	
	/*************新增点击周边空白处弹出隐藏开始 by dyf*****************/
	// document.onclick = function (ev){
	// 	var oEvent=ev||event;
	// 	var dom = oEvent.target||oEvent.srcElement;
	// 	if(dom.id == 'coveredDIV'){
	// 		oDrag.style.display = "none";
	// 		endCovered();
	// 	}
	// }
	/*************新增点击周边空白处弹出隐藏结束*****************/
	oDrag.style.width = nW + "px";
	oDrag.style.display = "";
	if(isAdaption)
	{
		if($(oDrag).find('.content').prop("scrollHeight")<$("body").height()-200)
		{
			if($(oDrag).find('.content').prop("scrollHeight") == 0)
				oDrag.style.height = ($(oDrag).find('.content').height()+100) + "px";
			else
				oDrag.style.height = ($(oDrag).find('.content').prop("scrollHeight")+100) + "px";
		}
			
		else
			oDrag.style.height = ($("body").height()-50);
		//$(oDrag).find('.content')[0].style.height = ($("body").prop("scrollHeight") - 40) + "px";
	}
	else
	{
		oDrag.style.height= nH +"px";
		$(oDrag).find('.content')[0].style.height = (nH - 70)+"px";
	}
	
	
	var oTitle = get.byClass("title", oDrag)[0];
	var oL = get.byClass("resizeL", oDrag)[0];
	var oT = get.byClass("resizeT", oDrag)[0];
	var oR = get.byClass("resizeR", oDrag)[0];
	var oB = get.byClass("resizeB", oDrag)[0];
	var oLT = get.byClass("resizeLT", oDrag)[0];
	var oTR = get.byClass("resizeTR", oDrag)[0];
	var oBR = get.byClass("resizeBR", oDrag)[0];
	var oLB = get.byClass("resizeLB", oDrag)[0];
	
	drag(oDrag, oTitle,isTips);
	//ËÄ½Ç
	resize(oDrag, oLT, true, true, false, false,false);
	resize(oDrag, oTR, false, true, false, false,false);
	resize(oDrag, oBR, false, false, false, false,false);
	resize(oDrag, oLB, true, false, false, false,false);
	//ËÄ±ß
	resize(oDrag, oL, true, false, false, true,false);
	resize(oDrag, oT, false, true, true, false,false);
	resize(oDrag, oR, false, false, false, true,false);
	resize(oDrag, oB, false, false, true, false,false);
	if(bol)startCovered(oDrag);
	
	oDrag.style.left = ($('body:first').width() - oDrag.offsetWidth) / 2 + "px";
	var oSubH=$('#'+id).parent().height()- oDrag.offsetHeight;
	var oSubH1=$(window).height()- oDrag.offsetHeight;
	/*if(oSubH/ 2 < 0)
		oDrag.style.top = "50px";
	else if (oSubH/ 2 > 0&&oSubH/ 2 <= oSubH1/2)
		oDrag.style.top = oSubH/ 2 + "px";
	else if(oSubH/ 2 > oSubH1/2)
			oDrag.style.top = oSubH1/2+"px";*/


	oDrag.style.position='fixed';
	//oDrag.style.top='100px';
	oDrag.style.zIndex='2000000003';
	//var scrollTopVal=$(document).scrollTop()+100;
	var scrollTopVal=oSubH1/2;
	//oDrag.style.position='absolute';
	if(scrollTopVal <= 0)
        scrollTopVal = 100;
	oDrag.style.top=(defaultTop == null) ? scrollTopVal+'px' : defaultTop + 'px';
	currPopDiv = oDrag;
	phpHide('2','none');
	dragMinWidth	= oDrag.style.width;
	dragMinHeight	= oDrag.style.height;
	dragMinTop		= oDrag.style.top;
	dragMinLeft		= oDrag.style.left;
	
}
var currPopDiv;


	function startCovered(oDrag)
	{
		//var documentWidth = $(document).width();  
		//var documentHeight = $(document).height();  
		//var coveredCss = 'position:absolute;';  
		var coveredCss = 'position:fixed;';
		coveredCss += 'top:0px;';  
		coveredCss += 'left:0px;';  
		coveredCss += 'z-index:2000000002;';  
		//alert($(document).scrollTop());
		
		//if($(oDrag).parent()[0] == document.body)
		//{//alert(document.body.scrollHeight)
			//coveredCss += 'width:' + parseInt(document.body.scrollWidth) + 'px;';
			//coveredCss += 'height:' + parseInt(document.body.scrollHeight) + 'px;';
			coveredCss += 'width:' + parseInt(document.documentElement.clientWidth) + 'px;';
			coveredCss += 'height:' + parseInt(document.documentElement.clientHeight) + 'px;';
		/*}
		else
		{
			coveredCss += 'width:' + $(oDrag).parent().width() + 'px;';  
			coveredCss += 'height:' + $(oDrag).parent().height() + 'px;';  
		}
		*/
		
		coveredCss += 'background-color:#000;';  
		coveredCss += 'filter:alpha(opacity=30);';
		coveredCss += '-moz-opacity:0.3;';
		coveredCss += 'opacity: 0.3;';
		  
		var coverFloor = '<div style="' + coveredCss + '" id="coveredDIV" name="coveredDIV"></div>';  
		oDrag.style.zIndex = 2000000003;
		$(oDrag).parent().append(coverFloor);  
		$(window).resize(function() {
			if(currPopDiv != null)
			{
				if(currPopDiv.style.display != "none")
				{
					//$("#coveredDIV").css("width",parseInt(document.documentElement.clientWidth) + 'px;')
					//$("#coveredDIV").css("height",parseInt(document.documentElement.clientHeight) + 'px;')
					
					$("#coveredDIV").eq(0).remove();
					//endCovered();
					startCovered(currPopDiv);
				}
			}
		});
	}  
	function endCovered(){  
		if($("#coveredDIV") != null){
            while($("div[id=coveredDIV]").length != 0)
            {
                $($("div[id=coveredDIV]")[0]).remove();
            }
		}
        if(document.getElementById("unityPlayer") != null)
            //$("object")[0].className = "";
            $('#unityPlayer').removeClass('u3d');
            //document.getElementById("unityPlayer").style.visibility="visible";
	}  

	function closePopupWin()
	{
		if(currPopDiv != null)
			currPopDiv.style.display = "none";
		endCovered();
		phpHide('99','none');
		//如果有tip提示框，全部删除
		if(typeof(hideAllErrInfo) == "function")
			 hideAllErrInfo();
	}
	
	function phpHide(zIndexNum,display){
		$('.index-sitemap').css('z-index',zIndexNum);
		$('.sitemap-menu-arrow').css('display',display);
		$('.sitemap-menu').css('display',display);
	}