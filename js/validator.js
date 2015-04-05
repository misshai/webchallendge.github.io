/**
 * Created by kateryna.guliaieva on 3/24/2015.
 */
var Validator = function(graph, roots) {
    'use strict';
    var graph = graph;
    var roots = roots;
    var graphLength = graph.length;

    var Constants = {
        GRAPH_LENGTH: 10,
        GRAPH_DEPTH: 4,
        MIN_ANSWERS_NUMBER: 2
    };

    function validateLength() {

        return graph.length >= Constants.GRAPH_LENGTH;
    }

    function validateAnswersNumber() {
        var result = true;
        for (var i = 0; i < graphLength; i++) {
            if (!graph[i].isFinal()&& (graph[i].answers.length < Constants.MIN_ANSWERS_NUMBER)){
                result = false;
                break;
            }
        }
        return result;
    }

    function validateDepthAndCycling() {
        var result = true;
        for (var i = 0; i < roots.length; i++) {
            result = result &&checkDepth(roots[i]);
        }
        return result;
    }

    function calculateDepth(id){
        var stack = [{
            depth: 0,
            element: graph[id]
        }];
        var stackItem = 0;
        var current;
        var children, i, len;
        var depth;
        while (current = stack[stackItem++]) {
            depth = current.depth;
            if (depth>graphLength){
                alert("There are circles in the graph! Please correct!");
                return null;
            }
            current = current.element;
            children = [];
            for (var k=0; k<current.answers.length;k++){
                children.push(graph[current.answers[k].linkedId])
            }

            for (i = 0, len = children.length; i < len; i++) {
                stack.push({
                    element: children[i],
                    depth: depth + 1
                });
            }
        }
        return stack;
    }

    function checkDepth(id) {
        var result = true;
        var depths = calculateDepth(id);
        if (!depths){
            return false;
        }
        for (var k=0; k<depths.length;k++){
            if (depths[k].element.isFinal()) {
                    if(depths[k].depth<Constants.GRAPH_DEPTH) {
                        result=false;
                        alert("DEPTH is smaller then required - 4 ");
                        break;
                    }
            }
        }
        return result;
    }

    return {

        validate: function () {
            return validateLength() && validateAnswersNumber()&&validateDepthAndCycling();
        }

    }
}
