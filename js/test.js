function do_counter() {
			var _dateCounter1 = new Date();
			_dateCounter1.setHours(00);
			_dateCounter1.setMinutes(00);
			_dateCounter1.setSeconds(00);
			$('#counter_1').countdown({
				startTime: _dateCounter1,
				stepTime: 1,
				digitImages: 1,
				digitWidth: 53,
				digitHeight: 77,
				format: "hh:mm:ss",
				timerEnd: function(){ alert('Midnight!'); },
				image: "img/digits_transparent.no-transitions.png"
			});

			var _dateCounter2 = new Date();
			_dateCounter2.setHours(12);
			_dateCounter2.setMinutes(00);
			_dateCounter2.setSeconds(00);
			$('#counter_2').countdown({
				startTime: _dateCounter2,
				stepTime: 1,
				digitImages: 1,
				digitWidth: 53,
				digitHeight: 77,
				format: "h:mm:ss",
				timerEnd: function(){ alert('Noon!'); },
				image: "img/digits_transparent.no-transitions.png"
			});

			$('#counter_3').countdown({
				startTime: "10:00",
				stepTime: 1,
				digitImages: 6,
				digitWidth: 53,
				digitHeight: 77,
				format: "mm:ss",
				timerEnd: function(){ alert('10:00 Countdown done!'); },
				image: "img/digits_transparent.png"
			});

			$('#counter_4').countdown({
				startTime: "1:00:50",
				stepTime: 1,
				digitImages: 1,
				digitWidth: 53,
				digitHeight: 77,
				format: "mm:ss",
				timerEnd: function(){ alert('1:00:50 Countdown done! WITH format: "mm:ss" (so 50 secs)'); },
				image: "img/digits_transparent.no-transitions.png"
			});

			$('#counter_5').countdown({
				startTime: "1:00:50",
				stepTime: 1,
				digitImages: 6,
				digitWidth: 53,
				digitHeight: 77,
				format: "h:mm:ss",
				timerEnd: function(){ alert('1:00:50 Countdown done! WITH format: "h:mm:ss" (so 1 hour and 50 sec)'); },
				image: "img/digits_transparent.png"
			});

    $('#counter2').countdown({
            startTime: "9",
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits.png"
        });
    
        $('#counter3').countdown({
            startTime: "60",
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits_transparent.png"
        });
    
        $('#counter4').countdown({
            startTime: "1:1",
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits_inverted.png"
        });
    
        $('#counter5').countdown({
            startTime: "11:11",
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits2.png"
        });
    
        $('#counter6').countdown({
            startTime: "1:1:1",
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits2_red.png"
        });
    
        $('#counter7').countdown({
            startTime: "11:11:11",
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits2_blue.png"
        });
    
        $('#counter8').countdown({
            startTime: "1:1:1:1",
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits2_green.png"
        });
    
        $('#counter9').countdown({
            startTime: "11:11:11:11",
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits2_yellow.png"
        });
    
        var _date = new Date();
        _date.setMonth(3);
        _date.setDate(22);
        _date.setHours(0);
        _date.setMinutes(0);
        _date.setSeconds(0);
        $('#counter10').countdown({
            startTime: _date,
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits2_purple.png"
        });
    
        var _date = new Date();
        _date.setMonth(0);
        _date.setDate(1);
        _date.setHours(0);
        _date.setMinutes(0);
        _date.setSeconds(0);
        $('#counter11').countdown({
            startTime: _date,
            stepTime: 1,
            digitImages: 6,
            digitWidth: 53,
            digitHeight: 77,
            image: "img/digits2_orange.png"
        });
};
