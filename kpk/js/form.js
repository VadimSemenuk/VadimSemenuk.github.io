$(document).ready(function () {

	var loan = $("#loan");
	var rate = $("#rate");
	var time = $("#loan-time");
	var sum = $("#loan-sum");
	var guarantor = $("#guarantor");
	var guarantorForValidate = 0;

	function Program (name, sum, time, rate, guarantor, complicated, days) {

		var guarantorCheck = $(".guarantor input:checked").val();

		this.name = name;
		this.sum = sum;
		this.time = time;
		this.rate = rate;
		this.guarantor = guarantor;
		this.complicated = complicated;
		this.days = days;

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
		"Для своих",
		[30000, 100000],
		[6],
		[55],
		false
	);
	var program2 = new Program(
		"Пенсионный",
		[[1000, 29999], [1000, 59999]],
		[[12], [12]],
		[90, 45],
		true
	);
	var program3 = new Program(
		"Пенсионный расширенный",
		[60000, 99999],
		[24],
		[45],
		false
	);
	var program4 = new Program(
		"До зарплаты",
		[[1000, 5000], [1000, 10000], [1000, 15000]],
		[1],
		[235],
		false,
		true,
		[14, 21]
	);
	var program5 = new Program(
		"АВТО-1",
		[[1000, 130000],[1000,200000]],
		[[6],[12]],
		[49,50],
		true
	);
	var program6 = new Program(
		"АВТО-2",
		[[10000, 60000],[1000,100000]],
		[[12],[12]],
		[55,50],
		true
	);
	var program7 = new Program(
		"Займ под залог коммерческой недвижимости",
		[500000, 2000000],
		[12],
		[50],
		false
	);
	var program8 = new Program(
		"Своя квартира",
		[100000, 1000000],
		[12],
		[50],
		false
	);
	var program9 = new Program(
		"Гоосслужащий",
		[[5000, 29999], [30000, 150000]],
		[[6], [12]],
		[74, 40],
		true
	);

	var program10 = new Program(
		"Защитник",
		[[5000, 29999], [30000, 150000]],
		[[6], [12]],
		[74, 40],
		true
	);
	var program11 = new Program(
		"Военный пенсионер",
		[5000, 29999],
		[6],
		[74],
		false
	);
	var program12 = new Program(
		"На обучение",
		[10000, 300000],
		[12],
		[40],
		false
	);
	var program13 = new Program(
		"Здоровье",
		[5000, 100000],
		[12],
		[40],
		false
	);
	var program14 = new Program(
		"Доверительная",
		[[5000, 29999], [30000, 59999]],
		[[12], [12]],
		[90, 42],
		true
	);
	var program15 = new Program(
		"Корпорация",
		[15000, 99999],
		[12],
		[43],
		false
	);
	var program15 = new Program(
		"Реструктуризация",
		[1000, 2000000],
		[6,12,24],
		[45,45,44],
		false
	);





	var zaimPrograms = [program1, program2, program3, program4, program5, program6, program7, program8, program9, program10, program11, program12, program13, program14, program15];

	function setValuesInDOM (item, guarantorValue) {
		var guarantor = zaimPrograms[item].guarantor;
		time.empty();
		rate.attr("data-val-rate", zaimPrograms[item].getRate(guarantorValue));
		rate.val(zaimPrograms[item].getRate(guarantorValue));
		if (zaimPrograms[item].complicated) {
			$(".fci-time").css("display", "none");
			sum.val(zaimPrograms[item].getSum(true)[$("#complicated input:checked").index("#complicated input")][0]);
			sum.attr("data-val-sum", zaimPrograms[item].getSum(true)[$("#complicated input:checked").index("#complicated input")][0]);
		} else {
			$(".fci-time").css("display", "inline-block");
			sum.val(zaimPrograms[item].getSum(guarantorValue)[0]);
			sum.attr("data-val-sum", zaimPrograms[item].getSum(guarantorValue)[0]);
			time.attr("data-val-time", zaimPrograms[item].getTime(guarantorValue)[0]);
			for (var a = 0; a < zaimPrograms[item].getTime(guarantorValue).length; a++) {
				time.append("<option>" + zaimPrograms[item].getTime(guarantorValue)[a] + "</option>");
			};
		};
		if (zaimPrograms[item].guarantor) {
			$("#guarantor").show();
		} else  {
			$("#guarantor").hide();
		};
		$(".zaim-sum-top span").text("(от " + zaimPrograms[item].getSum(guarantorValue)[0] + "руб. до " + zaimPrograms[item].getSum(guarantorValue)[1] + "руб.)");
		$(".zaim-time-top span").text("(от " + zaimPrograms[item].getTime(guarantorValue)[0] + "мес. до " + zaimPrograms[item].getTime(guarantorValue)[zaimPrograms[item].getTime(guarantorValue).length - 1] + "мес.)");
		$("#porychitel1").next().next().text("Без поручителя " + "(от " + zaimPrograms[item].getSum(false)[0] + "руб. до " + zaimPrograms[item].getSum(false)[1] + "руб.)");
		$("#porychitel2").next().next().text("C поручителем " + "(от " + zaimPrograms[item].getSum(true)[0] + "руб. до " + zaimPrograms[item].getSum(true)[1] + "руб.)");
		if (zaimPrograms[item].complicated) {
			var complicatedText = ["(первый заем)", "(второй заем)", "(трертий заем)"];
			function complicatedTimeDays (date) {
				var sym = date.charAt(date.length - 1);
				if (sym == 1) {
					return "день"
				};
				if (sym == 2 || sym == 3 || sym == 4) {
					return "дня"
				};
				if (sym == 5 || sym == 6 || sym == 7 || sym == 8 || sym == 9 || sym == 0) {
					return "дней"
				};

			};
			function complicatedTimeMonth (date) {
				var sym = date.charAt(date.length - 1);
				if (sym == 1) {
					return "месяц"
				};
				if (sym == 2 || sym == 3 || sym == 4) {
					return "месяца"
				};
				if (sym == 5 || sym == 6 || sym == 7 || sym == 8 || sym == 9 || sym == 0) {
					return "месяцев"
				};

			};
			$(".zaim-sum-top span").hide();
			$("#complicated").show();
			var idays = 0;
			if (zaimPrograms[item].days) {
				for (;idays < zaimPrograms[item].days.length; idays++) {
					$("#complicated .t").eq(idays).text("(без поручителя) " + zaimPrograms[item].days[idays] + " " + complicatedTimeDays(zaimPrograms[item].days[idays] + "") +  " " + complicatedText[idays]);
					$("#complicated .compl").eq(idays).attr("data-time-complicated", zaimPrograms[item].days[idays] / 100);
				};
			};
			if (zaimPrograms[item].getTime(guarantorValue)) {

				for (;idays < zaimPrograms[item].getTime(guarantorValue) + zaimPrograms[item].days.length - 1; idays++) {
					$("#complicated .t").eq(idays).text("(без поручителя) " + zaimPrograms[item].getTime(guarantorValue) + " " + complicatedTimeMonth("1") + "  " + complicatedText[idays]);
					$("#complicated .compl").eq(idays).attr("data-time-complicated", zaimPrograms[item].getTime(guarantorValue));
				};
			};

		} else {
			$("#complicated").hide();
			$(".zaim-sum-top span").show();
		};
		if (zaimPrograms[item].complicated) {
			time.append("<option>" + $("#complicated input:checked").attr("data-time-complicated") + "</option>");
			time.attr("data-val-sum", $("#complicated input:checked").attr("data-time-complicated"));
		};
	};

	$(".guarantor input[type='radio']").on("change", function () {
		guarantorForValidate = $(this).val();
		$(".guarantor input[type='radio']").removeAttr("data-checked");
		setValuesInDOM(+$(loan).val(), $(this).val());
	});

	$(".complicated input[type='radio']").on("change", function () {
		setValuesInDOM(+$(loan).val(), false);
	});

	$(sum).on("blur", function () {
		validate();
		sum.attr("data-val-sum", sum.val());
	});

	$(time).on("change", function () {
		time.attr("data-val-time", time.val());
	});

	$(loan).on("change", function () {
		$(".add-item.conditions a").text($(this).children("option:checked").text());
		$(".add-item.conditions a").attr("href", $(this).children("option:checked").attr("data-href"));
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
		if (zaimPrograms[+$(loan).val()].complicated) {
			if (+$(sum).val() > +zaimPrograms[+$(loan).val()].getSum(true)[$("#complicated input:checked").index("#complicated input")][1]) {
				$(sum).val(+zaimPrograms[+$(loan).val()].getSum(true)[$("#complicated input:checked").index("#complicated input")][1]);
			} else if (+$(sum).val() < +zaimPrograms[+$(loan).val()].getSum(true)[$("#complicated input:checked").index("#complicated input")][0]) {
				$(sum).val(+zaimPrograms[+$(loan).val()].getSum(true)[$("#complicated input:checked").index("#complicated input")][0]);
			};
		};
	};

	var hrefs = [
		["Для своих", "google.com"],
		["Пенсионный", "yandex.com"],
		["Пенсионный расширенный", "google.com"],
		["До зарплаты", "bing.com"],
		["АВТО-1", "google.com"],
		["АВТО-2", "yandex.com"],
		["Займ под залог коммерческой недвижимости", "bing.com"],
		["Своя квартира", "yandex.com"],
		["Гоосслужащий", "bing.com"],
		["Защитник", "google.com"],
		["Военный пенсионер", "yandex.com"],
		["На обучение", "bing.com"],
		["Здоровье", "google.com"],
		["Доверительная", "bing.com"],
		["Реструктуризация", "yandex.com"]
	];
	var loanLength = $("#loan option").length;
	for (var i = 1; i < loanLength; i++) {
		var option = $("#loan option").eq(i);
		for (var k = 0; k < hrefs.length; k++) {
			if ($(option).text() == hrefs[k][0]) {
				$(option).attr("data-href", hrefs[k][1]);
			};
		};
	};

});