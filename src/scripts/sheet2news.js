// Javascript document

const sheetUrl = "https://spreadsheets.google.com/feeds/list/1JS0Ey7vEA1xPRZKu5uhAlHu1-EXRCJDa9hQa3xyEumc/1/public/values?alt=json"

//Fetching Google Sheet
fetch(sheetUrl)
	.then(function(response){
		return response.json();
		console.log(response.json());
	})
	.then(function(data){

		googleSheet = data.feed.entry;
		
		for (var i = 0; i < googleSheet.length; i += 1){

			var newProject = document.createElement('div');
				newProject.className = 'project ' + googleSheet[i].gsx$customclass.$t;
				newProject.id = googleSheet[i].gsx$customid.$t;

			var projectTitle = document.createElement('span');
				projectTitle.className = 'projectTitle';
				projectTitle.innerHTML = googleSheet[i].gsx$title.$t;

				newProject.appendChild(projectTitle);

			if (googleSheet[i].gsx$mediatype.$t === 'Image') {
				
				var imageString = googleSheet[i].gsx$images.$t;
				var imageArray = imageString.split(',');

				var imageContainer = document.createElement('div');
					imageContainer.className = 'imageContainer projectPreview';

				if (imageArray.length > 1) {

					var imageCount = document.createElement('span');
						imageCount.className = 'imageCount';
						imageCount.innerHTML = '1 of ' + imageArray.length;

					projectTitle.appendChild(imageCount);
					projectTitle.classList.add('multipleImages');

					projectTitle.addEventListener('mouseenter', function(){
						cursor.classList.add('east');
					});

					projectTitle.addEventListener('mouseleave', function(){
						cursor.classList.remove('east');
					});

					projectTitle.addEventListener('click', function(){

						if (body.classList.contains('readyForClick')) {

							// Get the image container
							var activeImageContainer = this.nextElementSibling;
							var activeImageArray = activeImageContainer.childNodes;

							var activeImageIndex;

							activeImageArray.forEach(function(currentValue, currentIndex) { 
								
								if (currentValue.classList.contains('showing')) {
									
									activeImageIndex = currentIndex + 1;

									if (activeImageIndex >= activeImageArray.length) {
										activeImageIndex = 0;
									};

									currentValue.classList.remove('showing');

								};

							});

							activeImageArray[activeImageIndex].classList.add('showing');
							this.childNodes[1].innerHTML = (activeImageIndex + 1) + ' of ' + activeImageArray.length;

						}

					})
				}

				for (var a = 0; a < imageArray.length; a++) {

					var image = document.createElement('img');
						image.classList.add('image');
						image.src = 'assets/img/projects/' + imageArray[a];
						image.addEventListener('load', function(){
							var imageAspectRatio = this.width / this.height;
							var browserAspectRatio = windowWidth / windowHeight;

							if (imageAspectRatio > browserAspectRatio) {
								this.classList.add('widerThanViewport');
							} else {
								this.classList.add('narrowerThanViewport');
							}

						})

					if (a === 0) {
						image.classList.add('showing');
					}

					imageContainer.appendChild(image);
				}

				newProject.appendChild(imageContainer);

			} else if (googleSheet[i].gsx$mediatype.$t === 'Video') {

				var videoContainer = document.createElement('div');
					videoContainer.className = 'videoContainer projectPreview';

				var video = document.createElement('video');
					video.className = 'projectVideo';
					video.loop = true;
					video.autoplay = true;
					video.muted = 'muted';
					video.setAttribute('webkit-playsinline','');
					video.setAttribute('playsinline','');

				var videoSource1 = document.createElement('source');
					videoSource1.src = 'assets/img/projects/' + googleSheet[i].gsx$video.$t  + '.mp4';
					videoSource1.type = 'video/mp4';

				var videoSource2 = document.createElement('source');
					videoSource2.src = 'assets/img/projects/' + googleSheet[i].gsx$video.$t + '.webm';
					videoSource2.type = 'video/webm';

					video.load();
					video.addEventListener('loadeddata', function(){

						console.log('loaded data')

						var videoAspectRatio = this.width / this.height;
						var browserAspectRatio = windowWidth / windowHeight;

						if (videoAspectRatio > browserAspectRatio) {
							this.classList.add('widerThanViewport');
						} else {
							this.classList.add('narrowerThanViewport');
						}

					})

					video.appendChild(videoSource1);
					video.appendChild(videoSource2);

				videoContainer.appendChild(video);
				newProject.appendChild(videoContainer);

			}

			projectList.appendChild(newProject);

		};

	}).then(function(){

		assignHoverStates();
		projectPreviews = document.getElementsByClassName('projectPreview');

	}).catch(function(error){
		console.log(error);
	})
