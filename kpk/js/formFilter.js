$(document).ready(function () {

	var maxSumValue = 0,
	minSumValue = 0,
	categoryIndex = 0,
	exeption = false;

	var category0 = {
		name: "Рента",
		time_sumFilter: [
		{
			time: "6",
			minSum: 30000,
			maxSum: 20000000
		}, 
		{
			time: "12",
			minSum: 30000,
			maxSum: 20000000
		}
		]
	};
	var category1 = {
		name: "Подарок",
		time_sumFilter: [ 
		{
			time: "3",
			minSum: 10000,
			maxSum: 2000000
		}, 
		{
			time: "6",
			minSum: 10000,
			maxSum: 2000000
		}, 
		{
			time: "12",
			minSum: 10000,
			maxSum: 2000000
		}
		]
	};
		var category2 = {
		name: "Проценты вперед",
		time_sumFilter: [ 
		{
			time: "12",
			minSum: 50000,
			maxSum: 2000000
		}
		]
	};
	

	var categories = [category0, category1, category2];

	$("#categories, #tab1stavkafield").on("change", function () {
		for (var i = 0; i < categories.length; i++) {
			if ($.trim(categories[i].name) == $.trim($("#categories option:selected").text())) {
				categoryIndex = i;
			};
		};
		for (var ii = 0; ii < categories[categoryIndex].time_sumFilter.length; ii++) {
			if (categories[categoryIndex].time_sumFilter[ii].time == $("#tab1stavkafield").val()) {
				maxSumValue = categories[categoryIndex].time_sumFilter[ii].maxSum;
				minSumValue = categories[categoryIndex].time_sumFilter[ii].minSum;
			};
		};
	});

	$("input[name='sum']").on("blur", function () {
		if( +$(this).val() ) {
			$(".tab1summa-exeption").remove();
			exeption = false;
			if ( +$(this).val() > maxSumValue) {
				$(this).val(maxSumValue);
			};
			if ( +$(this).val() < minSumValue) {
				$(this).val(minSumValue);
			};
		} else if (!exeption){
			$(this).after("<p class='tab1summa-exeption' style='color: red; text-align: right; position: relative; top: 10px;'>Введите корректные данные</p>");
			exeption = true;
		};
	});
});