// JavaScript Document
function setMenuClicked(i){
	var options = { path: '/', expires: 1 };
	$.cookie('menu_a_clicked', i, options);
}
function getMenuClicked(){
	return $.cookie('menu_a_clicked');
}
function deletetMenuClicked(){
	var options = { path: '/', expires: 1 };
	$.cookie('menu_a_clicked', null, options);
}
function setMenuActive(){
	var i;
	i = getMenuClicked();
	if (i==0 || i==null) i = 1;
	$("#menu_a_" + i).addClass("current");
}
function get_video(vid){
	$.ajax({
		url: vncms_url + "/?sub=ajax&act=videocontent&video_id=" + vid,
		success: function(data) {		
			if (data!="0"){
				$("#video_frame").html(data);
			}
		}
	});
	return false;
}
function get_onefeed(id){
	$("#img_loading").show();
	$.ajax({
		url: vncms_url + "/?sub=ajax&act=getrssfeed&id=" + id,
		success: function(data) {		
			if (data!=""){
				$("#contentrss").append(data);				
			}
			$("#img_loading").hide();
		}
	});
	return false;
}
$(document).ready(function() {	
	if ($("#menu").length > 0){
		ddsmoothmenu.init({
			mainmenuid: "menu", //menu DIV id
			orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
			classname: 'ddsmoothmenu', //class added to menu's outer DIV
			//customtheme: ["#1c5a80", "#18374a"],
			contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
		});
	}
	if ($("#back-top").length > 0){
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});	
		// scroll body to 0px on click
		$('#back-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});	
	}
	if ($("#tabs").length > 0){
		$('#tabs a').click(function (e) {
			e.preventDefault();
			$("#content_question_answer div").hide();
			$("#tabs li").attr("class", "");
			$(this).parent().attr("class", "current");
			$('.' + $(this).attr('title')).fadeIn();
		});
	}
	addthis.layers({
    'theme' : 'transparent',
    'share' : {
      'position' : 'left',
      'numPreferredServices' : 6
    }, 
    'follow' : {
      'services' : [
        {'service': 'facebook', 'id': id_facebook},
        {'service': 'twitter', 'id': id_twitter},
        /*{'service': 'linkedin', 'id': 'ntthnue'},*/
        {'service': 'google_follow', 'id': id_google}
      ]
    }   
  });
	if ($("#contentrss").length > 0){
		if (rssfeed.length > 0){
			for (i=0; i<rssfeed.length; i++){
				get_onefeed(rssfeed[i]);
			}
		}
	}
});