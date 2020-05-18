// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var media_WebCam = CircuitFigure.extend({

   NAME: "media_WebCam",
   VERSION: "2.0.31_396",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:100,height:100},attr), setter, getter);
     var port;
     // output_port1
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.2724609375, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_port1");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 100;
      this.originalHeight= 100;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L100,0 L100,100 L0,100");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 0L100 0L100 100L0 100Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       

       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
media_WebCam = media_WebCam.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);
        
        this.img = new draw2d.shape.basic.Image({width: this.getWidth(), height: this.getHeight()})
        this.add(this.img, new draw2d.layout.locator.XYAbsPortLocator({x:0,y:0}))
        this.on("change:dimension", (emitter, event)=>{
            this.img.attr(event)
        })
        var onFailSoHard = function(e) {
          console.log('Reeeejected!', e);
        };

        this.imageCapture = null;
        // Not showing vendor prefixes.
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then((stream) =>{
                /* use the stream */
                console.log("accepted")
                const track = stream.getVideoTracks()[0];
                this.imageCapture = new ImageCapture(track);
                
                return this.imageCapture.getPhotoCapabilities();
            })
            .then(photoCapabilities => {
                const settings = this.imageCapture.track.getSettings();
                console.log("photoCapabilities", photoCapabilities);
            })
            .catch((err) =>{
                 /* handle the error */
                 console.log("catched")
            })
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        if(this.imageCapture===null){
            return
        }
        this.imageCapture.takePhoto().then((blob) =>{
            var a = new FileReader();
            a.onload = (e) => {
                this.img.attr("path", e.target.result)
            }
            a.readAsDataURL(blob);
        }).catch((error) =>{
            console.log('takePhoto() error: ', error);
        });
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }

});