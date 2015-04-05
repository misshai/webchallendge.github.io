/**
 * Created by kateryna.guliaieva on 3/26/2015.
 */
var QuestionView = function(callback){
    'use strict';
    var Constants = {
        BUTTON_SUBMIT:"submit",
        QUESTION_HOLDER : ".question",
        QUESTION : "p",
        ANSWERS : ".answers",
        ANSWER : "answer",
        BUTTON : "#submit"
    }
    var question = $(Constants.QUESTION);
    var answers = $(Constants.ANSWERS);
    var button = $(Constants.BUTTON);
    button.click(callback);

    function onRadioClick(){
        button.prop( "disabled", false );
    }

    function createAnswer(id, message){

        $("<input>", {
            value: id,
            name : "radio1",
            type : "radio",
            click:onRadioClick

        }).appendTo(answers);
        answers.append(message);
        answers.append("<br>");
    }

    return{
        setQuestion : function (text){
            question.text(text);
        },

        setAnswers: function(answers){
          this.clearAnswers();
          for(var i=0;i<answers.length;i++){
              createAnswer(answers[i].id, answers[i].message);
          }
            button.prop( "disabled", true );
            button.show();
        },

        getSelectedId: function(){
            return $("input:checked").val();
        },

        clearAnswers: function(){
            answers.html("");
        },
        setResult: function(text){
            this.setQuestion(text);
            $("h2").text(" Your result:")
            button.hide();
        }
    }

}