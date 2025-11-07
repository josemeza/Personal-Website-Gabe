var projectDB, cursorLeft, cursorTop, projectPreviews,
    body = document.body,
    html = document.documentElement,
    wrapper = document.getElementsByClassName("wrapper")[0],
    windowWidth  = Math.max(document.documentElement.clientWidth,  window.innerWidth  || 0),
    windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    projects = document.getElementById("projects"),
    projectList = document.getElementById("projectList"),
    soundController = document.getElementById("soundController"),
    cursor = document.getElementById("cursor");

function preloadSounds(a) {
  var o = document.createElement("audio");
  o.src = "assets/sounds/" + a;
  o.preload = "none";
  o.addEventListener("loadeddata", function(){});
}
function initSoundPreload() {
  var soundFileArray = [
    "beer.mp3", "dialing.mp3", "low-power.mp3", "mail.mp3",
    "shutter.mp3", "sms.mp3", "sound-off.mp3", "sound-on.mp3"
  ];
  for (var a = 0; a < soundFileArray.length; a++) {
    preloadSounds(soundFileArray[a]);
  }
}
// Defer to idle so it doesn’t block rendering
if ('requestIdleCallback' in window) {
  requestIdleCallback(initSoundPreload);
} else {
  setTimeout(initSoundPreload, 0);
}

console.log("Design and development by Gabe Ferreira");
console.log("contact@gabeferreira.com");

// ---------- Build projects ----------
for (var i = 0; i < projectDB.length; i += 1) {
  var newProject = document.createElement("div");
  newProject.className = "project " + projectDB[i].customClass;
  newProject.id = projectDB[i].customID;

  var projectTitle = document.createElement("span");
  projectTitle.className = "projectTitle";
  projectTitle.innerHTML = projectDB[i].title;
  newProject.appendChild(projectTitle);

  var projectDescription = document.createElement("p");
  projectDescription.className = "projectDescription";
  projectDescription.innerHTML = projectDB[i].description;
  newProject.appendChild(projectDescription);

  var imageArray = projectDB[i].images;
  var imageContainer = document.createElement("div");
  imageContainer.className = "imageContainer projectPreview";

  var projectImages = document.createElement("div");
  projectImages.className = "projectImages";

  var imageContainerTriggerHolder = document.createElement("div");
  imageContainerTriggerHolder.className = "imageContainerTriggerHolder";

  var imageContainerLeftTrigger = document.createElement("div");
  imageContainerLeftTrigger.id = "imageContainerLeftTrigger";
  imageContainerLeftTrigger.addEventListener("mouseenter", function () {
    cursor.classList.add("west");
  });
  imageContainerLeftTrigger.addEventListener("mouseleave", function () {
    cursor.classList.remove("west");
  });

  // --------- NEW: cleaner trigger + counters + handlers ----------
  var imageCount;
  var imageContainerRightTrigger = document.createElement("div");
  imageContainerRightTrigger.id = "imageContainerRightTrigger";
  imageContainerRightTrigger.addEventListener("mouseenter", function () {
    cursor.classList.add("east");
  });
  imageContainerRightTrigger.addEventListener("mouseleave", function () {
    cursor.classList.remove("east");
  });

  // Mount click zones
  imageContainerTriggerHolder.appendChild(imageContainerLeftTrigger);
  imageContainerTriggerHolder.appendChild(imageContainerRightTrigger);
  imageContainer.appendChild(imageContainerTriggerHolder);

  if (imageArray.length > 1) {
    // Counter
    imageCount = document.createElement("span");
    imageCount.className = "imageCount";
    imageCount.textContent = "1/" + imageArray.length;

    // Mark for CSS state if needed
    projectTitle.classList.add("multipleImages");
    newProject.classList.add("multipleImages");

    // RIGHT trigger: next
    imageContainerRightTrigger.addEventListener("click", function () {
      var frames = Array.from(this.parentElement.nextElementSibling.querySelectorAll("img.image"));
      var currentIndex = frames.findIndex(function (el) { return el.classList.contains("showing"); });
      if (currentIndex === -1) currentIndex = 0;

      frames[currentIndex].classList.remove("showing");
      var t = (currentIndex + 1) % frames.length;
      var next = frames[t];

      if ("decode" in next) {
        next.decode().finally(function(){ next.classList.add("showing"); });
      } else {
        next.classList.add("showing");
      }

      // pre-warm one ahead (lightweight)
      var pre = frames[(t + 1) % frames.length];
      if (pre && !pre.complete) {
        pre.loading = "eager";
        pre.fetchPriority = "low";
        if ("decode" in pre) pre.decode().catch(function(){});
      }

      var projectEl = this.parentNode.parentNode.parentNode;
      projectEl.lastElementChild.textContent = (t + 1) + "/" + frames.length;
    });

    // LEFT trigger: prev
    imageContainerLeftTrigger.addEventListener("click", function () {
      var frames = Array.from(this.parentElement.nextElementSibling.querySelectorAll("img.image"));
      var currentIndex = frames.findIndex(function (el) { return el.classList.contains("showing"); });
      if (currentIndex === -1) currentIndex = 0;

      frames[currentIndex].classList.remove("showing");
      var t = (currentIndex - 1 + frames.length) % frames.length;
      var next = frames[t];

      if ("decode" in next) {
        next.decode().finally(function(){ next.classList.add("showing"); });
      } else {
        next.classList.add("showing");
      }

      var pre = frames[(t - 1 + frames.length) % frames.length];
      if (pre && !pre.complete) {
        pre.loading = "eager";
        pre.fetchPriority = "low";
        if ("decode" in pre) pre.decode().catch(function(){});
      }

      var projectEl = this.parentNode.parentNode.parentNode;
      projectEl.lastElementChild.textContent = (t + 1) + "/" + frames.length;
    });

  } else {
    // Single image counter
    imageCount = document.createElement("span");
    imageCount.className = "imageCount";
    imageCount.textContent = "1/1";
  }
  // --------- END new block ----------

  // Create frames
  for (var a = 0; a < imageArray.length; a++) {
    var image = document.createElement("img");
    image.classList.add("image");
    image.src = "assets/img/projects/" + projectDB[i].id + "/" + imageArray[a];
    image.loading = "lazy";
    image.decoding = "async";

    // First project, first image: make LCP eager/high
    if (i === 0 && a === 0) {
      image.loading = "eager";
      image.fetchPriority = "high";
    }
    // First frame visible
    if (a === 0) image.classList.add("showing");

    projectImages.appendChild(image);
  }

  imageContainer.appendChild(projectImages);
  newProject.appendChild(imageContainer);
  newProject.appendChild(imageCount);
  projectList.appendChild(newProject);
}

