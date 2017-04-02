/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */
var group;
var circle;
/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */
var base,start,tbl,lg1,lg2,lg3,lg3;
var dr;
//
var gh,gh1,gh_1,gh_2;
var textV;
var torus;
var mflag=0;
function initialiseControlVariables(){

}

function initialiseControls(){
	initialiseControlVariables();
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
}

function initialiseOtherVariables(){

}

function loadExperimentElements(){

var geometry;
var material;
var loader;
var texture;
	PIEsetExperimentTitle("Magnetic Compass");
    PIEsetDeveloperName("Ankur .");

    /* initialise Scene */
    initialiseScene();
    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Other Variables */
    initialiseOtherVariables();
	/* Instantiate experiment controls */
    initialiseControls();
    

    geometry = new THREE.PlaneGeometry( 100, 100, 32 );;
    material = new THREE.MeshLambertMaterial( {color: 0xafbac5} );
    var myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, -10);
    myBack.receiveShadow = false;
    PIEaddElement(myBack);

    material= new THREE.MeshLambertMaterial({color:0x6683fa});
	geometry = new THREE.CylinderGeometry( 1.5,1.5, 0.02, 64);
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.01, 0 ) );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad(180) ) );
	base = new THREE.Mesh(geometry,material);
	var loader = new THREE.TextureLoader();
    loader.load('face.png', function (texture){
    	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
    	material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.CylinderGeometry( 1.2, 1.2, 0.1, 64,64);
    start = new THREE.Mesh( geometry, material );
    //start.position.set(-0.9,2.1,-2.8);
    start.receiveShadow=false;
    start.rotation.x=THREE.Math.degToRad(90);
    start.rotation.y=THREE.Math.degToRad(90);
    start.castshadow=false;
    start.rotation.x-=0.8;
   // start.scale.set(0.8,0.8,1);
    PIEaddElement(start);
    PIEdragElement(start);
	PIEsetDrag(start,grpdg);
	start.position.set(2,1.8,-3);

    PIErender();
    });
    loader.load('dr.jpg', function (texture){
    	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
    	material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.CylinderGeometry( 0.7, 0.7, 0.1, 64,64);
    dir = new THREE.Mesh( geometry, material );
    //start.position.set(-0.9,2.1,-2.8);
    dir.receiveShadow=false;
    dir.rotation.x=THREE.Math.degToRad(90);
    dir.rotation.y=THREE.Math.degToRad(90);
    dir.castshadow=false;
    PIEaddElement(dir);
	dir.position.set(6.5,3,-5);
    PIErender();
    });
    loader.load('1.jpg', function (texture){
    	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 5, 1 );
    	material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.BoxGeometry( 8,5,0.3 );
    tbl = new THREE.Mesh( geometry, material );
    //start.position.set(-0.9,2.1,-2.8);
    tbl.receiveShadow=false;
    tbl.castshadow=false;;
	tbl.position.set(2,1.8,-5);
	tbl.rotation.x-=0.8;
	PIErender();
	//tbl.rotation.z+=0.1;
	PIEaddElement(tbl);
	
    });
    loader.load('1.jpg',function(texture){
    	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    	texture.repeat.set( 1,2 );
    material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.BoxGeometry( 0.3,3,0.3 );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -1.0, 0 ) );
	lg1= new THREE.Mesh(geometry,material);
	lg1.position.set(-0.8,-0.3,-4);
	lg1.rotation.x+=0.8;
	
	PIEaddElement(lg1);
	lg2=lg1.clone();
	lg1.rotation.z-=0.1;
	lg2.position.set(5,-0.3,-4);
	PIEaddElement(lg2);
    PIErender(); 
    });
	material= new THREE.MeshLambertMaterial({color:0xffffff});
	material= new THREE.MeshLambertMaterial({color:0xff0000});
	geometry = new THREE.CylinderGeometry( 0.005, 0.1, 1, 64,64,true);
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
	gh= new THREE.Mesh(geometry,material);
	gh.position.set(2,1.8,-2.8);
	gh.rotation.x-=0.8;
	gh.position.set(2,1.8,-2.8);
	gh.rotation.z=-0.174533*5;
	PIEaddElement(gh);
	material= new THREE.MeshLambertMaterial({color:0xffffff});
	geometry = new THREE.CylinderGeometry( 0.1, 0.005, 1, 64,64,true);
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -0.5, 0 ) );
	gh1= new THREE.Mesh(geometry,material);
	gh1.position.set(2,1.8,-2.8);
	gh1.rotation.z=-0.174533*5;
	gh1.rotation.x-=0.8;
	PIEaddElement(gh1);
	geometry = new THREE.CircleGeometry( 1.2, 32 );
	material = new THREE.MeshBasicMaterial( { color: 0xccccff } );
	circle = new THREE.Mesh( geometry, material );
	circle.position.set(2,1.8,-3.3);
	circle.rotation.x-=0.8;
	//PIEaddElement(circle);
	
	 /* Reset all positions */
	 PIErender();
    
    var geometry = new THREE.TorusGeometry( 1.5, 0.09, 3, 100 );
	var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	 torus = new THREE.Mesh( geometry, material );
 	torus.position.set(2,1.8,-3);
 	   PIEaddElement(torus);
 	   torus.rotation.x-=0.8;
 	   PIErender();
 	  resetExperiment();
   
 	  gh1.scale.set(1,1,0.5);
	  gh.scale.set(1,1,0.5);
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
    torus.scale.set(0.8,0.8,1);
 	 
}
var px,py,fg=0;
function grpdg(element,newpos){
	

	var x= newpos.x, y=newpos.y;
	if(x>-0.6&&x<5&&y<2.8&&y>0.6){
		start.position.set(x,y,-3);
	//console.error(x);
	//console.error(y);
	gh.position.set(x,y,-2.8);
	gh1.position.set(x,y,-2.8);
	torus.position.set(x,y,-3);
	if(x<0){
		flag=0;
		max+=0.01;
		boundaryT= (Math.acos(0.34/0.34)+1.57)/timep;
		start.rotation.y+=0.05;
		//gh.rotation.z=0.34;
		//gh1.rotation.z=0.34;
	}
	else{
		flag=0;
		max+=-0.1;
		boundaryT= (Math.acos(-0.34/0.34)+1.57)/timep;
		start.rotation.y-=0.1;
		//gh_1.rotation.z=-0.34;
		//gh_2.rotation.z=-0.34;
	}
	}
	
}





