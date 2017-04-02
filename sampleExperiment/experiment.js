/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */
var axis;
var clock = new THREE.Clock();
/* Ball variables */
var myBall;             /* Ball Object */
var myst;
var piv;
var ball1;
var ball2;
var ball3;
var arc;
var arc1;
var ob1;
var myBallRadius;       /* Radius */
var myBallX;            /* X Position */
var myBallY;            /* Y Position */
var myBallVX;           /* X Velocity */
var myBallVY;           /* Y Velocity */
var myBallAX;           /* X Acceleration */
var myBallAY;           /* Y Acceleration */
var myBallZ;            /* Z Position for placing ball */
var mytheta;
var mytheta1;
var mystX;
var mystY;
var mysth=3.0;
var timep;
var rev=0;
var time=0.0;
var time1=0.00;
var mtime=0;
var ang=0;
var sec;
var textV;
var stime;
//Back wall
var backB=-4.0;
var flag=0;
var flag1=0;

function tmper(p1){
		return (1/(Math.sqrt(p1/9.8)));
}

/**
 * This function implements custom dragging of the ball.
 * <p>
 * It ensures that the ball is not dragged beyond the permissible boundaries.
 * In other applications you can move more than one element as well.
 * <p>
 * @param element    Pointer to ball object
 * @param newpos     New 3D position (THREE.Vector3)
 */
function myBallDrag(element, newpos)
{
    var x= newpos.x, y=newpos.y;
    var cth=th1;
    cth= ((cth*10)|0)/10;
    
    x=x-2;
    y=y-3.5;
    var h1=Math.atan(x/y);
    h1= ((h1*10)|0)/10;
    if(h1<=cth+0.2&&h1>=(cth-0.2)){
    	PIEpauseAnimation();
	var old=mysth
	var newValue=Math.sqrt(x*x+y*y);
	if(newValue<=3.0&&newValue>=0.5){
		var ratio=(((newValue*10)|0)/10)/3.0;
	console.error(ratio);
	
	myst.scale.set(1,ratio,1);
	if(ratio<0.5){
		var rt=ratio+0.5;
		myBall.scale.set(rt,rt,1);
		ball1.scale.set(rt,rt,1);
		ball2.scale.set(rt,rt,1);
		ball3.scale.set(rt,rt,1);
		
	}
	mysth=newValue;
	timep=tmper(mysth);
	resetExperiment();
	PIEchangeDisplayText("Length", mysth);
	PIErender();

	PIEchangeInputSlider("Length", newValue);
    
	}
}
	

}
function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 4.0;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
	myBallX  = 2-(1*Math.sin(0.59));
	myBallY  = 1.5-(Math.cos(0.59));
    myBallZ    = -4.0;
	timep=   tmper(mysth);
}

function resetExperiment()
{
	/* initialise Other Variables */
    initialiseOtherVariables();
	//console.error(mysth);
    /* Initialise Ball variables */
    myBallX      = myCenterX;
    myBallY      = myCenterY;
    myBallVX     = 0.0;
    myBallVY     = 0.0;
    myBallAX     = gravityX;
    myBallAY     = gravityY;
	mytheta		 =	0.0;
	mytheta1		 =  0.0;
	boundaryT=0;
	/* Back */
	myBall.position.set(2-(mysth*Math.sin(0.0)),3.5-(mysth*Math.cos(0.0)),-3);
	myst.rotation.z=0.0;
	myBall.rotation.z=0.0;
	ball1.position.set(2-(mysth*Math.sin(0.0)),3.5-(mysth*Math.cos(0.0)),-3.2);
	if(ct!=0){
		ball2.position.set(2-(mysth*Math.sin(0.34)),3.5-(mysth*Math.cos(0.34)),-3.2);
	}
	if(ct1!=0){
		ball3.position.set(2-(mysth*Math.sin(-0.34)),3.5-(mysth*Math.cos(-0.34)),-3.2);
	}
	rev=0;
	clock= new THREE.Clock();
	time=0.0;
	mtime=0;
	ang=0;
	delt=0;
	sec.rotation.z=ang;
	try {
	 stime=time.toString()+":00";
	 var loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry(stime, {
		size: 0.2,
		height: 0.05,
		curveSegments : 2,
		bevelThickness: 0.05,
		font : font,
		weight: 'normal' ,
		style: 'normal',
	});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		PIEscene.remove(textV);
		 textV= new THREE.Mesh(text,material);

		textV.position.set(-1.3,2.1,-3);
		PIEaddElement(textV);
		PIErender();
	});	
	}
	catch(err) {
	}

}

