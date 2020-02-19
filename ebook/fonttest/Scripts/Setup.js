
      var gKo = true;
      var gEn = true;
      var gCn = true;
      var gJp = true;
      var gAll = true;
      var gFontSize = 1;
      var gLineHeight = 1.5;

      window.onresize = function (event) {
      	applyOrientation();
      }

      function applyOrientation(isInit) {
      	var userAgent = navigator.userAgent.toLowerCase();

        if (window.innerHeight > window.innerWidth) {
        	$("#mainindex").removeClass("indexColumn2Mobile");
                $("#mainindex").removeClass("indexColumn2");
                $("#mainindex").addClass("indexColumn1");
		$("#mainColumn").removeClass("mainColumn2");
		$("#mainColumn").addClass("mainColumn1");
		$("#menu").removeClass("menuMobileWidth");
                fontSizeChange('reset');
        } else {
                $("#mainindex").removeClass("indexColumn1");
                if(userAgent.match('iphone') || userAgent.match('ipod') || userAgent.match('android')){
                  $("#mainindex").addClass("indexColumn2Mobile");
                  $("#menu").addClass("menuMobileWidth");
		  fontSizeChange('reset');
                }
                else {
                  $("#mainindex").addClass("indexColumn2");
		  $("#menu").removeClass("menuMobileWidth");
                }
	
		$("#mainColumn").removeClass("mainColumn1");
                $("#mainColumn").addClass("mainColumn2");
       }
      } 

      window.onload = function() {
        applyOrientation();
      	$(".fonttest").load("Target/TargetText.html");
      	$("#menu").load("Target/Menu.html");
      	$(".returnToList").load("Target/ReturnToList.html");
      };

      function showLanguage(lang) {
        switch(lang) {
          case 'ko': 
            if(gKo == true) {
              $('.ko').css("display","none");     //$('.ko').css("color","#DEDEE2");
              gKo = false;
            }
            else {
              $('.ko').css("display","block");    //$('.ko').css("color","#000000");
              gKo = true;
            }
            break;
          case 'en': 
            if(gEn == true) {
              $('.en').css("display","none");     //$('.en').css("color","#DEDEE2");
              gEn = false;
            }
            else {
              $('.en').css("display","block");    //$('.en').css("color","#000000");
              gEn = true;
            }
            break;
          case 'cn': 
            if(gCn == true) {
              $('.cn').css("display","none");     //$('.cn').css("color","#DEDEE2");
              gCn = false;
            }
            else {
              $('.cn').css("display","block");    //$('.cn').css("color","#000000");
              gCn = true;
            }
            break;
          case 'jp': 
            if(gJp == true) {
              $('.jp').css("display","none");     //$('.jp').css("color","#DEDEE2");
              gJp = false;
            }
            else {
              $('.jp').css("display","block");    //$('.jp').css("color","#000000");
              gJp = true;
            }
            break;
          case 'all': 
              if(gAll == true) {
                $('.ko').css("display","none");   // $('.ko').css("color","#DEDEE2");
                $('.en').css("display","none");   // $('.en').css("color","#DEDEE2");
                $('.cn').css("display","none");   // $('.cn').css("color","#DEDEE2");
                $('.jp').css("display","none");   // $('.jp').css("color","#DEDEE2");

                gKo = false;
                gEn = false;
                gCn = false;
                gJp = false;
                gAll = false;
              } 
              else {
                $('.ko').css("display","block");  // $('.ko').css("color","#000000");
                $('.en').css("display","block");  // $('.en').css("color","#000000");
                $('.cn').css("display","block");  // $('.cn').css("color","#000000");
                $('.jp').css("display","block");  // $('.jp').css("color","#000000");
                gKo = true;
                gEn = true;
                gCn = true;
                gJp = true;                
                gAll = true;
              }
            break;

          default:
            alert('인수가 잘못되었습니다.');
            break;
        }
      }

      function fontSizeChange(sizeInfo) {
        switch(sizeInfo) {
          case 'up':
            gFontSize+=0.1;
            $("#mainColumn").css("font-size",gFontSize+"em");
            $("#fontCurSize").html( '( ' + gFontSize.toFixed(1) + 'em )')

            break;
          case 'down':
            gFontSize-=0.1;
            $("#mainColumn").css("font-size",gFontSize+"em");
            $("#fontCurSize").html( '( ' + gFontSize.toFixed(1) + 'em )')
            break;
          case 'reset':
            gFontSize=1;
            $("#mainColumn").css("font-size",gFontSize+"em");
            $("#fontCurSize").html( '( ' + gFontSize.toFixed(1) + 'em )')
            break;
	  case 'resetMobileWidth':
            gFontSize=0.6;
            $("#mainColumn").css("font-size",gFontSize+"em");
            $("#fontCurSize").html( '( ' + gFontSize.toFixed(1) + 'em )')
            break;
        }
      }

      function lineHeightChange(sizeInfo) {
        switch(sizeInfo) {
          case 'up':
            gLineHeight+=0.1;
            $(".fonttest").css("line-height",gLineHeight+"em");
            $("#lineHeightCursize").html( '( ' + gLineHeight.toFixed(1) + 'em )')

            break;
          case 'down':
            gLineHeight-=0.1;
            $(".fonttest").css("line-height",gLineHeight+"em");
            $("#lineHeightCursize").html( '( ' + gLineHeight.toFixed(1) + 'em )')
            break;
          case 'reset':
            gLineHeight=1.5;
            $(".fonttest").css("line-height",gLineHeight+"em");
            $("#lineHeightCursize").html( '( ' + gLineHeight.toFixed(1) + 'em )')
            break;
        }
      }           
  
