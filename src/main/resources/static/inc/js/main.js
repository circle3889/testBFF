$(function() {
		$(document).ready(function(){
		   
			
			// T 알림 close 
			$('#t_notice .hide_txt').click(function(){
			    $('#t_notice').slideUp('slow');
				return false;
			});
			
	
			//멤버십카드 / 잔여기본통화 실시간 요금 
			$('#data_info >ul >li').click(function(){
				var $this = $(this);
				var sub_m = $this.attr('class');
				var other_menu = $this.siblings();
				other_menu.removeClass('on');
				other_menu.children('.meb_sub').css('display','none');
			    $('.sub_arw').css('display','none');
				$this.addClass('on');
				$this.children('.meb_sub').css('display','block');
				$this.children('.sub_arw').css('display','block');
				return false;
			});
			
			//main menu
			$('#main_menu >ul >li').click(function(){
				var $this = $(this);
				var sub_m = $this.attr('class');			
				var other_menu = $('#main_menu > ul >li');
				
				if (sub_m.indexOf('on') != -1){
				   other_menu.removeClass('on');
				other_menu.children('.m_sub_menu').css('display','none')//slideUp('fast');//css('display','none')
				other_menu.children('.arw').css('display','none')
				$this.removeClass('on');
				$this.children('.m_sub_menu').slideUp('fast');//css('display','none');
				$this.children('.arw').css('display','none');
				return false;
				}
				other_menu.removeClass('on');
				other_menu.children('.m_sub_menu').slideUp('fast');//css('display','none')
				other_menu.children('.arw').css('display','none')
				$this.addClass('on');
				$this.children('.m_sub_menu').css('display','block');//slideDown('fast');//css('display','block');
				$this.children('.arw').css('display','block');
				return false;
				
			});
			
			// banner right button
			$('#banner .arw_r').click(function(){
			var $this = $(this);
			var box_id = $this.parent();
			var c_page_index =  $('#banner li.c_page').index();		
			var li_num = $('#banner li').length;
			
			box_id.find('ul li').removeClass('c_page');
			box_id.find('.b_paging a').removeClass('on');
			
			if (c_page_index == li_num - 1){
			  c_page_index = 0;
			}else {c_page_index = c_page_index + 1;}
			
			box_id.find('ul li').eq(c_page_index).addClass('c_page');
			box_id.find('.b_paging a').eq(c_page_index).addClass('on');
			
		   return false; 
		});
		
		   // banner left button
		$('#banner .arw_l').click(function(){
			var $this = $(this);
			var box_id = $this.parent();
			var c_page_index =  $('#banner li.c_page').index();		
			var li_num = $('#banner li').length;
			
			box_id.find('ul li').removeClass('c_page');
			box_id.find('.b_paging a').removeClass('on');
			
			if (c_page_index == 0){
			  c_page_index = li_num - 1;
			}else {c_page_index = c_page_index - 1;}
			
			box_id.find('ul li').eq(c_page_index).addClass('c_page');
			box_id.find('.b_paging a').eq(c_page_index).addClass('on');
		   return false; 
		});
		
		   // banner paging dot
		$('#banner .b_paging .b_page ').click(function(){
			var $this = $(this);			
			var page_index =  $this.index();					
			var box_id = $this.parent().parent();
			box_id.find('ul li').removeClass('c_page');
			$this.siblings().removeClass('on');			
			
			box_id.find('ul li').eq(page_index).addClass('c_page');
			$this.addClass('on');
			
		   return false; 
		});
		
		// notice set rotate time 
		var timeset = self.setInterval(function(){
			var current_index = $('#notice ul li.current').index();
			$('#notice ul li').removeClass('current');
			if (current_index == 2){
				current_index = 0;
			} else {
				current_index = current_index + 1;
			}
			$('#notice ul li').eq(current_index).addClass('current');
			
		},3000);
		
		// set banner rotate time
		var banner_time = self.setInterval(function(){
		     $('#banner .arw_r').trigger('click');
		},3000);
		
		// banner stop button toggle
		$('#banner .bplay_btn').toggle(function(){
			window.clearInterval(banner_time);
			$(this).addClass('b_play');
			return false;
		},function(){ 
		   banner_time = self.setInterval(function(){
		     $('#banner .arw_r').trigger('click');
		   },3000);
		   
		   $(this).removeClass('b_play');
			return false;
		});
		
		$('#data_info .zoom').click(function(){		
			$('.barcode_shadow').show();
			$('.big_barcode').animate({width: '75%'});
			return false;
		});
				
		
		$('#swipe_t').swipe({
						//Generic swipe handler for all directions
						swipe:function(event,direction,distance, duration, fingerCount) {
							if (direction == 'right') {
							$(this).animate({width:'0%'},function(){
							$('.barcode_shadow').hide();
							});
                          }							
						},
						//Default is 75px, set to 0 for demo so any distance triggers swipe
					   threshold:0});
		
        var w_height =  $(window).height() + 41 ;
		$('#swipe_t').css('height',w_height);
		
		//  추천부가서비스  불러오는 부분 		
		 $.post("service.json",function(data){
 		  var notice = '';  
		  
		  for (i in data){
		      notice = "<li><a href='" + data[i].r_link + "'>" + data[i].r_name + "<span></span></a></li>";
			  $('#service_rate .service ul').append(notice);			  
		  }		  
		});
		
		//  추천기본요금제  불러오는 부분 		
		 $.post("rate.json",function(data){ 
 		  var rate = '';  		  
		  for (i in data){
		      rate = "<li><a href='" + data[i].r_link + "'>" + data[i].r_name + "<span></span></a></li>";
			  $('#service_rate .rate ul').append(rate);			  
		  }		  
		});
		
		//  banner 불러오는 부분
		$.post("main_banner.json", function(data){
		  var banner = '',
		      page = "";
			  
		  for (i in data){
		    banner ="<li><a href='"+ data[i].b_link +"'><img src='"+ data[i].b_img +"' alt='"+ data[i].b_alt +"'/></a></li>";
			page ="<a href='' class='b_page'>banner"+i+"</a> ";
			
			$('#banner ul').append(banner);
			$('#banner .bplay_btn').before(page);
		  }
		  $('#banner ul li:first').addClass('c_page');
		  $('#banner.b_page:first').addClass('on');
		});
		
		
		// 공지사항   불러오는 부분 		
		 $.post("notice.json",function(data){
 		  var notice = '';  
		  
		  for (i in data){
		      notice = "<li><a href='" + data[i].notice_link + "'>" + data[i].notice_txt + "</a></li>";
			  $('#notice ul').append(notice);			  
		  }
		  $('#notice ul li:first').addClass('current');
		});
		
	}); // ready
		
		// bar code swipe
		
	}());