function initialiseOtherVariables()
{
    /* Initialise variables */
    myBallRadius = mySceneW/30.0;
    wallThickness = 0.20;

    /* Gravity */
    gravityX = 0.0;
    gravityY = -9.8;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}

function loadExperimentElements()
{
	PIEsetExperimentTitle("Time period of a simple pendulum");
    PIEsetDeveloperName("Ankur .");
	initialiseScene();
	 initialiseOtherVariables();
	myBall = new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({color:0x13188b}));
	piv = new THREE.Mesh(new THREE.SphereGeometry(myBallRadius/3, 32, 32), new THREE.MeshLambertMaterial({color:0x13188b}));
	var cyl_material = new THREE.MeshLambertMaterial( {color: 0x000000} );
	var cyl_geometry= new THREE.CylinderGeometry(0.01,0.01,3,64);
	cyl_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 1.5, 0 ) );
	cyl_geometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad(180 ) ) );
	myst = new THREE.Mesh(cyl_geometry,cyl_material );
	myst.position.set(2.0,3.5,-3);
	myst.castShadow=false;
	myst.rotation.z=0.1;
    var cyl1_material = new THREE.MeshLambertMaterial( {color: 0xcaccf7} );
    var cyl1_geometry= new THREE.CylinderGeometry(0.05,0.05,1,32);
    ob1 = new THREE.Mesh(cyl1_geometry,cyl1_material );
    ob1.position.set(2.0,3.7,-4);
    ob1.rotation.y=60;
    ob1.rotation.x=60;
    ob1.rotation.z=-45;
    ob1.castShadow=false;
    myBall.position.set(2-(mysth*Math.sin(0.1)),2.5-(mysth*Math.cos(0.1)),-3);
	piv.position.set(myCenterX,3.5,-3);
    piv.castShadow = false;
    myBall.receiveShadow = false;
    piv.castShadow=false;
    ball1= new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({ color:0xecb3ff}));
    ball1.position.set(2.0,0.5,-3.2);
    ball2= new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({ color:0x99ccff}));
    ball3= new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({ color:0x99ccff}));
    ball2.position.set(2-(mysth*Math.sin(0.34)),3.5-(mysth*Math.cos(0.34)),-3.2);
    ball2.rotation.z=-0.34;
    ball3.position.set(2-(mysth*Math.sin(-0.34)),3.5-(mysth*Math.cos(-0.34)),-3.2);
    ball3.rotation.z=0.34;
	ball1.castShadow=false;
    ball2.castShadow=false;
    ball3.castShadow=false;
	var geometry = new THREE.TorusGeometry( 0.7, 0.01, 16, 100 );
	var material = new THREE.MeshLambertMaterial( { color: 0x000000 } );
	var torus = new THREE.Mesh( geometry, material );
	torus.position.set(-1,2.4,-3.1);
	var ac1= new THREE.Mesh(new THREE.SphereGeometry(myBallRadius/3.5, 32, 32), new THREE.MeshLambertMaterial({ color:0xecb3ff}));
	ac1.position.set(-1-(0.57*Math.sin(0.0)),2.4-(0.57*Math.cos(0.0)),-3.1);
	var ac2=ac1.clone();
	ac2.position.set(-1-(0.57*Math.sin(3.14)),2.4-(0.57*Math.cos(3.14)),-3.1);
	PIEaddElement(ac2);
	var ac3=ac1.clone();
	ac3.position.set(-1-(0.57*Math.sin(1.57)),2.4-(0.57*Math.cos(1.57)),-3.1);
	PIEaddElement(ac3);
	var ac4=ac1.clone();
	ac4.position.set(-1-(0.57*Math.sin(4.71)),2.4-(0.57*Math.cos(4.71)),-3.1);
	PIEaddElement(ac4);
	PIEaddElement(ac1);
	var cyl_material = new THREE.MeshLambertMaterial( {color: 0x000000} );
	var cyl_geometry= new THREE.CylinderGeometry(0.01,0.01,0.55,64);
	cyl_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.275, 0 ) );
	cyl_geometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad(0) ) );
	sec = new THREE.Mesh(cyl_geometry,cyl_material );
	sec.position.set(-1,2.4,-3.1);
	var geometry = new THREE.CircleGeometry( 0.7, 32 );
	var material = new THREE.MeshBasicMaterial( { color: 0xccccff } );
	var circle = new THREE.Mesh( geometry, material );
	circle.position.set(-1,2.4,-3.1);
	PIEaddElement(circle);
	var geometry = new THREE.TorusGeometry( 0.65, 0.01, 16, 100 );
	var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	var circle1 = new THREE.Mesh( geometry, material );
	circle1.position.set(-1,2.4,-3.1);
	PIEaddElement(circle1);
	var geometry = new THREE.CircleGeometry( myBallRadius/6, 32 );
	var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	var on = new THREE.Mesh( geometry, material );
	on.position.set(-1-(0.57*Math.sin(0.523)),2.4-(0.57*Math.cos(0.523)),-3.1);
	PIEaddElement(on);
	var tw=on.clone();
	tw.position.set(-1-(0.57*Math.sin(-0.523)),2.4-(0.57*Math.cos(-0.523)),-3.1);
	PIEaddElement(tw);
	var fr=on.clone();
	fr.position.set(-1-(0.57*Math.sin(-1.046)),2.4-(0.57*Math.cos(-1.046)),-3.1);
	PIEaddElement(fr);
	var fv=on.clone();
	fv.position.set(-1-(0.57*Math.sin(1.046)),2.4-(0.57*Math.cos(1.046)),-3.1);
	PIEaddElement(fv);
	var sv=on.clone();
	sv.position.set(-1-(0.57*Math.sin(2.092)),2.4-(0.57*Math.cos(2.092)),-3.1);
	PIEaddElement(sv);
	var ei=on.clone();
	ei.position.set(-1-(0.57*Math.sin(-2.092)),2.4-(0.57*Math.cos(-2.092)),-3.1);
	PIEaddElement(ei);
	var ni=on.clone();
	ni.position.set(-1-(0.57*Math.sin(2.615)),2.4-(0.57*Math.cos(2.615)),-3.1);
	PIEaddElement(ni);
	var ten=on.clone();
	ten.position.set(-1-(0.57*Math.sin(-2.615)),2.4-(0.57*Math.cos(-2.615)),-3.1);
	PIEaddElement(ten);
	PIEaddElement(sec);
    PIEaddElement(myBall);
	PIEaddElement(myst);
	PIEaddElement(piv);
	PIEaddElement(ball1);
	PIEaddElement(torus);
	var loader = new THREE.TextureLoader();
	loader.load('1.jpg', function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map: texture}  );
		geometry = new THREE.BoxGeometry( mySceneW * 4, mySceneH * 2, wallThickness );
    
    var myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2)-2);
    myBack.receiveShadow=false;
    PIEaddElement(myBack);
    PIErender();
	});
    geometry = new THREE.BoxGeometry( 0.8,0.3,-0.01 );
    material = new THREE.MeshLambertMaterial( { color: 0xffffff}  );
    var rect = new THREE.Mesh( geometry, material );
    rect.position.set(-1.0,2.2,-3.05);
    PIEaddElement(rect);
    loader.load('hardwood2_diffuse.jpg', function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map: texture}  );
		geometry = new THREE.BoxGeometry( 1,0.1,1 );
    
    var base = new THREE.Mesh( geometry, material );
    base.position.set(1.5,-0,-5);
    base.rotation.z=3.14;
    base.receiveShadow=false;
    PIEaddElement(base);
    PIErender();
	});
	loader.load('hardwood2_diffuse.jpg', function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		cyl_material = new THREE.MeshLambertMaterial( { map: texture}  );
		cyl_geometry= new THREE.CylinderGeometry(0.05,0.05,4,64);
		cyl_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 2, 0 ) );
    	handl = new THREE.Mesh(cyl_geometry,cyl_material );
		handl.position.set(1.5,-0,-5);

    PIEaddElement(handl);
    PIErender();
	});
	loader.load('hardwood2_diffuse.jpg', function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		cyl_material = new THREE.MeshLambertMaterial( { map: texture}  );
		cyl_geometry= new THREE.CylinderGeometry(0.05,0.05,1,64);
		cyl_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
    	tp = new THREE.Mesh(cyl_geometry,cyl_material );
		tp.position.set(1.5,4,-5);
		tp.rotation.x=1;
		tp.rotation.y=2.5;
		tp.rotation.z=1;

    PIEaddElement(tp);
    PIErender();
	});

    /* Reset all positions */
    resetExperiment();
	 /* Instantiate experiment controls */
    initialiseControls();
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
    /* Allow Dragging of the ball */
    PIEdragElement(myBall);
    PIEsetDrag(myBall, myBallDrag);


}


