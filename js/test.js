function do_counter() {
    $('#counter2').countdown({
        startTime: "9",
        stepTime: 1,
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
    });

    $('#counter3').countdown({
        startTime: "60",
        stepTime: 1,
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
    });

    $('#counter4').countdown({
        startTime: "1:1",
        stepTime: 1,
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
    });

    $('#counter5').countdown({
        startTime: "11:11",
        stepTime: 1,
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
    });

    $('#counter6').countdown({
        startTime: "1:1:1",
        stepTime: 1,
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
    });

    $('#counter7').countdown({
        startTime: "11:11:11",
        stepTime: 1,
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
    });

    $('#counter8').countdown({
        startTime: "1:1:1:1",
        stepTime: 1,
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
    });

    $('#counter9').countdown({
        startTime: "11:11:11:11",
        stepTime: 1,
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
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
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
    });

    var _date = new Date();
    _date.setMonth(1);
    _date.setDate(22);
    _date.setHours(13);
    _date.setMinutes(54);
    _date.setSeconds(0);
    $('#counter11').countdown({
        startTime: _date,
        stepTime: 1,
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        image: "https://github.com/pfarmer/jquery-countdown/raw/master/img/digits.png"
    });
};
