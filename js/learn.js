$(document).ready(function() {
  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });
});

$(function() {
  // H1 only
  // $('h1').fontFlex(36, 48, 120);
  $("#typing-text").typed({
      strings: [
        "Welcome to Gibson Learn.",
        "A Level Revision.",
      ],
      typeSpeed: 100,
      backDelay: 2000,
      // loop
      loop: false,
  });
});

var canvas = document.getElementById('nodes')
    , context = canvas.getContext('2d')
    , pool = []
    , maxPoolSize = 500
    , distanceThreshold = 90
    , lastTimestamp = 0
    , nodeConnections = []
  ;

  canvas.width = window.innerWidth;
  canvas.height = 500;
  maxPoolSize = ( canvas.width * canvas.height ) / 6000

  function Boid(x,y) {
    this.id = Boid.lastId++;
    this.position = [x, y];
    this.size = 10;
    this.color = "red";
    this.velocity = [25-Math.random()*30, 25-Math.random()*80];
  };

  Boid.lastId = 0;

  Boid.prototype = {
    update: function(dt) {
      for (var i = 0; i < maxPoolSize; i++) {
        var boid = pool[i]
          , distance = this.distanceTo(boid)
        ;
        if(distance < distanceThreshold) {
          cohesion = []
        }
      };

      this.position[0] += this.velocity[0] * dt;
      this.position[1] += this.velocity[1] * dt;

      if(this.position[0] > canvas.width) {
        this.position[0] = 0;
        // this.velocity[0] *= -1;
      }

      if(this.position[1] > canvas.height) {
        this.position[1] = 0;
        // this.velocity[1] *= -1;
      }

      if(this.position[0] < 0) {
        this.position[0] = canvas.width;
        // this.velocity[0] *= -1;
      }
      if(this.position[1] < 0) {
        this.position[1] = canvas.height;
        // this.velocity[1] *= -1;
      };
    },

    distanceTo: function(boid) {
      var diff = vDiff(this.position, boid.position);
      return Math.abs(vLength(diff));
    },

    isConnectedTo: function(boid) {
      return nodeConnections[boid.id] == this.id
          || nodeConnections[this.id] == boid.id;
    },

    connectTo: function(boid) {
      nodeConnections[this.id] = boid.id;
      nodeConnections[boid.id] = this.id;
    },

    draw: function() {
      var pos = [round(this.position[0]), round(this.position[1])]
        , connections = 0;
      context.globalAlpha = 0.1;
      for (var i = 0; i < maxPoolSize; i++) {
        var boid = pool[i]
          , distance = this.distanceTo(boid)
          , opacity = 1-( distance/distanceThreshold )
        ;
        if(distance <= distanceThreshold) {
          connections++;
          if(!this.isConnectedTo( boid )){
            this.connectTo(boid);
            context.beginPath();
            context.moveTo( pos[0], pos[1]);
            context.lineTo(round( boid.position[0] ), round( boid.position[1] ));
            context.stroke();
          }
        }
      };
      context.globalAlpha = 0.5;

      context.beginPath();
      context.arc(
        pos[0],
        pos[1],
        this.size*( connections/5 ),
        0, Math.PI*2
      );
      context.fill();


    }
  };

  function vDiff(a, b) {
    return [ a[0] - b[0], a[1] - b[1] ];
  }

  function vLength(a) {
    return Math.sqrt( ( a[0]*a[0] ) + (a[1]*a[1]) );
  }

  function round(i) { return 0.5 + i | 0 }
  function draw(timestamp) {
    var dt = ( timestamp - (lastTimestamp || timestamp) ) / 1000;
    lastTimestamp = timestamp;

    context.clearRect(0,0,canvas.width, canvas.height);

    for (var i = 0; i < maxPoolSize; i++) {
      var boid = pool[i];
      boid.update(dt);
      boid.draw();
    }

    window.requestAnimFrame(draw);
  }

  window.requestAnimFrame = (function(){ return  window.requestAnimationFrame       || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || function(/* function */ callback, /* DOMElement */ element){ window.setTimeout(callback, 1000 / 60); }; })();

      for (var i = 0; i < maxPoolSize; i++) {
        pool.push(
          new Boid(Math.random()*canvas.width, Math.random()*canvas.height)
        );
      }
      document.body.appendChild(canvas);
      window.requestAnimFrame(draw);


      $(document).ready(function() {
        if ($("#js-parallax-window").length) {
          parallax();
        }
      });

      $(window).scroll(function(e) {
        if ($("#js-parallax-window").length) {
          parallax();
        }
      });

      function parallax(){
        if( $("#js-parallax-window").length > 0 ) {
          var plxBackground = $("#js-parallax-background");
          var plxWindow = $("#js-parallax-window");

          var plxWindowTopToPageTop = $(plxWindow).offset().top;
          var windowTopToPageTop = $(window).scrollTop();
          var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

          var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
          var windowInnerHeight = window.innerHeight;
          var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
          var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
          var plxSpeed = 0.35;

          plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
        }
      }
