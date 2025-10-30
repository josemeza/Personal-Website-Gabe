var projectDB, cursorLeft, cursorTop, projectPreviews, body = document.body,
html = document.documentElement,
wrapper = document.getElementsByClassName("wrapper")[0],
windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
projects = document.getElementById("projects"),
projectList = document.getElementById("projectList"),
soundController = document.getElementById("soundController"),
cursor = document.getElementById("cursor");

function preloadSounds(a) {
	var o = document.createElement("audio");
	o.src = "assets/sounds/" + a, o.preload = "none", o.addEventListener("loadeddata", function() {})
}
for (var soundFileArray = ["beer.mp3", "dialing.mp3", "low-power.mp3", "mail.mp3", "shutter.mp3", "sms.mp3", "sound-off.mp3", "sound-on.mp3"], a = 0; a < soundFileArray.length; a++) preloadSounds(soundFileArray[a]);
	console.log("Design and development by Gabe Ferreira"), console.log("contact@gabeferreira.com");
for (var i = 0; i < projectDB.length; i += 1) {
	var newProject = document.createElement("div");
	newProject.className = "project " + projectDB[i].customClass, newProject.id = projectDB[i].customID;
	var projectTitle = document.createElement("span");
	projectTitle.className = "projectTitle", projectTitle.innerHTML = projectDB[i].title, newProject.appendChild(projectTitle);
	var projectDescription = document.createElement("p");
	projectDescription.className = "projectDescription", projectDescription.innerHTML = projectDB[i].description, newProject.appendChild(projectDescription);
	var imageArray = projectDB[i].images,
	imageContainer = document.createElement("div");
	imageContainer.className = "imageContainer projectPreview";
	var projectImages = document.createElement("div");
	projectImages.className = "projectImages";
	var imageContainerTriggerHolder = document.createElement("div");
	imageContainerTriggerHolder.className = "imageContainerTriggerHolder";
	var imageContainerLeftTrigger = document.createElement("div");
	imageContainerLeftTrigger.id = "imageContainerLeftTrigger", imageContainerLeftTrigger.addEventListener("mouseenter", function() {
		cursor.classList.add("west")
	}), imageContainerLeftTrigger.addEventListener("mouseleave", function() {
		cursor.classList.remove("west")
	});
	var imageCount, imageContainerRightTrigger = document.createElement("div");
	if (imageContainerRightTrigger.id = "imageContainerRightTrigger", imageContainerRightTrigger.addEventListener("mouseenter", function() {
		cursor.classList.add("east")
	}), imageContainerRightTrigger.addEventListener("mouseleave", function() {
		cursor.classList.remove("east")
	}), imageContainerTriggerHolder.appendChild(imageContainerLeftTrigger), imageContainerTriggerHolder.appendChild(imageContainerRightTrigger), imageContainer.appendChild(imageContainerTriggerHolder), 1 < imageArray.length)(imageCount = document.createElement("span")).className = "imageCount", imageCount.innerHTML = "1/" + imageArray.length, projectTitle.classList.add("multipleImages"), newProject.classList.add("multipleImages"), imageContainerRightTrigger.addEventListener("click", function() {
		var t, r = this.parentElement.nextElementSibling.childNodes;
		r.forEach(function(e, i) {
			e.classList.contains("showing") && ((t = i + 1) >= r.length && (t = 0), e.classList.remove("showing"))
		}), r[t].classList.add("showing");
		var e = this.parentNode.parentNode.parentNode;
		e.childNodes[e.childNodes.length - 1].innerHTML = t + 1 + "/" + r.length
	}), imageContainerLeftTrigger.addEventListener("click", function() {
		var t, r = this.parentElement.nextElementSibling.childNodes;
		r.forEach(function(e, i) {
			e.classList.contains("showing") && ((t = i - 1) < 0 && (t = r.length - 1), e.classList.remove("showing"))
		}), r[t].classList.add("showing");
		var e = this.parentNode.parentNode.parentNode;
		e.childNodes[e.childNodes.length - 1].innerHTML = t + 1 + "/" + r.length
	});
	else(imageCount = document.createElement("span")).className = "imageCount", imageCount.innerHTML = "1/1";
	for (var a = 0; a < imageArray.length; a++) {
		var image = document.createElement("img");
		image.classList.add("image");
		image.src = "assets/img/projects/" + projectDB[i].id + "/" + imageArray[a];
		image.loading = "lazy";
		image.decoding = "async";

		if (a === 0) image.classList.add("showing");
		projectImages.appendChild(image);
	}

	imageContainer.appendChild(projectImages), newProject.appendChild(imageContainer), newProject.appendChild(imageCount), projectList.appendChild(newProject)
}
assignHoverStates(), projectPreviews = document.getElementsByClassName("projectPreview");

function updateCursorPosition(e) {
	scrollTop = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, cursorLeft = e.pageX + "px", cursorTop = e.pageY - scrollTop + "px"
}

function updateThumbnailPosition() {
	var e = !0,
	t = !1,
	r = void 0;
	try {
		for (var o, n = projectPreviews[Symbol.iterator](); !(e = (o = n.next()).done); e = !0) {
			var a = o.value;
			a.style.top = cursorTop, a.style.left = cursorLeft
		}
	} catch (e) {
		t = !0, r = e
	} finally {
		try {
			e || null == n.return || n.return()
		} finally {
			if (t) throw r
		}
}
}

