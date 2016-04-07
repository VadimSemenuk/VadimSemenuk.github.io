$(document).ready(function () {

	var loan = $("#loan");
	var rate = $("#rate");
	var time = $("#loan-time");
	var sum = $("#loan-sum");
	var guarantor = $("#guarantor");
	var guarantorForValidate = 0;

	function Program (name, sum, time, rate, guarantor) {

		var guarantorCheck = $(".guarantor input:checked").val();

		this.name = name;
		this.sum = sum;
		this.time = time;
		this.rate = rate;
		this.guarantor = guarantor;

		this.getSum = function (guarantorValue) {
			if (guarantor && Array.isArray(this.sum[0])) {
				if (guarantorValue) {
					return this.sum[1];
				} else {
					return this.sum[0];
				};
			} else {
				return this.sum
			};
		};
		this.getTime = function (guarantorValue) {
			if (guarantor && Array.isArray(this.time[0])) {
				if (guarantorValue) {
					return this.time[1];
				} else {
					return this.time[0];
				};
			} else {
				return this.time
			};
		};
		this.getRate = function (guarantorValue) {
			if (guarantor && this.rate.length > 1) {	
				if (guarantorValue) {
					return this.rate[1];
				} else {
					return this.rate[0];
				};
			} else {
			return this.rate
			};
		};
	};

	var program1 = new Program(
		"Взаимопомощь",
		[30000, 100000],
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
		[55],
		false
	);
	var program2 = new Program(
		"Пенсионный",
		[[1000, 30000], [1000, 60000]],
		[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]],
		[75, 60],
		true
	);
	var program3 = new Program(
		"Пенсионный ПЛЮС",
		[60000, 100000],
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		[80],
		false
	);
	var program4 = new Program(
		"Наличными",
		[5000, 100000],
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		[80],
		false
	);
	var program5 = new Program(
		"Под залог авто (ПТС)",
		[[10000, 60000], [10000, 100000]],
		[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]],
		[182.5, 120],
		true
	);
	var program6 = new Program(
		"АВТО-КАСКО",
		[[50000, 130000], [50000, 200000]],
		[6, 12],
		[75, 60],
		true
	);
	var program7 = new Program(
		"Займ на покупку квартиры",
		[100000, 1000000],
		[3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		[60],
		false
	);
	var program8 = new Program(
		"Займ под залог коммерческой недвижимости",
		[500000, 2000000],
		[3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		[60],
		false
	);
	var program9 = new Program(
		"Партнер",
		[1000, 30000],
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		[80],
		false
	);

	var zaimPrograms = [program1, program2, program3, program4, program5, program6, program7, program8, program9];

	function setValuesInDOM (item, guarantorValue) {
		var guarantor = zaimPrograms[item].guarantor;
		time.empty();
		rate.attr("data-val-rate", zaimPrograms[item].getRate(guarantorValue));
		time.attr("data-val-time", zaimPrograms[item].getTime(guarantorValue)[0]);
		for (var a = 0; a < zaimPrograms[item].getTime(guarantorValue).length; a++) {
			time.append("<option>" + zaimPrograms[item].getTime(guarantorValue)[a] + "</option>");
		};
		sum.attr("data-val-sum", zaimPrograms[item].getSum(guarantorValue)[0]);
		sum.val(zaimPrograms[item].getSum(guarantorValue)[0]);
		if (zaimPrograms[item].guarantor) {
			$("#guarantor").show();
		} else  {
			$("#guarantor").hide();
		};
		$(".zaim-sum-top span").text("(от " + zaimPrograms[item].getSum(guarantorValue)[0] + "руб. до " + zaimPrograms[item].getSum(guarantorValue)[1] + "руб.)");
		$(".zaim-time-top span").text("(от " + zaimPrograms[item].getTime(guarantorValue)[0] + "мес. до " + zaimPrograms[item].getTime(guarantorValue)[zaimPrograms[item].getTime(guarantorValue).length - 1] + "мес.)");
	};

	$(".guarantor input[type='radio']").on("change", function () {
		guarantorForValidate = $(this).val();
		$(".guarantor input[type='radio']").removeAttr("data-checked");
		setValuesInDOM(+$(loan).val(), $(this).val());
	});

	$(sum).on("blur", function () {
		validate();
		sum.attr("data-val-sum", sum.val());
	});

	$(time).on("change", function () {
		time.attr("data-val-time", time.val());
	});

	$(loan).on("change", function () {
		$(".guarantor input[type='radio']").removeAttr("checked");
		$(".guarantor input[type='radio']").eq(0).attr("data-checked", "checked");
		if ($(this).val()) {
			setValuesInDOM(+$(this).val(), false);
		};
	});

	for (var i = 0; i < zaimPrograms.length; i++) {
		loan.append("<option value=" + i + ">" + zaimPrograms[i].name + "</option>");
	};

	function validate () {
		if (zaimPrograms[+$(loan).val()].guarantor) {
			if (+$(sum).val() > +zaimPrograms[+$(loan).val()].getSum(!!guarantorForValidate)[1]) {
				$(sum).val(+zaimPrograms[+$(loan).val()].getSum(!!guarantorForValidate)[1]);
			} else if (+$(sum).val() < +zaimPrograms[+$(loan).val()].getSum(!!guarantorForValidate)[0]) {
				$(sum).val(+zaimPrograms[+$(loan).val()].getSum(!!guarantorForValidate)[0]);
			};
		} else {
			if (+$(sum).val() > +zaimPrograms[+$(loan).val()].getSum(false)[1]) {
				$(sum).val(+zaimPrograms[+$(loan).val()].getSum(false)[1]);
			} else if (+$(sum).val() < +zaimPrograms[+$(loan).val()].getSum(false)[0]) {
				$(sum).val(+zaimPrograms[+$(loan).val()].getSum(false)[0]);
			};
		};
	};
});