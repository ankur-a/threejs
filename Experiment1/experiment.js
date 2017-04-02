/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */
/* Ball variables */
var myBall;
var scl;             /* Ball Object */
var myst;
var piv;
var start; var mfg=0;
var stop; var basAng=0.0;
var pause; var exptime=0;
var ball1; var posflag=1;
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
var timer=0.0;
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
	PIEpauseAnimation();
    var x= newpos.x, y=newpos.y;
    var cth=th1;
    cth= ((cth*100)|0)/100;
    x=x-2;
    y=y-3.5;
    var h1=Math.atan(x/y);
    var old=mysth
	var newValue=Math.sqrt(x*x+y*y);
    h1= ((h1*100)|0)/100;
    if(h1<=0.35&&h1>=-0.35){
    	
	
	newValue= ((newValue*100)|0)/100;
	if(newValue<=3.0&&newValue>=0.5){

		var ratio=(((newValue*10)|0)/10)/3.0;
		place(h1,ratio,newValue);
	basAng=h1;
	mysth=newValue;
	timep=tmper(mysth);
	PIEchangeDisplayText("Length", mysth);
	PIEupdateTableCell(1, 0, mysth);
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
	posflag=1;
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
	rev=0;
	time=0.0;
	mtime=0;
	ang=0;
	delt=0;
	mfg=0;
	timer=0;
	sec.rotation.z=ang;
	try {
	 stime=time.toString()+":0";
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

		textV.position.set(-1.2,2.3,-3);
		PIEaddElement(textV);
		PIErender();
		pause.position.set(-0.9,2.1,-20);
	start.position.set(-0.9,2.1,-3.1);
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
	initialiseHelp();
    initialiseInfo();
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
    for(var i=0;i<2;i++){
    	ball1= new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1,32), new THREE.MeshLambertMaterial({ color:0x0033cc}));
    	ball1.position.set(2-(1*Math.sin(0.34*i)),3.5-(1*Math.cos(0.34*i)),-3.2);
    	ball1.rotation.z=-0.34*i;
    	PIEaddElement(ball1);
    	ball1= new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1,32), new THREE.MeshLambertMaterial({ color:0x0033cc}));
    	ball1.position.set(2-(1*Math.sin(-0.34*i)),3.5-(1*Math.cos(-0.34*i)),-3.2);
    	ball1.rotation.z=0.34*i;
    	PIEaddElement(ball1);
    }
	var geometry = new THREE.TorusGeometry( 0.7, 0.01, 16, 100 );
	var material = new THREE.MeshLambertMaterial( { color: 0x000000 } );
	var torus = new THREE.Mesh( geometry, material );
	torus.position.set(-1,2.4,-3.1);
	for(var i=0;i<4;i++){
		var ac1= new THREE.Mesh(new THREE.SphereGeometry(myBallRadius/3.5, 32, 32), new THREE.MeshLambertMaterial({ color:0xecb3ff}));
		ac1.position.set(-1-(0.57*Math.sin(1.57*i)),2.4-(0.57*Math.cos(1.57*i)),-3.1);
		PIEaddElement(ac1);
	}
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
	
	for(var i=0;i<12;i++){
		var on = new THREE.Mesh( geometry, material );
		on.position.set(-1-(0.57*Math.sin(0.523*i)),2.4-(0.57*Math.cos(0.523*i)),-3.1);
		PIEaddElement(on);
	}
	var cyl_material = new THREE.MeshLambertMaterial( {color: 0x000000} );
	var cyl_geometry= new THREE.CylinderGeometry(0.002,0.002,0.05,64);
	cyl_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -0.025, 0 ) );
	for(var i=0;i<90;i++){
		var  pix=new THREE.Mesh(cyl_geometry,cyl_material);
	pix.position.set(2.0-(1*Math.sin(0.017*i)),3.5-(1*Math.cos(0.017*i)),-3);
	pix.rotation.z-=(0.017*i);
	PIEaddElement(pix);
	var  pix=new THREE.Mesh(cyl_geometry,cyl_material);
	pix.position.set(2.0-(1*Math.sin(-0.017*i)),3.5-(1*Math.cos(-0.017*i)),-3);
	pix.rotation.z-=(-0.017*i);
	PIEaddElement(pix);
	}
	var cyl_geometry= new THREE.CylinderGeometry(0.003,0.003,0.1,64);
	cyl_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -0.04, 0 ) );
	for(var i=0;i<10;i++){
		var  pix=new THREE.Mesh(cyl_geometry,cyl_material);
	pix.position.set(2.0-(1*Math.sin(0.17*i)),3.5-(1*Math.cos(0.17*i)),-3);
	pix.rotation.z-=(0.17*i);
	PIEaddElement(pix);
	var  pix=new THREE.Mesh(cyl_geometry,cyl_material);
	pix.position.set(2.0-(1*Math.sin(-0.17*i)),3.5-(1*Math.cos(-0.17*i)),-3);
	pix.rotation.z-=(-0.17*i);
	PIEaddElement(pix);
	}
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(2.0,3.5,-3.3));
	geometry.vertices.push(new THREE.Vector3(2.0,0,-3.3));
	geometry.computeLineDistances();
	var material = new THREE.LineDashedMaterial({ color: 0x0033cc, dashSize: 0.1, gapSize: 0.1, linewidth: 5 });
	var mesh = new THREE.Line(geometry, material);
	PIEaddElement(mesh);
	var geometry = new THREE.CircleGeometry( 20, 32 );
	var material = new THREE.MeshBasicMaterial( { color: 0xfdf6d5 } );
	var circle = new THREE.Mesh( geometry, material );
	circle.position.set(-1,2.4,-5);
	PIEaddElement(circle);
	PIEaddElement(sec);
    PIEaddElement(myBall);
	PIEaddElement(myst);
	PIEaddElement(piv);
	PIEaddElement(torus);
	material = new THREE.MeshLambertMaterial( { color: 0xff9900}  );
	geometry = new THREE.BoxGeometry( mySceneW * 4, mySceneH * 2, wallThickness );
    var myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2)-2);
    myBack.receiveShadow=false;
    PIEaddElement(myBack);
    geometry = new THREE.BoxGeometry( 0.8,0.3,-0.01 );
    material = new THREE.MeshLambertMaterial( { color: 0xffffff}  );
    var rect = new THREE.Mesh( geometry, material );
    rect.position.set(-1.0,2.4,-3.05);
    PIEaddElement(rect);
    var loader = new THREE.TextureLoader();
    loader.load('st.jpg', function (texture){
    	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
    	material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.BoxGeometry( 0.25,0.25,0.1 );
    start = new THREE.Mesh( geometry, material );
    start.position.set(-0.9,2.1,-3.1);
    start.receiveShadow=false;
    PIEdefaultHoverON(start);
    PIEaddElement(start);
    PIErender();
    });
	loader.load('stop.jpg', function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.BoxGeometry( 0.25,0.25,0.1 );
    stop = new THREE.Mesh( geometry, material );
    stop.position.set(-1.2,2.1,-3.1);
    stop.receiveShadow=false;
    PIEaddElement(stop);
    PIErender();
	});
	loader.load('pause.jpg',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.BoxGeometry( 0.25,0.25,0.1 );
    pause = new THREE.Mesh( geometry, material );
    pause.position.set(-0.8,2.1,-20);
    pause.receiveShadow=false;
    PIEaddElement(pause);
    PIErender();
	});
	loader.load('ruler.jpg',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture,color:0xffff00}  );
	geometry = new THREE.BoxGeometry( 3,0.4,0.01 );
    scl = new THREE.Mesh( geometry, material );
    scl.position.set(3.5,1.5,-3);
    scl.rotation.z+=1.57;
    scl.receiveShadow=false;
    PIEaddElement(scl);
    PIEdragElement(scl);
    PIEsetDrag(scl,scldg);
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
 
    //Stopwatch buttons
    var mouse = new THREE.Vector2(), INTERSECTED;
    raycaster = new THREE.Raycaster();
    document.addEventListener('click',Mouseclick);
    PIEcreateTable("Observation Table", 2, 4, true);
    var headerRow=["Length", "Oscillation", "Time(s)", "Time(ms)"];
    PIEupdateTableRow(0, headerRow);
    PIEupdateTableCell(1, 0, mysth);
    PIEupdateTableCell(1, 1, rev);
    PIEupdateTableCell(1, 2, time.toFixed(0));
    PIEupdateTableCell(1,3,mtime);
}
function scldg(element,newpos){
	var x= newpos.x, y=newpos.y;
	scl.position.set(x,y,-3);
}

