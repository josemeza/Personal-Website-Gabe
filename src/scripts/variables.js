// Javascript document

var body = document.body;
var html = document.documentElement;
var wrapper = document.getElementsByClassName('wrapper')[0];

var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var projects = document.getElementById('projects');
var projectList = document.getElementById('projectList');

var cursorLeft;
var cursorTop;

var projectPreviews;

var soundController = document.getElementById('soundController');
var cursor = document.getElementById('cursor');