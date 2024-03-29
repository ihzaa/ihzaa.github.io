$(".carousel").carousel({
  interval: 800,
});

$(document).ready(function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  getHalaman();
});

window.addEventListener("hashchange", getHalaman);

function getHalaman() {
  let hash = location.hash;
  if (hash == "" || hash == "#home") {
    fetch("home.html")
      .then((result) => {
        return result.text();
      })
      .then((page) => {
        $("#konten").html(page);
      })
      .then(() => {
        var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

        if ("IntersectionObserver" in window) {
          var lazyVideoObserver = new IntersectionObserver(function (
            entries,
            observer
          ) {
            entries.forEach(function (video) {
              if (video.isIntersecting) {
                for (var source in video.target.children) {
                  var videoSource = video.target.children[source];
                  if (
                    typeof videoSource.tagName === "string" &&
                    videoSource.tagName === "SOURCE"
                  ) {
                    videoSource.src = videoSource.dataset.src;
                  }
                }

                video.target.load();
                video.target.classList.remove("lazy");
                lazyVideoObserver.unobserve(video.target);
              }
            });
          });

          lazyVideos.forEach(function (lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
          });
        }
      });
  } else if (hash == "#about") {
    fetch("about.html")
      .then((result) => {
        return result.text();
      })
      .then((page) => {
        $("#konten").html(page);
      });
  } else if (hash == "#sign-in") {
    fetch("sign-in.html")
      .then((result) => {
        return result.text();
      })
      .then((page) => {
        $("#konten").html(page);
      });
  }
}

$(document).on("DOMContentLoaded", function () {});
