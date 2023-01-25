// Code included inside will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
$(document).ready(function () {
    var timeBlock = $('.container-fluid');

    for (i = 9; i < 17; i++) {
        var containers = "hour-" + i; // 9am - 5pm loop
        var savedTextBox = localStorage.getItem(containers); // retrieving data from local storage for each of the boxes
        // gets the id of each container $(#hour-"#")
        $("#" + containers).find('.description').val(savedTextBox);

        console.log(containers);
    }

    // Display the current date in the header of the page
    var currentDay = $('#currentDay');
    var day = dayjs().format("dddd,");
    var calendar = dayjs().format(" MMMM DD, YYYY");
    var time = dayjs().format(" h:mm A") // time is formatted to AM/PM to match the work day scheduler
    var showDateEl = $('<p>');
    showDateEl.text("Today is " + day + calendar + time);
    currentDay.append(showDateEl);

    colouredBlock();

    // coloured-coded Time blocks indicating whether it is in the past, present, or future
    // past = gray, present = red, future = green
    function colouredBlock() {
        var presentHour = dayjs().format('H'); // dayjs() 24-hr format
        console.log("The current hour is " + presentHour); // log the current hour of when the browser app is used
        $(".time-block").each(function () {
            var eventTime = parseInt($(this).attr("id").split("hour-")[1]); // for each time block class, get the id "hour-number"

            // using the present hour, check if it is less than or greater than the corresponding event time
            if (eventTime < presentHour) {
                $(this).removeClass("future");

                $(this).removeClass("present");

                $(this).addClass("past");
            } else if (eventTime > presentHour) {
                $(this).removeClass("present");

                $(this).removeClass("past");

                $(this).addClass("future");
            } else {
                $(this).removeClass("past");

                $(this).removeClass("future");

                $(this).addClass("present");
            }
        });
    }

    // on save button click get the values for each containers
    timeBlock.on('click', '.saveBtn', function () {
        // from the button, find closest matching element (ancestor) to the button class, after find .timeblock to get id-hour
        var timeHour = $(this).closest('.time-block').attr('id');
        // finds the values of all elements <textarea> in the class description.
        var workEvent = $(this).closest('.time-block').find('.description').val();
        localStorage.setItem(timeHour, workEvent.trim());
        console.log(timeHour + workEvent + "saved");
    });

});

