/**
 * Created by kateryna.guliaieva on 3/24/2015.
 */
var Quiz = function(){
    'use strict';

    var Entry = function(id, message, answers) {

        return {
            id : id,
            message : message,
            answers : answers,
            isFinal : function (){
                return answers.length==0;
            }
        }
    }

    var Answer = function(message, linkiedId) {

        return {
            message : message,
            linkedId : linkiedId
        }
    }

    var DATA = [new Entry(0,"Why do you want a pet?", [new Answer("It would be cool to have a pet to play and cuddle with.",1),new Answer("Pets make good decoration. It would liven-up my home.",4)]),
        new Entry(1,"How much time do you intend to spend with the pet?",[new Answer("All my spare time",6),new Answer("When I am not too busy.",4),new Answer("I didn't really think about that.",3)]),
        new Entry(2,"Do you want your pet to be able to talk to you?",[new Answer("Somewhat",4),new Answer("A little",6),new Answer("No thanks",9)]),
        new Entry(3,"Would you like your pet to greet you at the door?", [new Answer("Definitely. How nice.",6),new Answer("No need",5)]),
        new Entry(4,"Some people want a pet that is the same gender as them. How do you feel?", [new Answer("I want a pet that's a girl, like me.",8),new Answer("I want a pet that's masculine, like me.",9),new Answer("I'm a girl, but I'd be OK with a male pet.",9),new Answer("I'm a guy, but a female pet would be cool.",6)]),
        new Entry(5,"Would you want to have your pet at your feet 24/7?",[new Answer("Absolutely",7),new Answer("I might step on him!",12)]),
        new Entry(6,"What type of name do you intend to give your pet?",[new Answer("A sensible pet name",9),new Answer("A number or initials",10),new Answer("I don't know, something like Joey",11)]),
        new Entry(7,"Do you want a pet only when it is convenient for you?",[new Answer("Certainly not",6),new Answer("No, I am committed",4),new Answer("Ok, you got me",6),new Answer("No, I have thought it over",9),new Answer("No",11)]),
        new Entry(8,"What was your favorite toy as a kid?",[new Answer("Stuffed animals",10),new Answer("Dolls/Action Figures",9),new Answer("Model Airplane",9)]),
        new Entry(9,"How much upkeep do you want to be responsible for?",[new Answer("As much as it takes",10),new Answer("Little as possible",11)]),
        new Entry(10,"Where do you live?",[new Answer("Suburban home",11),new Answer("Apartment",12)]),
        new Entry(11,"Do you have fancy things in your home?",[new Answer("Can't say that I do",12),new Answer("All over",12)]),
        new Entry(12,"Do you have a lot of free time?",[new Answer("I certainly do",13),new Answer("Not really, busy, busy, busy",14)]),
        new Entry(13,"You need a cat!",[]),
        new Entry(14,"You need a dog!",[])
    ];

    var roots = [];
    var currentQuestionId;
    var validator;
    var view;

    function initializeView(){
        view = new QuestionView(setAnswer);
    }

    function setQuestion(){
        if(DATA[currentQuestionId].isFinal()){
            view.clearAnswers();
            view.setResult(DATA[currentQuestionId].message);
        }else {
            var answers = [];
            for (var i = 0,answLength=DATA[currentQuestionId].answers.length; i<answLength; i++) {
                answers.push({id : i,message: DATA[currentQuestionId].answers[i].message });
            }
            view.setQuestion(DATA[currentQuestionId].message);
            view.setAnswers(answers);
        }
    }

    function askQuestion() {
        if(DATA[currentQuestionId]) {
            setQuestion();
        }
        else{
            alert("Some wrong ID!!!!");
        }
    }

    function validate(){
        validator = new Validator(DATA,roots);
        return validator.validate();
    }

    function findRoots(){
        var entries = [];
        var dataLength = DATA.length;

        for (var i = 0; i<dataLength; i++) {
            for (var j = 0,ansLength = DATA[i].answers.length; j<ansLength; j++) {
                var answer = DATA[i].answers[j];
                entries[answer.linkedId] = 1;
            }
        }
        for (var k = 0; k<dataLength; k++){
            if(!entries[k]){
                roots.push(k);
            }
        }
    }

    function getRandom(max){
        return Math.floor(Math.random()*max);
    }

    function startQuiz(){
        findRoots();
        if(validate()){
            currentQuestionId = getRandom(roots.length);
            initializeView();
            askQuestion();
        }
    }

    function setAnswer(){
        currentQuestionId =  DATA[currentQuestionId].answers[view.getSelectedId()].linkedId;
        askQuestion();
    }

    return {
        startQuiz : startQuiz,
        setAnswer : setAnswer
    }

}