$(function(){
    //moveProgressBar();
  // on browser resize...
  $(window).resize(function() {
      //moveProgressBar();
  });
  
  $("#profitRefresh").click(function(){
		//moveProgressBar();
	});
  
}); 



  // SIGNATURE PROGRESS
  function moveProgressBar() {
	 	requestPostNoBlockUI("farm/lttotHist/amountStatus","json", {} , function(res) {
			var data = res.result;
			$("#costNumer").text(data.nowAmount);
			$("#costDemoni").text(data.totalAmount);
		    /*var rentalNumer = $("#rentalNumer").text();
		    var rentalDenomi = $("#rentalDenomi").text();*/
		    var costNumer = $("#costNumer").text();
		    var costDenomi = $("#costDemoni").text();
		    /*var rentalPercent = (rentalNumer / rentalDenomi) * 100;*/
		    var costPercent = (costNumer / costDenomi) * 100;
		    /*var getRentalPercent = (rentalPercent / 100);*/
		    var getCostPercent = (costPercent / 100);
		    var getProgressWrapWidth = $('.progress-wrap').width();
		    /*var progressRentalTotal = getRentalPercent * getProgressWrapWidth;*/
		    var progressCostTotal = getCostPercent * getProgressWrapWidth;
		    var animationLength = 1000;
		    var commaNumer = $("#costNumer").text();
  			var commaDemoni = $("#costDemoni").text();
  			$("#costNumer").text(comma(commaNumer));
  			$("#costDemoni").text(comma(commaDemoni));
		     /* $('.progress-bar1').stop().animate({
		          left: progressRentalTotal
		      }, animationLength);*/

		      $('.progress-bar2').stop().animate({
		        left: progressCostTotal
		    }, animationLength);
		});
  

  }