function Mouseclick(event){
	event.preventDefault();
	var intersects;
	PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
	intersects = PIEraycaster.intersectObjects(PIEscene.children);
	if ( intersects.length > 0 ) {
		var clicked =  intersects[0].object;
             //intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
					if(intersects[0].object==start){
					//	console.error(23);
						pause.position.set(-0.9,2.1,-3.1);
						start.position.set(-0.9,2.1,+3.1);
						mfg=1;
					}
					else if(intersects[0].object==pause){
					//	console.error(23);
						pause.position.set(-0.9,2.1,+3.1);
						start.position.set(-0.9,2.1,-3.1);
						mfg=0;
					}
					else if(intersects[0].object==stop){
					//	console.error(23);
						pause.position.set(-0.9,2.1,+3.1);
						start.position.set(-0.9,2.1,-3.1);
						mfg=0;
						time=0;
						timer=0;
						mtime=0;
						rtime=0;
						ang=0;
						delt=0; sec.rotation.z=ang;
						PIErender();
						try {
	 stime=time.toString()+":0";
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
		PIEchangeDisplayText("Time(s)",time);
		PIEchangeDisplayText("Time(ms)",mtime);
    	PIEupdateTableCell(1, 2, time.toFixed(0));
    	PIEupdateTableCell(1,3,mtime);
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		PIEscene.remove(textV);
		 textV= new THREE.Mesh(text,material);
		textV.position.set(-1.2,2.3,-3);
		PIEaddElement(textV);
		PIErender();
	});	
	}
	catch(err) {
	}
	
					}
    
 }

}