assignHoverStates();
projectPreviews = document.getElementsByClassName("projectPreview");

// ---------- Cursor helpers ----------
function updateCursorPosition(e) {
  var scrollTop = (void 0 !== window.pageYOffset)
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  cursorLeft = e.pageX + "px";
  cursorTop  = (e.pageY - scrollTop) + "px";
}
var rafId = null;
document.addEventListener("mousemove", function (e) {
  if (rafId) return;
  rafId = requestAnimationFrame(function () {
    updateCursorPosition(e);
    cursor.style.left = cursorLeft;
    cursor.style.top  = cursorTop;
    rafId = null;
  });
});

// ---------- Hover states for titles ----------
function assignHoverStates() {
  var e = document.getElementsByClassName("projectTitle"),
      t = true, r = false, o = void 0;
  try {
    for (var n, a = e[Symbol.iterator](); !(t = (n = a.next()).done); t = true) {
      var s = n.value;
      s.addEventListener("mouseenter", function (e) {
        e.target.parentElement.classList.add("opaque");
        setTimeout(function () { body.classList.add("readyForClick"); }, 25);
      });
      s.addEventListener("mouseout", function (e) {
        e.target.parentElement.classList.remove("opaque");
        body.classList.remove("readyForClick");
      });
    }
  } catch (e2) {
    r = true; o = e2;
  } finally {
    try { t || (a.return && a.return()); } finally { if (r) throw o; }
  }
}

// ---------- Boot + interactions ----------
setTimeout(function () { body.classList.add("loaded"); }, 500);

window.addEventListener("touchstart", function () {
  body.classList.add("touchDevice");
}, { passive: true });

window.addEventListener("resize", function () {
  windowWidth  = Math.max(document.documentElement.clientWidth,  window.innerWidth  || 0);
  windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  var e = document.getElementsByClassName("expandablePanelContentContainer"),
      t = true, r = false, o = void 0;
  try {
    for (var n, a = e[Symbol.iterator](); !(t = (n = a.next()).done); t = true) {
      var s = n.value;
      if (s.classList.contains("openPanel")) {
        s.style.height = s.firstElementChild.clientHeight + "px";
      }
    }
  } catch (err) {
    r = true; o = err;
  } finally {
    try { t || (a.return && a.return()); } finally { if (r) throw o; }
  }
});

