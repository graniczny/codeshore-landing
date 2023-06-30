(function () {
  const polish = [
    "Hello 👋",
    "my name is Rafal",
    "I'm fullstack web developer 👨‍💻",
    "Drop me a line on graniczny.rafal@gmail.com if you are looking for some help",
    "Have a great day ☀️",
    "👀 R.",
  ];

  const aimNode = document.getElementById("messenger");

  function addBubble(className) {
    const newNode = document.createElement("div");
    newNode.className = "msng-line";
    const wrapper = document.createElement("div");
    wrapper.className = className;

    for (let i = 0; i < 3; i++) {
      const loading = document.createElement("span");
      loading.style.display = "none";
      wrapper.appendChild(loading);
    }
    newNode.appendChild(wrapper);
    aimNode.appendChild(newNode);
  }

  function handleAnimation(msg, nodeSelector, dimensions, cb) {
    const node = document.querySelector(nodeSelector);

    let looped = 0;
    let limit = msg.length > 14 ? 2 : 1;

    anime({
      targets: node,
      easing: "easeOutElastic",
      delay: 150,
      translateX: ["-100%", 0],
      translateY: ["100%", 0],
      duration: 700,
    });
    const t1 = anime.timeline({
      easing: "easeInOutQuad",
      targets: nodeSelector + " span",
      loop: true,
      loopComplete: function () {
        looped += 1;
        if (looped === limit) {
          t1.pause();
          anime({
            targets: nodeSelector + " span",
            scale: [1, 0],
            delay: function (f, i) {
              return i * 150 + 100;
            },
            duration: 170,
            complete: function () {
              document
                .querySelectorAll(nodeSelector + " span")
                .forEach(function (span) {
                  span.style.display = "none";
                });
            },
          });
          anime({
            targets: node,
            easing: "linear",
            height: dimensions.height,
            width: dimensions.width + 5,
            delay: 210,
            duration: 200,
            begin: function () {
              node.style.borderRadius = "1.3rem";
            },
            complete: function () {
              const textNode = document.createElement("p");
              textNode.innerText = msg;
              node.appendChild(textNode);
              cb();
            },
          });
        }
      },
    });
    t1.add({
      scale: [1, 1.25, 1],
      opacity: [0.5, 1],
      duration: 600,
      delay: function (f, i) {
        return i * 150 + 100;
      },
    });
  }

  function getDimensions(selector) {
    const node = document.querySelector(selector);
    return {
      width: node.offsetWidth,
      height: node.offsetHeight,
    };
  }

  function handleAdding(messages) {
    const msg = messages[0];
    const className = "wrapper" + " number" + messages.length;
    addBubble(className);
    const selector = "." + className.split(" ").join(".");
    document.querySelectorAll(selector + " span").forEach(function (span) {
      span.style.display = "inline-block";
    });

    const textNode = document.createElement("p");
    textNode.innerText = msg;
    const ts = "x" + new Date().getTime();
    textNode.className = ts;
    const invisible = document.getElementById("invisible");
    invisible.appendChild(textNode);
    const dimensions = getDimensions("#invisible p." + ts);
    handleAnimation(msg, selector, dimensions, function () {
      const restMessages = messages.splice(1, messages.length - 1);
      if (restMessages.length) {
        handleAdding(restMessages);
      }
    });
  }
  handleAdding(polish);

  document.getElementById("exit").addEventListener("click", function () {
    document.querySelector("element.intro").style.display = "none";
  });

  // dodac zamykanie exitem
})();