var rtime=0;
var boundaryT=0.0;
var th1=0;
var ct=0;
var ct1=0;
var delt=0.0;
var tp=0;
var dg=0;
function updateExperimentElements(t, dt){
	/* Load Ball coordinates */
	if(mfg!=0){
		sec.rotation.z=ang;
		timer+=dt/1000;
	time=(timer*100) | 0;
	time/=100;
	mtime=time*100-(time | 0)*100;
	mtime=mtime|0;
	time=((time*10)|0)/10;
	if(time>delt){
		ang-=0.0104;
		delt=time;
	}
	
	PIEchangeDisplayText("Time(s)", time);
	PIEchangeDisplayText("Time(ms)", mtime);
    PIEupdateTableCell(1, 2, time.toFixed(0));
    PIEupdateTableCell(1,3,mtime);
	//console.error(((mtime/10)|0)/10);
	//textV.position.set(-100,100,100);
	if(rtime<((time|0)+((mtime/10)|0)/10)){
		rtime=((time|0)+((mtime/10)|0)/10);
		stime=(time|0).toString()+ ":" + ((mtime/10)|0).toString();
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

		textV.position.set(-1.2,2.3,-3);
		PIEaddElement(textV);
		PIErender();
	});	
	}
	}
	 
	
    myBallX = myBall.position.x;
    myBallY = myBall.position.y;
    myBallZ = myBall.position.z;
    boundaryT += dt/1000;    /* convert to seconds */
    exptime +=dt/1000;
	
	dg=th1;
    th1=0.34*Math.cos(timep*boundaryT-1.57);
    if(posflag==1){
    	if((dg-th1)<0&&((((th1*100)|0)/100<=(basAng+0.01))&&(((th1*100)|0)/100>=(basAng-0.01)))&&exptime>0.5&&flag==0){
		rev++;
		flag++;
	}
	else if(!((((th1*100)|0)/100<=(basAng+0.01))&&(((th1*100)|0)/100>=(basAng-0.01)))){
		flag=0;
	}
    }
    else if(posflag==0){
    	if(dg-th1>0&&((((th1*100)|0)/100<=(basAng+0.01))&&(((th1*100)|0)/100>=(basAng-0.01)))&&exptime>0.5&&flag==0){
		rev++;
		flag++;
	}
	else if(!((((th1*100)|0)/100<=(basAng+0.01))&&(((th1*100)|0)/100>=(basAng-0.01)))){
		flag=0;
	}
    }
    PIEupdateTableCell(1, 1, rev);
	PIEchangeDisplayText("Oscillation(s)", rev);
	myBallX  = 2-(mysth*Math.sin(th1));
		myBallY  = 3.5-(mysth*Math.cos(th1));
	myBall.position.set(myBallX, myBallY, myBallZ);
	myBall.rotation.z=-1*th1;
	myst.rotation.z=-1*th1;
}


function initialiseControls()
{
	PIEaddDisplayText("Length",mysth);
	PIEaddDisplayText("Oscillation(s)",rev);
	PIEaddInputSlider("Length", mysth,handleh,0.5, 3.0, 0.1);
	PIEaddDisplayText("Time(s)",time);
	PIEaddDisplayText("Time(ms)",mtime);
    initialiseControlVariables();
}

