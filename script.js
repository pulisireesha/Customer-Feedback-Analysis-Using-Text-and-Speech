```javascript
const positiveWords = [

    "good",
    "great",
    "excellent",
    "amazing",
    "awesome",
    "best",
    "love",
    "liked",
    "like",
    "happy",
    "wonderful",
    "fantastic",
    "perfect",
    "nice",
    "easy",
    "fast",
    "friendly",
    "helpful",
    "satisfied",
    "satisfaction",
    "enjoy",
    "enjoyed",
    "recommend",
    "recommended",
    "quality",
    "quick",
    "excellent",
    "professional"

];


const negativeWords = [

    "bad",
    "terrible",
    "worst",
    "hate",
    "hated",
    "poor",
    "awful",
    "horrible",
    "slow",
    "late",
    "delay",
    "delayed",
    "problem",
    "problems",
    "angry",
    "disappointed",
    "disappointing",
    "difficult",
    "expensive",
    "broken",
    "damaged",
    "unhappy",
    "rude",
    "failure",
    "fail",
    "complaint",
    "complaints"

];




function analyzeFeedback() {

    let text =
        document
        .getElementById("feedbackText")
        .value
        .toLowerCase()
        .trim();


    if (text === "") {

        alert("Please enter customer feedback.");

        return;
    }


    let words =
        text.split(/\s+/);


    let positiveCount = 0;

    let negativeCount = 0;


    words.forEach(function(word) {

        

        word =
            word.replace(/[.,!?;:"()]/g, "");


        if (
            positiveWords.includes(word)
        ) {

            positiveCount++;

        }


        if (
            negativeWords.includes(word)
        ) {

            negativeCount++;

        }

    });


    
    let total =
        positiveCount + negativeCount;


    let sentiment = "neutral";

    let score = 50;


    if (total === 0) {

        sentiment = "neutral";

        score = 50;

    }

    else if (
        positiveCount > negativeCount
    ) {

        sentiment = "positive";

        score =
            Math.round(
                (positiveCount / total) * 100
            );

    }

    else if (
        negativeCount > positiveCount
    ) {

        sentiment = "negative";

        score =
            Math.round(
                (negativeCount / total) * 100
            );

    }

    else {

        sentiment = "neutral";

        score = 50;

    }


    showResult(
        sentiment,
        score,
        positiveCount,
        negativeCount
    );

}



function showResult(
    sentiment,
    score,
    positiveCount,
    negativeCount
) {

    let icon =
        document.getElementById(
            "sentimentIcon"
        );

    let result =
        document.getElementById(
            "sentimentResult"
        );

    let message =
        document.getElementById(
            "sentimentMessage"
        );


    

    if (sentiment === "positive") {

        icon.innerHTML = "😊";

        result.innerHTML =
            "Positive Feedback";

        message.innerHTML =
            "The customer appears satisfied with the product or service.";

    }


    
    else if (sentiment === "negative") {

        icon.innerHTML = "😞";

        result.innerHTML =
            "Negative Feedback";

        message.innerHTML =
            "The customer may have experienced problems or dissatisfaction.";

    }


    
    else {

        icon.innerHTML = "😐";

        result.innerHTML =
            "Neutral Feedback";

        message.innerHTML =
            "The feedback does not contain a strong positive or negative sentiment.";

    }


    

    document.getElementById(
        "score"
    ).innerHTML =
        score + "%";


    document.getElementById(
        "scoreBar"
    ).style.width =
        score + "%";


    
    document.getElementById(
        "positiveCount"
    ).innerHTML =
        positiveCount;


    document.getElementById(
        "negativeCount"
    ).innerHTML =
        negativeCount;

}



function startVoiceRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported. Please use Google Chrome."
        );

        return;
    }


    let recognition =
        new SpeechRecognition();


    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.continuous = false;


    let status =
        document.getElementById(
            "voiceStatus"
        );


    let voiceText =
        document.getElementById(
            "voiceText"
        );


    status.innerHTML =
        "🎤 Listening... Please speak";


    recognition.start();


    

    recognition.onresult =
        function(event) {

            let speech =
                event
                .results[0][0]
                .transcript;


            voiceText.innerHTML =
                "You said: " + speech;


            

            document.getElementById(
                "feedbackText"
            ).value = speech;


            
            analyzeFeedback();


            status.innerHTML =
                "✅ Voice analysis completed.";

        };


    

    recognition.onerror =
        function(event) {

            status.innerHTML =
                "❌ Unable to recognize voice.";

            console.log(
                event.error
            );

        };


    

    recognition.onend =
        function() {

            if (
                status.innerHTML.includes(
                    "Listening"
                )
            ) {

                status.innerHTML =
                    "Voice recognition stopped.";

            }

        };

}



function setRating(rating) {

    let stars =
        document.querySelectorAll(
            ".stars span"
        );


    stars.forEach(
        function(star, index) {

            if (index < rating) {

                star.classList.add(
                    "active"
                );

            }

            else {

                star.classList.remove(
                    "active"
                );

            }

        }
    );


    document.getElementById(
        "ratingText"
    ).innerHTML =
        rating + " out of 5 stars";


    document.getElementById(
        "customerRating"
    ).innerHTML =
        rating + " / 5";

}



function useExample(text) {

    document.getElementById(
        "feedbackText"
    ).value = text;


    analyzeFeedback();

}



function clearFeedback() {

    document.getElementById(
        "feedbackText"
    ).value = "";


    document.getElementById(
        "voiceText"
    ).innerHTML = "";


    document.getElementById(
        "voiceStatus"
    ).innerHTML =
        "Click the button and speak your feedback";


    document.getElementById(
        "sentimentIcon"
    ).innerHTML =
        "😊";


    document.getElementById(
        "sentimentResult"
    ).innerHTML =
        "Result will appear here";


    document.getElementById(
        "sentimentMessage"
    ).innerHTML =
        "Enter customer feedback to analyze it.";


    document.getElementById(
        "score"
    ).innerHTML =
        "0%";


    document.getElementById(
        "scoreBar"
    ).style.width =
        "0%";


    document.getElementById(
        "positiveCount"
    ).innerHTML =
        "0";


    document.getElementById(
        "negativeCount"
    ).innerHTML =
        "0";


    document.getElementById(
        "customerRating"
    ).innerHTML =
        "Not selected";


    document.getElementById(
        "ratingText"
    ).innerHTML =
        "Select a rating";


    

    let stars =
        document.querySelectorAll(
            ".stars span"
        );


    stars.forEach(
        function(star) {

            star.classList.remove(
                "active"
            );

        }
    );

}
```