function resetExperiment(){
	
	timep=tmper(1);
	boundaryT= (Math.acos(1)+1.57)/timep;
	
	try{
		start.rotation.y=THREE.Math.degToRad(-270);
		torus.position.set(2,1.8,-3);
	gh.position.set(2,1.8,-2.8);
	gh1.position.set(2,1.8,-2.8);
	start.position.set(2,1.8,-3);
	}
catch(err){

}
	max=0.174533*5;
	flag=0;
	PIErender();
	/* initialise Other Variables */
    initialiseOtherVariables();


}

function tmper(p1){
		return (1/(Math.sqrt(p1/9.8)));
}
var th1;
var boundaryT;
var timep;
var max;
var flag=0;
function updateExperimentElements(t, dt){
	try{
		if(mflag==0){
		gh1.position.set(2,1.8,-2.8);
	gh.position.set(2,1.8,-2.8);
	mflag++;
	gh.rotation.z=-0.174533*5;
	gh1.rotation.z=-0.174533*5;
	}
	else{
		th1=max*Math.cos(timep*boundaryT-1.57);
	gh.rotation.z=th1;
	gh1.rotation.z=th1;
	}

	}
	catch(err){

	}
	
	boundaryT+=(dt/1000)*2;
	//gh.position.set(2,1.8,-2.8);
	
	//console.error(((th1*100)|0)/100);
	//console.error(((max*100)|0)/100);
	if(max!=0&&(((th1*100)|0)/100)<=(((max*100)|0)/100)+0.05&&(((th1*100)|0)/100)>=(((max*100)|0)/100)-0.05 && flag==0){
		console.error(max);
		max-=0.05;
		max=((max*100)|0)/100;
		if(max<0.02){
		max=0;
		flag++;
	}
	}


}

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Magnetic Compass experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shws a magnetic compass on a table.</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, the compass will always point to north.</p>";
    helpContent = helpContent + "<p>In addition you can push the magnetic compass by drag and drop the compass on the table again leaving in the rest stage it will come back to north direction.</p>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
    helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
    PIEupdateHelp(helpContent);
}
var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Magnetic compass experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shws a magnetic compass on a table</p>";
    infoContent = infoContent + "<h3>Earth magnetic field</h3>";
    infoContent = infoContent + "<p>Earth's magnetic field, also known as the geomagnetic field, is the magnetic field that extends from the Earth's interior out into space, where it meets the solar wind, a stream of charged particles emanating from the Sun.</p>";
    infoContent = infoContent + "<p>Earth's surface ranges from 25 to 65 microteslas (0.25 to 0.65 gauss).</p>";
    infoContent = infoContent + "<p>Roughly speaking it is the field of a magnetic dipole currently tilted at an angle of about 10 degrees with respect to Earth's rotational axis, as if there were a bar magnet placed at that angle at the center of the Earth</p>";
    infoContent = infoContent + "<p>The North geomagnetic pole, located near Greenland in the northern hemisphere, is actually the south pole of the Earth's magnetic field, and the South geomagnetic pole is the north pole. Unlike a bar magnet, Earth's magnetic field changes over time because it is generated by a geodynamo (in Earth's case, the motion of molten iron alloys in its outer core)</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}