function handleh(newValue){
	PIEpauseAnimation();
	var old=mysth;
	var ratio=newValue/3.0;
	myst.scale.set(1,ratio,1);
	if(ratio<0.5){
		var rt=ratio+0.5;
		myBall.scale.set(rt,rt,1);
	}
	mysth=newValue;
	timep=tmper(mysth);
	//resetExperiment();
	place(th1,ratio,newValue);
	PIEchangeDisplayText("Length", mysth);
	PIEupdateTableCell(1, 0, mysth);
	PIErender();
}

function place(angl,rat,len){
	time=0;
	exptime=0;
	var x=(mysth*Math.sin(angl));
	var y=(mysth*Math.cos(angl));
	var len= Math.sqrt(x*x+y*y);
	rat=len/3.0;
	myst.scale.set(1,rat,1);
	if(rat<0.5){
		var rt=rat+0.5;
		myBall.scale.set(rt,rt,1);
	}
	myBallX  = 2-(mysth*Math.sin(angl));
	myBallY  = 3.5-(mysth*Math.cos(angl));

	myBall.position.set(myBallX, myBallY, -3);
	myst.rotation.z=-1*angl;
	basAng=angl;
	if(angl>=0.0){
		posflag=0;
		boundaryT= (Math.acos(angl/0.34)+1.57)/timep;
	}
	else if(angl<0.0){
		posflag=1;
		var temp=(Math.acos(-0.34/0.34)+1.57)/timep;
		boundaryT= (Math.acos(angl/0.34)+1.57)/timep;
		boundaryT= boundaryT+ Math.abs(boundaryT-temp)*2;
	}
	
	rev=0;
	time=0.0;
	mtime=0;
	ang=0;
	delt=0;
	sec.rotation.z=ang;
	try {
	 stime=time.toString()+":0";
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

		textV.position.set(-1.2,2.3,-3);
		PIEaddElement(textV);
		PIErender();
		pause.position.set(-0.9,2.1,+3.1);
	start.position.set(-0.9,2.1,-3.1);
	});	
	}
	catch(err) {
	}
	basAng= (((basAng*10)|0)/10);
	PIEchangeDisplayText("Time(s)",time);
	PIEchangeDisplayText("Time(ms)",mtime);
    PIEupdateTableCell(1, 2, time.toFixed(0));
    PIEupdateTableCell(1,3,mtime);

}


function initialiseControlVariables()
{
               
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Time period of a pendulum experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shws a pendulum attached to a wooden stand oscillating around it's fixed hinge.</p>";
    infoContent = infoContent + "<h3>Oscillation</h3>";
    infoContent = infoContent + "<p>When the angle of rotation is small preferably < 20 degrees the ball oscillating around its hinge behaves like a simple pendulum.</p>";
    infoContent = infoContent + "<p>TThe time period is independent of the weight of the bob and depends only on the gravitational pull and mean length of the pendulum.</p>";
    infoContent = infoContent + "<p>If the angle of oscillation increses then it starts depending on the angle found using a infinite series</p>";
    infoContent = infoContent + "<p> The time period is calculated using = . <MATH>T = <SQRT>(l/g)</SQRT></MATH></p>";
    infoContent = infoContent + "<p>l is the length of the time period</p>";
    infoContent = infoContent + "<p>g is the gravitational constant usually taken as 9.8 in mks units .</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Time period of a pendulum help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shws a pendulum attached to a wooden stand oscillating around it's fixed hinge</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to one sliders.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>Length&nbsp;:&nbsp;Controls the length of the pendulum.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>You also have an additional text input to control the coefficient of restitution of the bottom floor.</p>";
    helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, the pendulum will oscillate according to the law of physics</p>";
    helpContent = helpContent + "<p>The left hand side you can see a analog+digital stop watch which show's the time passed.</p>"
    helpContent = helpContent + "<p>The right hand panel now shows the values of the four experiment variables during animation.</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>Length&nbsp;&nbsp;:&nbsp;Current length.</li>";
    helpContent = helpContent + "<li>Oscillation&nbsp;&nbsp;:&nbsp;Total no. of Oscilation.</li>";
    helpContent = helpContent + "<li>Time(s)&nbsp;:&nbsp;Shows the time in secs..</li>";
    helpContent = helpContent + "<li>Time(ms)&nbsp;:&nbsp;Shows the time in milli second.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>In addition you will also see two sliders showing potential and kinetic energy.</p>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
    helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
    helpContent = helpContent + "<h3>The drag and drop</h3>";
    helpContent = helpContent + "<p>You can also position the ball by dragging and dropping it. You can only do this in the setup stage. This has been prevented in the animation stage.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}