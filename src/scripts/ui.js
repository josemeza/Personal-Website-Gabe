// Javascript document

setTimeout(function(){
	body.classList.add('loaded');
}, 500);

window.addEventListener('touchstart', function() {
	body.classList.add('touchDevice');
});

function updateCursorPosition(event) {
	scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	cursorLeft = event.pageX + 'px';
	cursorTop = event.pageY - scrollTop + 'px';
}

function updateThumbnailPosition(){

	for (let item of projectPreviews) {
		item.style.top = cursorTop;
		item.style.left = cursorLeft;
	}
}

window.addEventListener('resize', function(){

	windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	// Loop through all .expandablePanelContentContainer elements and check if they are open
	var expandablePanelContentContainersResize = document.getElementsByClassName('expandablePanelContentContainer');

	for (let item of expandablePanelContentContainersResize) {

		// If it is open, then recalculate the elements height based on the height of its first childElement
		if (item.classList.contains('openPanel')) {

			item.style.height = item.firstElementChild.clientHeight + 'px';

		}

	}

	// Loop through all images and videos and recalculate their aspect ratio
	// TO-DO

});

document.addEventListener('mousemove', function(event){
	updateCursorPosition(event);
	cursor.style.left = cursorLeft;
	cursor.style.top = cursorTop;
});

function assignHoverStates() {
	var projectTitleModules = document.getElementsByClassName('projectTitle');
	for (let x of projectTitleModules) {
		x.addEventListener('mouseenter', function(event){
			event.target.parentElement.classList.add('opaque');
			setTimeout(function(){
				body.classList.add('readyForClick');
				// This prevents the browser from registering a hover and a click when the project title is tapped on
			}, 25)
		});
		x.addEventListener('mouseout', function(event){
			event.target.parentElement.classList.remove('opaque');
			body.classList.remove('readyForClick');
		});
	};
};

// Expandable panels

var expandableButtons = document.getElementsByClassName('expandablePanelTrigger');

for (let item of expandableButtons) {

	item.addEventListener('mouseenter', function(){
		cursor.classList.add('south');
	})

	item.addEventListener('mouseleave', function(){
		cursor.classList.remove('south');
	})

	item.addEventListener('click', function(){

		// First, check if the accordion we clicked on is already open
		// If it is, close it.

		if ( item.parentElement.classList.contains('open')) {

			item.parentElement.classList.remove('open');
			body.classList.remove('openPanel');
			item.nextElementSibling.style.height = '0px';
			item.nextElementSibling.classList.remove('openPanel');

			// Play a sound
			let soundEffect = document.createElement('audio');
				soundEffect.src = 'assets/sounds/' + item.dataset.audioClose + '.mp3';
				
				if (soundController.classList.contains('soundOn')) {
					soundEffect.play();
				}

		} else {

			// Then, go through all accordion items and close them

			var expandablePanels = document.getElementsByClassName('expandablePanel');

			for (let panel of expandablePanels) {
				panel.classList.remove('open');
			}

			var expandablePanelContentContainers = document.getElementsByClassName('expandablePanelContentContainer');

			for (let panelContainer of expandablePanelContentContainers) {
				panelContainer.style.height = '0px';
				panelContainer.classList.remove('openPanel');
			}

			// Then, open the one the user clicked on

			item.parentElement.classList.add('open');
			body.classList.add('openPanel');
			item.nextElementSibling.style.height = item.nextElementSibling.firstElementChild.clientHeight + 'px';
			item.nextElementSibling.classList.add('openPanel');

			// Play a sound
			let soundEffect = document.createElement('audio');
				soundEffect.src = 'assets/sounds/' + item.dataset.audioOpen + '.mp3';

			if (soundController.classList.contains('soundOn')) {
				soundEffect.play();
			}

		};

	});

};

// New page links

var newPageLinks = document.getElementsByClassName('newPageLink');

for (let item of newPageLinks) {

	item.addEventListener('mouseenter', function(){
		cursor.classList.add('northeast');
	});

	item.addEventListener('mouseleave', function(){
		cursor.classList.remove('northeast');
	});

};

// Sound controller

soundController.addEventListener('click', function(){

	if (this.classList.contains('soundOn')) {

		this.classList.remove('soundOn');
		this.classList.add('soundOff');

		var audio = document.createElement('audio');
			audio.src = 'assets/sounds/sound-off.mp3';
			audio.load();
			audio.play();

		cursor.className = 'east';

	} else {

		this.classList.remove('soundOff');
		this.classList.add('soundOn');

		var audio = document.createElement('audio');
			audio.src = 'assets/sounds/sound-on.mp3';
			audio.load();
			audio.play();

		cursor.className = 'west';

	}
});

soundController.addEventListener('mouseenter', function(){
	if (this.classList.contains('soundOn')) {
		cursor.classList.add('west');
	} else {
		cursor.classList.add('east');
	}
});

soundController.addEventListener('mouseleave', function(){
	cursor.classList.remove('east');
	cursor.classList.remove('west');
});