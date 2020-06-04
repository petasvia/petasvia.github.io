
		// var barcode = "480D200525850"; 		// 바코드
		// var path2 = barcode.substr(10,3);	//바코드 끝 3자리 
		// var path1 = path2.substr(1,1);		//바코드 끝에서 두번째 숫자
		var type = "web";				//웹,모바일 구분
		//var channel = "N";		//접속경로
		
		var ePubPrevKyobo = (function() { 
			var _slider = '#pageSlider'
			,$dimmed = $(".dimmed")
			,$loading = $(".loading")
			,$utilList = $(".utilBtn_wrap")
			,$indexList = $(".menu_popup")
			,$viewGuide = $(".userGuide_p")
			,bodyResizeTimmer
			,bodyScrollTimmer
			,fontState = 4
			,$viewerParent = $(".ePubPreview_wrap")
			,$viewerBody = $(".ePubPageBody")
			,$pgRange = $(_slider);							
			var maxPage =  function (){ return Math.ceil($(".ePubContent_wrap").prop("scrollHeight") - $viewerParent.height()-1);};
			var imgResize = function (){
				$viewerBody.find("img").each(function(){				
					var screenImage = $(this); 
					var theImage = new Image();
					theImage.src = screenImage.attr("src"); 
					var imageWidth = theImage.width;
					var imageHeight = theImage.height;  
					if(imageWidth > 700 && imageWidth > ($(window).width()-100)){ 
						$(this).attr("style","width:100% !important;height:auto !important"); 
					}else{ 				
						$(this).attr("style","");
					}
				});	
			};
			var init = function() {
				$dimmed.hide();
				$loading.hide(); 
				imgResize();  
				$pgRange.rangeslider({
					polyfill: false,  
					onSlide: function(position, value) { 
						$viewerParent.scrollTop(value); 
					}
				});
				$pgRange.attr("max",maxPage()).rangeslider('update', true); 
				$pgRange.val(2).change();
				
				$utilList.find(".indexOpen").on("click", function(){ $indexList.show();  return false; }); 
				$indexList.find(".btn_indexClose").on("click", function(){ $indexList.hide(); return false; }); 
				$indexList.find("div a").on("click", function(){ pageGo($(this));}); 
				$utilList.find(".btn_help").on("click", function(){ 
					var tg = $viewGuide; (tg.css("display") != "none") ? tg.hide() : tg.show();  return false;
				});
				$viewGuide.find(".btn_close").on("click", function(){ $viewGuide.hide(); return false; });
			};
			var winResize = function(){								
				clearTimeout(bodyResizeTimmer);
				bodyResizeTimmer = setTimeout(function(){ 
					imgResize(); 
					$pgRange.attr("max",maxPage()).rangeslider('update', true); 
				},300);
			};
			var winScroll = function(){								
				clearTimeout(bodyScrollTimmer);
				bodyScrollTimmer = setTimeout(function(){
					var nowScroll = $viewerParent.scrollTop();
					if(nowScroll < 1){ nowScroll = 1;}
					$pgRange.val(nowScroll).change();
				},10); 
			};
			var pageGo = function(obj){
				$indexList.find("div a").removeClass("on");
				obj.addClass("on"); 		
			};			 
			var pageUpdate = function(){
				$pgRange.attr("max",maxPage()).rangeslider('update', true); 
			};
			var ePubFileLoad = function(){ }
			var fontSizeUp = function(){				
				  if(fontState < 9){
					$viewerBody.find("*").each(function() {
					  var size = parseInt($(this).css("font-size"));
					  size = size + 1 + "px";
					  $(this).css({ 'font-size': size });
					});
					$pgRange.attr("max",maxPage()).rangeslider('update', true); 
					fontState++;
				  }else{							
					  fontState=9;
				  } 
			};
			var fontSizeDown = function(){				
			  if(fontState > 0){
				$viewerBody.find("*").each(function() {
				  var size = parseInt($(this).css("font-size"));
				  size = size - 1 + "px";
				  $(this).css({ 'font-size': size });
				});
				$pgRange.attr("max",maxPage()).rangeslider('update', true); 
				fontState--;
			  }else{
				  fontState=0;
			  }
			};
		  return {
			  a: init,
			  b: winResize,
			  c: winScroll,
			  d: fontSizeUp,
			  e: fontSizeDown,
			  f: pageUpdate
		  };
		})();
		
		//마지막 구매 페이지
		var lastPageBuyBook = "";
			lastPageBuyBook = '<div class="prevEnd_wrap"><div class="prevEnd_inner"><p>아쉽지만 미리보기는<br />여기까지 입니다.<br />다음 내용이 궁금하신가요?</p><a href="javascript:goBack(type);"> 구매해서 보기 </a> </div></div>';
		var imgCount = 0;
		var ePubImageCount = 0; 
		var $ePubContainer = $(".ePubPageBody");	 
		var loading_state=null;
		
		$ePubContainer.load( "./origin/data/preview.html",function( response, status, xhr ) { // 이펍 호출
			// s: 이펍 호출후 동작
			if( status == "success"){
				$(".dimmed").show();
				$ePubContainer.find("img").attr("src", function(){ return $(this).attr("src").replace("../","./origin/")}); // 이미지 경로 변경
				$ePubContainer.find("video").attr("poster", function(){ return $(this).attr("poster").replace("../","./origin/")}).css("max-width", "90%"); // 이미지 경로 변경
				$ePubContainer.find("[rel=stylesheet]").remove();	// css 경로 변경
				document.createStyleSheet ? document.createStyleSheet("./origin/etc/preview.css") : $("head").append($('<link rel="stylesheet" href="./origin/etc/preview.css" />'));	// css 경로 변경
				//구매페이지 추가
				$ePubContainer.append(lastPageBuyBook);
				//책갈피 추가
				if($(".comix").size() == 0){ // 코믹스 클래스 없을 경우만 동작 2018-10-11
					$.getJSON("./origin/toc.json", function(data) {
						var innerHTMLData = data.toc.file;
						var innerHTMLCode = [];
						if ( typeof innerHTMLData == "undefined" || innerHTMLData == null || innerHTMLData == "") {
							innerHTMLCode += '<li><span>목차가 없습니다</span></li>';
						}else{
							for(var i = 0; i< innerHTMLData.length; i++){ 
								if(innerHTMLData[i].path.length < 1){
									innerHTMLCode += '<li><span>'+innerHTMLData[i].chapter+'</span></li>';
								}else{
									innerHTMLCode += '<li><a href="'+innerHTMLData[i].path+'">'+innerHTMLData[i].chapter+'</a></li>';
								}
							}
						}
						
						$( ".menu_popup .index ul").html(innerHTMLCode); 
					});
				}
				
				var ePubOnlyImageCount=0;
				var ePubImageCount = $ePubContainer.find("img").each(function(){
						if($(this).attr("src").indexOf(".svg") < 0 ){
							return ePubOnlyImageCount++;
						}
				}); // 이미지
				loading_ani(true);// 2018-10-11
				if(ePubImageCount > 0){
					$(".ePubPageBody img").load(function(){
						if($(this).attr("src").indexOf(".svg") < 0 ){
							imgCount++;
							if(imgCount == ePubImageCount){ 
								loading_ani(false);
								ePubStart(); 
								loading_state = setInterval(function(){  
									ePubPrevKyobo.f();   
								}, 500) 
							}
						}
					}).error(function(){
						console.log("Error in loading");
					});
				}else{			
					setTimeout(function(){
						loading_ani(false);
						ePubStart(); 
						ePubPrevKyobo.f();
					}, 500); 
				}
				function ePubStart(){
					ePubPrevKyobo.a();
					$(window).resize(function(){ ePubPrevKyobo.b(); clearInterval(loading_state);});
					$("#ePubPreview_wrap").on("scroll",function(){  if(parseInt($(this).scrollTop()) > 5){ clearInterval(loading_state);}});
					$(".ePubPreview_wrap").scroll(function(){ 
						ePubPrevKyobo.c();
					});
					$(".j_audio").click(function(){ alert("본 기능은 미리보기에서는 제공하지 않으며, eBook 구매시 정상적으로 보실 수 있습니다.")});
					$("video").click(function(){ alert("본 기능은 미리보기에서는 제공하지 않으며, eBook 구매시 정상적으로 보실 수 있습니다.")});
					$(".btn_txtSizeUp").click(function() {ePubPrevKyobo.d(); }); 
					$(".btn_txtsizeDown").click(function() {ePubPrevKyobo.e(); }); 
				}
			}
			// e: 이펍 호출후 동작 
		});   
		
		// s: 2018-10-11
		function loading_ani(state_){
			var loading_state = 0; 
			if(state_ == true){
				$(".loading").show(); 
				loading_ =  setInterval(function(){
					if(loading_state < 10){
						$(".loading img").css("left",72 * loading_state * -1+"px");
						loading_state++;
					}else{		
						$(".loading img").css("left","0px");
						loading_state=1;
					}
				}, 100);
			}else{
				clearInterval(loading_);
				$(".loading img").css("left","0px");
				$(".loading").hide();
			}
		}
		
		function goBack(type){
			sendMessageToApp();
			// if(type == "web"){
			// 	location.href = "http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?barcode="+barcode+"&orderClick=1ga";
			// }else if(type == "mobile"){
			// 	location.href = "http://m.kyobobook.co.kr/digital/ebook/ebookContents.ink?barcode="+barcode+"&orderClick=1gb";
			// }	
		}

		function sendMessageToApp() {
			app.handleMessage('검증 어플리케이션에서는 지원되지 않는 기능입니다.');
		}

		//$(document).on("contextmenu", function (event) { event.preventDefault(); });