var boundaryT=0.0;
var th1=0;
var ct=0;
var ct1=0;
var delt=0.0;
var tp=0;
var dg=0;
function updateExperimentElements(t, dt){
	/* Load Ball coordinates */
	
	sec.rotation.z=ang;
	time=(boundaryT*100) | 0;
	time/=100;
	mtime=time*100-(time | 0)*100;
	mtime=mtime|0;
	time=((time*10)|0)/10;
	if(time>delt){
		ang-=0.0104;
		delt=time;
	}
	dg=th1;
	PIEchangeDisplayText("Time(s)", time);
	PIEchangeDisplayText("Time(ms)", mtime);
	if(mtime%100<10){
		stime=(time|0).toString()+ ":0" + mtime.toString();
	}
	else{
		stime=(time|0).toString()+ ":" + mtime.toString();
	}
	
	
	//textV.position.set(-100,100,100);
	 var loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry(stime, {
		size: 0.2,
		height: 0.05,
		curveSegments : 2,
		font : font,
		weight: 'normal' ,
		style: 'normal',
	});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		PIEscene.remove(textV);
		 textV= new THREE.Mesh(text,material);

		textV.position.set(-1.3,2.1,-3);
		PIEaddElement(textV);
		PIErender();
	});	
    myBallX = myBall.position.x;
    myBallY = myBall.position.y;
    myBallZ = myBall.position.z;
    boundaryT += dt/1000;    /* convert to seconds */
	//console.error((Math.round(Math.abs(th1)*10)/10)==0.0);
	
    th1=0.34*Math.cos(timep*boundaryT-1.57);
	if(dg-th1<0&&((Math.round(Math.abs(th1)*10)/10)==0.0)&&time>0.5&&flag==0){
		rev++;
		flag++;
	}
	else if((Math.round(Math.abs(th1)*10)/10)!=0.0){
		flag=0;
	}
    if(th1>0.32){
    	ct++;

    }
    else if(th1<-0.32){
    	ct1++;
    }
	PIEchangeDisplayText("Oscillation(s)", rev);
	myBallX  = 2-(mysth*Math.sin(th1));
		myBallY  = 3.5-(mysth*Math.cos(th1));
	myBall.position.set(myBallX, myBallY, myBallZ);
	myBall.rotation.z=-1*th1;
	myst.rotation.z=-1*th1;
	if(ct==1){
		ball2.position.set(2-(mysth*Math.sin(0.34)),3.5-(mysth*Math.cos(0.34)),-3.2);
		PIEaddElement(ball2);
	}
	if(ct1==1){
		ball3.position.set(2-(mysth*Math.sin(-0.34)),3.5-(mysth*Math.cos(-0.34)),-3.2);
		PIEaddElement(ball3);
	}
}