function assignHoverStates() {
	var e = document.getElementsByClassName("projectTitle"),
	t = !0,
	r = !1,
	o = void 0;
	try {
		for (var n, a = e[Symbol.iterator](); !(t = (n = a.next()).done); t = !0) {
			var s = n.value;
			s.addEventListener("mouseenter", function(e) {
				e.target.parentElement.classList.add("opaque"), setTimeout(function() {
					body.classList.add("readyForClick")
				}, 25)
			}), s.addEventListener("mouseout", function(e) {
				e.target.parentElement.classList.remove("opaque"), body.classList.remove("readyForClick")
			})
		}
	} catch (e) {
		r = !0, o = e
	} finally {
		try {
			t || null == a.return || a.return()
		} finally {
			if (r) throw o
		}
}
}
setTimeout(function() {
	body.classList.add("loaded")
}, 500), window.addEventListener("touchstart", function() {
	body.classList.add("touchDevice")
}), window.addEventListener("resize", function() {
	windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var e = document.getElementsByClassName("expandablePanelContentContainer"),
	t = !0,
	r = !1,
	o = void 0;
	try {
		for (var n, a = e[Symbol.iterator](); !(t = (n = a.next()).done); t = !0) {
			var s = n.value;
			s.classList.contains("openPanel") && (s.style.height = s.firstElementChild.clientHeight + "px")
		}
	} catch (e) {
		r = !0, o = e
	} finally {
		try {
			t || null == a.return || a.return()
		} finally {
			if (r) throw o
		}
}
}), document.addEventListener("mousemove", function(e) {
	updateCursorPosition(e), cursor.style.left = cursorLeft, cursor.style.top = cursorTop
});
var expandableButtons = document.getElementsByClassName("expandablePanelTrigger"),
_iteratorNormalCompletion4 = !0,
_didIteratorError4 = !1,
_iteratorError4 = void 0;
try {
	for (var _step4, _loop = function() {
		var f = _step4.value;
		f.addEventListener("mouseenter", function() {
			cursor.classList.add("south")
		}), f.addEventListener("mouseleave", function() {
			cursor.classList.remove("south")
		}), f.addEventListener("click", function() {
			if (f.parentElement.classList.contains("open")) {
				f.parentElement.classList.remove("open"), body.classList.remove("openPanel"), f.nextElementSibling.style.height = "0px", f.nextElementSibling.classList.remove("openPanel");
				var e = document.createElement("audio");
				e.src = "assets/sounds/" + f.dataset.audioClose + ".mp3", e.preload = "none", soundController.classList.contains("soundOn") && e.play()
			} else {
				var t = document.getElementsByClassName("expandablePanel"),
				r = !0,
				o = !1,
				n = void 0;
				try {
					for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) {
						a.value.classList.remove("open")
					}
				} catch (e) {
					o = !0, n = e
				} finally {
					try {
						r || null == s.return || s.return()
					} finally {
						if (o) throw n
					}
			}
			var i = document.getElementsByClassName("expandablePanelContentContainer"),
			l = !0,
			d = !1,
			c = void 0;
			try {
				for (var u, m = i[Symbol.iterator](); !(l = (u = m.next()).done); l = !0) {
					var p = u.value;
					p.style.height = "0px", p.classList.remove("openPanel")
				}
			} catch (e) {
				d = !0, c = e
			} finally {
				try {
					l || null == m.return || m.return()
				} finally {
					if (d) throw c
				}
		}
		f.parentElement.classList.add("open"), body.classList.add("openPanel"), f.nextElementSibling.style.height = f.nextElementSibling.firstElementChild.clientHeight + "px", f.nextElementSibling.classList.add("openPanel");
		var v = document.createElement("audio");
		v.src = "assets/sounds/" + f.dataset.audioOpen + ".mp3", v.preload = "none", soundController.classList.contains("soundOn") && v.play()
	}
})
	}, _iterator4 = expandableButtons[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = !0) _loop()
} catch (e) {
	_didIteratorError4 = !0, _iteratorError4 = e
} finally {
	try {
		_iteratorNormalCompletion4 || null == _iterator4.return || _iterator4.return()
	} finally {
		if (_didIteratorError4) throw _iteratorError4
	}
}
var newPageLinks = document.getElementsByClassName("newPageLink"),
_iteratorNormalCompletion5 = !0,
_didIteratorError5 = !1,
_iteratorError5 = void 0;
try {
	for (var _step5, _iterator5 = newPageLinks[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = !0) {
		var item = _step5.value;
		item.addEventListener("mouseenter", function() {
			cursor.classList.add("northeast")
		}), item.addEventListener("mouseleave", function() {
			cursor.classList.remove("northeast")
		})
	}
} catch (e) {
	_didIteratorError5 = !0, _iteratorError5 = e
} finally {
	try {
		_iteratorNormalCompletion5 || null == _iterator5.return || _iterator5.return()
	} finally {
		if (_didIteratorError5) throw _iteratorError5
	}
}
soundController.addEventListener("click", function() {
	var e;
	this.classList.contains("soundOn") ? (this.classList.remove("soundOn"), this.classList.add("soundOff"), (e = document.createElement("audio")).src = "assets/sounds/sound-off.mp3", e.preload = "none", e.play(), cursor.className = "east") : (this.classList.remove("soundOff"), this.classList.add("soundOn"), (e = document.createElement("audio")).src = "assets/sounds/sound-on.mp3", e.preload = "none", e.play(), cursor.className = "west")
}), soundController.addEventListener("mouseenter", function() {
	this.classList.contains("soundOn") ? cursor.classList.add("west") : cursor.classList.add("east")
}), soundController.addEventListener("mouseleave", function() {
	cursor.classList.remove("east"), cursor.classList.remove("west")
});