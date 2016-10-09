$(function(){
    //歌曲列表
   var musics=[
      {path:'mp3/Chris Medina - What Are Words.mp3',name:'What Are Words',artistan:'Chris Medina',duration:'03:07'},
      {path:'mp3/Colbie Caillat - Try.mp3',name:'Try',artistan:'Colbie Caillat',duration:'03:15'},
      {path:'mp3/The Downtown Fiction - I Just Wanna Run.mp3',name:'I Just Wanna Run',artistan:'The Downtown Fiction',duration:'03:18'},
      {path:'mp3/Wiz Khalifa Charlie Puth - See You Again.mp3',name:'See You Again',artistan:'Wiz Khalifa Charlie Puth',duration:'04:13'},
      {path:'mp3/陈奕迅 - 浮夸.mp3',name:'浮夸',artistan:'陈奕迅',duration:'02:10'},
      {path:'mp3/李克勤 - 红日.mp3',name:'红日',artistan:'李克勤',duration:'05:10'},
      {path:'mp3/李荣浩 - 李白(Live).mp3',name:'李白(Live)',artistan:'李荣浩',duration:'03:20'}
     ]

     $(musics).each(function(index,el){
     $('<tr index="'+index+'">'+'<td><input type="checkbox">'+'</td>'+'<td>'+(index+1)+" "+el.name+'</td>'+'<td>'+el.artistan+'</td>'+'<td>'+el.duration+'</td>'+'</tr>').appendTo('.play-list1 tbody')     
     })
   //刚开始播放第一首音乐  
   var audio=$('audio').get(0);   
   $(audio).attr("src",musics[0].path);
   $(".play-jindu-left").text(musics[0].name+"-"+musics[0].artistan)
   //点击哪首那首播放
   $("tbody").on("click","tr",function(){
     var index=$(this).attr("index");
     $(audio).attr("src",musics[index].path);
     $(".play-jindu-left").text(musics[index].name+"-"+musics[index].artistan);
     audio.play();
   })
   //点击下一首
    $(".next").on("click",function(){
      var dangqian;
      for (var i = 0; i < musics.length ; i++) {
        if(musics[i].path==$(audio).attr("src")){
          dangqian=i;
        }
      };
      var next=dangqian+1;
      if (next==musics.length) {
        next=0;
      };
      $(audio).attr("src",musics[next].path);
      audio.play();
      $(".play-jindu-left").text(musics[next].name+"-"+musics[next].artistan)
    })
   //点击上一首
    $(".prev").on("click",function(){
      var dangqian;
      for (var i = 0; i < musics.length ; i++) {
        if(musics[i].path==$(audio).attr("src")){
          dangqian=i;
        }
      };
      var next=dangqian-1;
      if (next<0) {
        next=musics.length-1;
      };
      $(audio).attr("src",musics[next].path);
      audio.play();
      $(".play-jindu-left").text(musics[next].name+"-"+musics[next].artistan)
    })
   //开关点击播放和暂停
   $(".flag").on("click",function(){
   	if(audio.paused){
            audio.play();
        }else{
            audio.pause();
      };
   })

  audio.onplay = function(){
    $(".flag").addClass('inplay');

  }
  audio.onpause = function(){
    $(".flag").removeClass('inplay');
  }
//time函数用来将秒转化为时分秒格式；
   function Time(time){
   	var shi=Math.floor(time/3600);
   	var miao=Math.floor(time%3600);
   	var fen=Math.floor(miao/60);
   	miao=Math.floor(miao%60);  	
   	if (shi<10) {
   		shi="0"+shi;
   	};
   	if (fen<10) {
   		fen="0"+fen;
   	};
   	if (miao<10) {
   		miao="0"+miao;
   	};
   	if (shi==0) {
   		return (fen+":"+miao);
   	};
   	return (shi+":"+fen+":"+miao);
   }



   // 当已播放时长改变时
   audio.ontimeupdate = function(){
    // 界面时间改变；
   	var time1=Time(audio.currentTime);
    var time2=Time(audio.duration);
   	$('.time1').text(time1);
   	$('.time2').text(time2);
    // 进度条改变
   	$(".jindu .yuan").css({
   		left:(audio.currentTime/audio.duration)*$(".jindu").width()-$(".jindu .yuan").width()/2
   	})
    $(".jindu .jindu1").css({
      width:(audio.currentTime/audio.duration)*$(".jindu").width()
    })
   }

  // 点击进度条改变已播放时长
    $(".jindu").on("click",function(e){
      var left=e.offsetX;
      audio.currentTime=left/$(".jindu").width()*audio.duration;
    })


  // 当音量改变时
    var yw=$('.yinliangzs').width();
    var yuanW=$('.yinliangzs .yuan').width();
    audio.onvolumechange = function(){
         $('.yinliangzs .yuan').css({left:audio.volume*yw-yuanW/2}) 
         $(".yinliangzs .yinliang1").width(audio.volume*yw);
    }

  // 点击音量进度条改变音量
       var volume=1;
    $(".yinliangzs").on("click",function(e){
       var left=e.offsetX;
       volume=e.offsetX/yw;
       audio.volume=volume;
       
    })
   //点击静音
    $(".jinyin").on("click",function(){
      if (audio.volume!=0) {
         audio.volume=0;
         $(".jinyin").addClass('injinyin');
      }else{
         audio.volume=volume;
         $(".jinyin").removeClass('injinyin');
      }
       
    })
    

})