function initialiseControls()
{
	PIEaddDisplayText("Length",mysth);
	PIEaddDisplayText("Oscillation(s)",rev);
	PIEaddInputSlider("Length", mysth,handleh,0.5, 3.0, 0.1);
	PIEaddDisplayText("Time(s)",time);
	PIEaddDisplayText("Time(ms)",mtime);
	PIEchangeDisplayCheckbox("jhjhjh", 23);
	
	
    initialiseControlVariables();
}

function handleh(newValue){
	PIEpauseAnimation();
	var old=mysth;
	var ratio=newValue/3.0;
	//console.error(ratio);
	
	myst.scale.set(1,ratio,1);
	if(ratio<0.5){
		var rt=ratio+0.5;
		myBall.scale.set(rt,rt,1);
		ball1.scale.set(rt,rt,1);
		ball2.scale.set(rt,rt,1);
		ball3.scale.set(rt,rt,1);
		
	}
	mysth=newValue;
	timep=tmper(mysth);
	resetExperiment();
	PIEchangeDisplayText("Length", mysth);
	PIErender();
}

function initialiseControlVariables()
{
               
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Bouncing Ball experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
    infoContent = infoContent + "<h3>Collision</h3>";
    infoContent = infoContent + "<p>When an object collides with a surface, the direction of velocity normal to the surface is reversed.</p>";
    infoContent = infoContent + "<p>At the time of impact, the ball is deformed because of the force of the wall. This deformation can be easily observed with a sponge ball. If you drop a ball of dough on the floor, it does not bounce, it is only deformed.</p>";
    infoContent = infoContent + "<p>The harder balls are also deformed. But because of the hard nature of the meterial, the hard ball tries to regain it's shape. This attempt to reain the shape reverses the velocity by pushing aainst the wall.</p>";
    infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the velocity in the X direction reverses while the velocity in the Y direction reamains the same.</p>";
    infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the velocity in the Y direction reverses while the velocity in the Y direction reamains the same.</p>";
    infoContent = infoContent + "<h3>The coefficient of restitution</h3>";
    infoContent = infoContent + "<p>When the velocity reverses direction, it is not necessary that it's magnitude remains the same.</p>";
    infoContent = infoContent + "<p>The ball may not retain it's original shape and texture. The cricket ball loses it's shine.</p>";
    infoContent = infoContent + "<p>Some of the energy is lost because of the deformation of the ball. The energy loss means that the kinetic energy of the ball will be reduced after impact.</p>";
    infoContent = infoContent + "<p>The coefficient of restitution specifies how much of the velocity will be retained after impact.</p>";
    infoContent = infoContent + "<p>The coefficient of restitution does not affect te velocity in the direction parallel to the impact.</p>";
    infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the magnitude of the velocity in the X direction will reduce as per the coefficient of restitution. The magnitude and sign in Y direction remains the same.</p>";
    infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the magnitude of the velocity in the Y direction will reduce as per the coefficient of restitution. The magnitude and sign in X direction remains the same.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Bouncing Ball experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to five sliders.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Controls the X position of the ball.</li>";
    helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Controls the Y position of the ball.</li>";
    helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Controls the X velocity of the ball.</li>";
    helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Controls the Y velocity of the ball.</li>";
    helpContent = helpContent + "<li>AY&nbsp;:&nbsp;Controls the Y acceleration of the ball.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>You also have an additional text input to control the coefficient of restitution of the bottom floor.</p>";
    helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, the ball will bounce around obeyng the laws of physics.</p>";
    helpContent = helpContent + "<p>The right hand panel now shows the values of the four experiment variables during animation.</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Shows the X position of the ball.</li>";
    helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Shows the Y position of the ball.</li>";
    helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Shows the X velocity of the ball.</li>";
    helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Shows the Y velocity of the ball.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>In addition you will also see two sliders showing potential and kinetic energy.</p>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
    helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
    helpContent = helpContent + "<h3>The drag and drop</h3>";
    helpContent = helpContent + "<p>You can also position the ball by dragging and dropping it. You can only do this in the setup stage. This has been prevented in the animation stage.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}