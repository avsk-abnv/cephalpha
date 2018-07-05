var picwidth;
$(window).resize(function(){
	var width=$('.instapacked').width();
	//$('.instapic').height(width2);
	var img= document.querySelectorAll('.instapic');
	for(var i=0;i<$('.instapic').length;i++)
	{	
			$('.instapic').eq(i).on('load',function(){
				//picwidth=$(this).width()-width;
				//$(this).css({left:-0.5*picwidth});
				// console.log(width+" "+$(this).width()+" "+picwidth);
			});
		
	}
/*	for(var i=0;i<$('h5').length;i++)
	{
		$('h5').eq(i).css({left:(width-$('h5').eq(i).width())*0.5});
	}*/
	var padng=0.75*width+5;
	$('h5').css("padding-top",padng.toString());
	$('.instapic').height(0.75*width);
	$('.instapacked').height(width);
});
$(window).trigger('resize');