// ---------- Panel & link cursors ----------
var expandableButtons = document.getElementsByClassName("expandablePanelTrigger"),
    _iteratorNormalCompletion4 = true,
    _didIteratorError4 = false,
    _iteratorError4 = void 0;

try {
  for (var _step4, _loop = function () {
    var f = _step4.value;
    f.addEventListener("mouseenter", function () {
      cursor.classList.add("south");
    });
    f.addEventListener("mouseleave", function () {
      cursor.classList.remove("south");
    });
    f.addEventListener("click", function () {
      if (f.parentElement.classList.contains("open")) {
        f.parentElement.classList.remove("open");
        body.classList.remove("openPanel");
        f.nextElementSibling.style.height = "0px";
        f.nextElementSibling.classList.remove("openPanel");

        var e = document.createElement("audio");
        e.src = "assets/sounds/" + f.dataset.audioClose + ".mp3";
        e.preload = "none";
        if (soundController.classList.contains("soundOn")) e.play();
      } else {
        var t = document.getElementsByClassName("expandablePanel"),
            r = true, o = false, n = void 0;
        try {
          for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done); r = true) {
            a.value.classList.remove("open");
          }
        } catch (e2) {
          o = true; n = e2;
        } finally {
          try { r || (s.return && s.return()); } finally { if (o) throw n; }
        }

        var i = document.getElementsByClassName("expandablePanelContentContainer"),
            l = true, d = false, c = void 0;
        try {
          for (var u, m = i[Symbol.iterator](); !(l = (u = m.next()).done); l = true) {
            var p = u.value;
            p.style.height = "0px";
            p.classList.remove("openPanel");
          }
        } catch (e3) {
          d = true; c = e3;
        } finally {
          try { l || (m.return && m.return()); } finally { if (d) throw c; }
        }

        f.parentElement.classList.add("open");
        body.classList.add("openPanel");
        f.nextElementSibling.style.height = f.nextElementSibling.firstElementChild.clientHeight + "px";
        f.nextElementSibling.classList.add("openPanel");

        var v = document.createElement("audio");
        v.src = "assets/sounds/" + f.dataset.audioOpen + ".mp3";
        v.preload = "none";
        if (soundController.classList.contains("soundOn")) v.play();
      }
    });
  }, _iterator4 = expandableButtons[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) _loop();
} catch (e4) {
  _didIteratorError4 = true; _iteratorError4 = e4;
} finally {
  try { _iteratorNormalCompletion4 || (_iterator4.return && _iterator4.return()); } finally { if (_didIteratorError4) throw _iteratorError4; }
}

var newPageLinks = document.getElementsByClassName("newPageLink"),
    _iteratorNormalCompletion5 = true,
    _didIteratorError5 = false,
    _iteratorError5 = void 0;

try {
  for (var _step5, _iterator5 = newPageLinks[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
    var item = _step5.value;
    item.addEventListener("mouseenter", function () {
      cursor.classList.add("northeast");
    });
    item.addEventListener("mouseleave", function () {
      cursor.classList.remove("northeast");
    });
  }
} catch (e5) {
  _didIteratorError5 = true; _iteratorError5 = e5;
} finally {
  try { _iteratorNormalCompletion5 || (_iterator5.return && _iterator5.return()); } finally { if (_didIteratorError5) throw _iteratorError5; }
}

// ---------- Sound toggle ----------
soundController.addEventListener("click", function () {
  var e;
  if (this.classList.contains("soundOn")) {
    this.classList.remove("soundOn");
    this.classList.add("soundOff");
    e = document.createElement("audio");
    e.src = "assets/sounds/sound-off.mp3";
    e.preload = "none";
    e.play();
    cursor.className = "east";
  } else {
    this.classList.remove("soundOff");
    this.classList.add("soundOn");
    e = document.createElement("audio");
    e.src = "assets/sounds/sound-on.mp3";
    e.preload = "none";
    e.play();
    cursor.className = "west";
  }
});
soundController.addEventListener("mouseenter", function () {
  this.classList.contains("soundOn") ? cursor.classList.add("west") : cursor.classList.add("east");
});
soundController.addEventListener("mouseleave", function () {
  cursor.classList.remove("east");
  cursor.classList.remove("west");
});