$(document).ready(function() {

    $("#registrationForm").submit(function(event) {
        event.preventDefault();  

        const name = $("#name").val();
        const email = $("#email").val();
        const branch = $("#branch").val();
        const year = $("#year").val();
        const prn = $("#prn").val();

        const namePattern = /[0-9]/;
        if (namePattern.test(name)) {
            alert("Name should not contain numbers!");
            return;  
        }

        const prnPattern = /^[0-9]{10}$/;
        if (!prnPattern.test(prn)) {
            alert("PRN should be exactly 10 digits!");
            return;  
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address!");
            return;  
        }

        const registrationData = {
            name,
            email,
            branch,
            year,
            prn
        };

        localStorage.setItem('registrationData', JSON.stringify(registrationData));

        alert(`Registration Successful! Details:\n${JSON.stringify(registrationData, null, 2)}`);

        $("#registrationForm")[0].reset();
    });

    $("#submitCommentBtn").click(function() {
        const subject = $("#commentSubject").val();
        const message = $("#commentMessage").val();

        if (subject && message) {
            const commentDiv = $("<div>").addClass("comment");

            commentDiv.html(`
                <h3>${subject}</h3>
                <p>${message}</p>
            `);

            $("#commentsContainer").append(commentDiv);

            const commentData = { subject, message };

            let storedComments = JSON.parse(localStorage.getItem('successStories')) || [];

            storedComments.push(commentData);

            localStorage.setItem('successStories', JSON.stringify(storedComments));

            alert("Comment added successfully!");

            $("#commentSubject").val("");
            $("#commentMessage").val("");
        } else {
            alert("Please fill out both fields before submitting!");
        }
    });

    $("#emailCommentsBtn").click(function() {
        const comments = $("#commentsContainer").children();

        if (comments.length === 0) {
            alert("No comments to email.");
            return;
        }

        let emailContent = "";
        comments.each(function() {
            emailContent += `Subject: ${$(this).find("h3").text()}\nMessage: ${$(this).find("p").text()}\n\n`;
        });

        window.location.href = `mailto:studentname@gmail.com?subject=Comments&body=${encodeURIComponent(emailContent)}`;

        alert("Your email with the comments has been sent successfully!");
    });

    if (localStorage.getItem('registrationData')) {
        const savedRegistrationData = JSON.parse(localStorage.getItem('registrationData'));
        console.log("Loaded Registration Data from localStorage:", savedRegistrationData);
    }

    if (localStorage.getItem('successStories')) {
        const storedComments = JSON.parse(localStorage.getItem('successStories'));
        storedComments.forEach(function(comment) {
            const commentHtml = `
                <div class="comment">
                    <h3>${comment.subject}</h3>
                    <p>${comment.message}</p>
                </div>
            `;
            $("#commentsContainer").prepend(commentHtml);
        });
    }

    $("#someElement").on("click", function() {
        alert("Element clicked!");
    });

    $("#someElement").off("click");

    $("#someElement").hover(
        function() {
            $(this).css("background-color", "lightblue");
        }, 
        function() {
            $(this).css("background-color", "transparent");
        }
    );

    $("#email").blur(function() {
        alert("You left the email field!");
    });

    $("#toggleButton").click(function() {
        $("#someElement").toggle();
    });

    $("#someForm").submit(function(event) {
        event.preventDefault();
        alert("Form submission prevented!");
    });

    $("#someElement").data("customData", { key: "value" });

    $("#someElement").on("click", function(event) {
        console.log("Event type: " + event.type);
    });

    $("#someElement").on("click", function(event) {
        alert("Clicked on: " + $(event.currentTarget).text());
    });

});