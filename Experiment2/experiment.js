/* Global Variables */
/* the developer should define variables and constants here */
/* We define a room with 3 walls, floor and ceiling */
/* We define a ball which bounces in the xy plane */
/* We define modifiable prameters : gravity, ball size, initial velocity */
/* We support draggable ball */
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */
var value;
/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Variables*/
var cpow='-1.0 D',vpow='+1.0 D';
var ccpow=-1.0,vvpow=+1,spow=0.0,cnt=0,sum=0;
var cplus;
var cminus;
var cbut;
var ctextpow;
var vtextpow;
var cratio=0.5;
var lenh1,lenh2;
var xpos=1.5,xpos1=1.5;
var vbut,vminus,vplus;
var vlens;
var flen1,flen2;
var clens1;
var out; var reset;
var mflag=0,obflag=0;
var final,final1,final2;
var rem;
var myobj={},j=0,tot;
function initialiseControlVariables(){

}

function initialiseControls()
{
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

function initialiseOtherVariables()
{

}

function loadExperimentElements(){
var geometry;
var material;
var loader;
var texture;
	PIEsetExperimentTitle("Multiple lenses together");
    PIEsetDeveloperName("Ankur .");
    initialiseHelp();
    initialiseInfo();
    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();
    /* Back */
    geometry = new THREE.BoxGeometry( mySceneW * 2*10, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, -5);
    myBack.receiveShadow = true;
    PIEaddElement(myBack);

     /* Instantiate experiment controls */
    initialiseControls();

    /* Reset all positions */
    resetExperiment();

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
   geometry = new THREE.SphereBufferGeometry(0.1,32,32,0,Math.PI/2);
   material =new THREE.MeshLambertMaterial({color:0xcccccc});
   lenh1= new THREE.Mesh(geometry,material);
   lenh1.scale.set(0.3,1.5,1);

   PIEaddElement(lenh1);
   lenh1.position.set(3.8,3.0,-3);
   lenh2= new THREE.Mesh(geometry,material);
   PIEaddElement(lenh2);
   lenh2.rotation.z+=Math.PI;
   lenh2.position.set(3.8,3.0,-3);
   lenh2.scale.set(0.5,5,1);
   lenh1.scale.set(0.5,5,1);
   var lens2=new THREE.Shape();
   lens2.moveTo(0,0);
   lens2.bezierCurveTo(0,0,0.2,0,0.4,0);
   lens2.bezierCurveTo(0.4,0,0.1,0.2,0.4,0.4);
   lens2.bezierCurveTo(0.4,0.4,0.2,0.4,0,0.4);
   lens2.bezierCurveTo(0,0.4,0.4,0.2,0,0);
   var extrudeSettings = { amount: 0.02, bevelEnabled: false, steps: 2 };

var geometry = new THREE.ExtrudeGeometry( lens2, extrudeSettings );

 vlens = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color:0xcccccc}) );
vlens.position.set(0.3,2.5,-3);
vlens.scale.set(0.3,2.5,1);
PIEaddElement(vlens);
loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry('Concave lens', {
		size: 0.2,
		height: 0.05,
		curveSegments : 2,
		font : font,
		weight: 'normal' ,
		style: 'normal',
	});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		var textV= new THREE.Mesh(text,material);

		textV.position.set(-1.6,3.3,-3);
		PIEaddElement(textV);
		PIErender();
	});	
loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry('Convex lens', {
		size: 0.2,
		height: 0.05,
		curveSegments : 2,
		font : font,
		weight: 'normal' ,
		style: 'normal',
	});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		var  textV1= new THREE.Mesh(text,material);

		textV1.position.set(2,3.3,-3);
		PIEaddElement(textV1);
		PIErender();
	});	
	 var loader = new THREE.TextureLoader();
	 loader.load('plus.png',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.CylinderGeometry( 0.15,0.15,0.05,64 );
    cplus = new THREE.Mesh( geometry, material );
    cplus.position.set(-1.5,3.0,-3);
    cplus.rotation.x=THREE.Math.degToRad(90);
    cplus.receiveShadow=false;
    PIEaddElement(cplus);
    PIErender();
	});
	 var loader = new THREE.TextureLoader();
	 loader.load('reset.png',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture,color:0xffffff}  );
	geometry = new THREE.BoxGeometry( 0.2,0.2,0.02 );
    reset = new THREE.Mesh( geometry, material );
    reset.position.set(-2.0,3.5,-3);
    PIEaddElement(reset);
    PIErender();
	});
	 
	 var loader = new THREE.TextureLoader();
	loader.load('minus.jpg',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.CylinderGeometry( 0.15,0.15,0.05,64 );
    cminus = new THREE.Mesh( geometry, material );
    cminus.position.set(-0.5,3.0,-3);
    cminus.rotation.x=THREE.Math.degToRad(90);
    cminus.rotation.y=THREE.Math.degToRad(90);
    cminus.receiveShadow=false;
    PIEaddElement(cminus);
    PIErender();
	});
	loader.load('add_but.png',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1,1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.BoxGeometry( 0.4,0.4,0.01 );
    cbut = new THREE.Mesh( geometry, material );
    cbut.position.set(1.0,3.0,-3);
    cbut.receiveShadow=false;
    PIEaddElement(cbut);
    PIErender();
	});
	var backgr= new THREE.Mesh(geometry = new THREE.BoxGeometry( 1.7,0.3,0.01 ),material = new THREE.MeshLambertMaterial( { color:0xffffff}  ));
	PIEaddElement(backgr);
	backgr.position.set(2.83,3.4,-3);
	var backgr= new THREE.Mesh(geometry = new THREE.BoxGeometry( 1.85,0.3,0.03 ),material = new THREE.MeshLambertMaterial( { color:0xffffff}  ));
	PIEaddElement(backgr);
	backgr.position.set(-0.73,3.4,-3);
	loader.load('Delete.png',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1,1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.BoxGeometry( 0.2,0.2,0.01 );
    rem = new THREE.Mesh( geometry, material );
    rem.position.set(1.5,3.0,2);
    rem.receiveShadow=false;
    PIEaddElement(rem);
    PIErender();
	});

	loader.load('plus.png',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.CylinderGeometry( 0.15,0.15,0.1,64 );
    vplus = new THREE.Mesh( geometry, material );
    vplus.rotation.x=THREE.Math.degToRad(90);
    vplus.position.set(2.2,3.0,-3);
    vplus.receiveShadow=false;
    PIEaddElement(vplus);
    PIErender();
	});
	
	 var loader = new THREE.TextureLoader();
	loader.load('minus.jpg',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.CylinderGeometry( 0.15,0.15,0.1,64 );
    vminus = new THREE.Mesh( geometry, material );
    vminus.rotation.x=THREE.Math.degToRad(90);
    vminus.rotation.y=THREE.Math.degToRad(90);
    vminus.position.set(3.2,3.0,-3);
    vminus.receiveShadow=false;
    PIEaddElement(vminus);
    PIErender();
	});
	loader.load('add_but.png',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture, color:0xffffff}  );
	geometry = new THREE.BoxGeometry( 0.4,0.4,0.01 );
    vbut = new THREE.Mesh( geometry, material );
    vbut.position.set(4.5,3.0,-3);
    vbut.receiveShadow=false;
    PIEaddElement(vbut);
    PIErender();
	});
	var loader = new THREE.TextureLoader();
	loader.load('Results.png',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.BoxGeometry( 0.5,0.5,0.02 );
    out = new THREE.Mesh( geometry, material );
    out.position.set(-1.5,1,-2.9);
    out.receiveShadow=false;
    PIEaddElement(out);
    PIErender();
	});
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-10,1.5,-3.0));
	geometry.vertices.push(new THREE.Vector3(10,1.5,-3.0));
	geometry.computeLineDistances();
	var material = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.1, gapSize: 0.05, linewidth: 3 });
	var mesh = new THREE.Line(geometry, material);
	PIEaddElement(mesh);
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-10,0,-3.0));
	geometry.vertices.push(new THREE.Vector3(10,0,-3.0));
	geometry.computeLineDistances();
	var material = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.1, gapSize: 0.05, linewidth: 3 });
	var mesh = new THREE.Line(geometry, material);
	PIEaddElement(mesh);

	var mouse = new THREE.Vector2(), INTERSECTED;
    raycaster = new THREE.Raycaster();
    document.addEventListener('click',Mouseclick);

}

function Mouseclick(event){
	event.preventDefault();
	var intersects;
	PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
	intersects = PIEraycaster.intersectObjects(PIEscene.children);
	if ( intersects.length > 0 ){
            // intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
             if(intersects[0].object==cplus){
             	if(ccpow!=-3){
             		ccpow--;
             		cpow= ccpow.toString()+'.0 D';
             		var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(cpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					PIEscene.remove(ctextpow);
					ctextpow= new THREE.Mesh(text,material);
					ctextpow.position.set(-1.3,2.9,-3);
					PIEaddElement(ctextpow);
					vlens.scale.set(0.3*Math.abs(ccpow),2.5,1);
					PIErender();
	});

             	}
             }
             else if(intersects[0].object==cminus){
             	if(ccpow!=-1){
             		ccpow++;
             		cpow= ccpow.toString()+'.0 D';
             		var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(cpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					PIEscene.remove(ctextpow);
					ctextpow= new THREE.Mesh(text,material);
					ctextpow.position.set(-1.3,2.9,-3);
					PIEaddElement(ctextpow);
					vlens.scale.set(0.3*Math.abs(ccpow),2.5,1);
					PIErender();});
             	}
             }
             else if(intersects[0].object==vbut&&cnt!=5){
             	rem.position.set(xpos,2.2,-2.0);
             	obflag=2;
             	myobj['obj'+j]=lenh1.clone();
             	myobj['obj'+(j+1)]=lenh2.clone();
             	PIEaddElement(myobj['obj'+j]);
             	PIEaddElement(myobj['obj'+(j+1)]);
             	myobj['obj'+j].position.set(xpos,1.5,-3.0);
             	myobj['obj'+(j+1)].position.set(xpos,1.5,-3.0);
             	xpos+=0.35;
             	myobj['obj'+j].scale.set(0.5*vvpow,5,1);
             	myobj['obj'+(j+1)].scale.set(0.5*vvpow,5,1);
             	PIErender();
             	cnt++;
             	sum+=vvpow;
             	j+=2;
             	val=vvpow;
             }
             else if(intersects[0].object==vplus&&vvpow!=3){
					vvpow++; 
					console.error(-1);            	
             		vpow= '+'+vvpow.toString()+'.0 D';
             		var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(vpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					PIEscene.remove(vtextpow);
					vtextpow= new THREE.Mesh(text,material);
					vtextpow.position.set(2.4,2.9,-3);
					PIEaddElement(vtextpow);
					lenh1.scale.set(0.5*vvpow,5,1);
             	lenh2.scale.set(0.5*vvpow,5,1);
					PIErender();
	});

             }
             else if(intersects[0].object==vminus&&vvpow!=1){
					vvpow--; 
					//console.error(-1);            	
             		vpow= '+'+vvpow.toString()+'.0 D';
             		var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(vpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					PIEscene.remove(vtextpow);
					vtextpow= new THREE.Mesh(text,material);
					vtextpow.position.set(2.4,2.9,-3);
					PIEaddElement(vtextpow);
					lenh1.scale.set(0.5*vvpow,5,1);
             	lenh2.scale.set(0.5*vvpow,5,1);
					PIErender();
	});

             }
             else if(intersects[0].object==cbut&&cnt!=5){
             	rem.position.set(xpos,2.2,-2.0);
             	obflag=1;
             	sum+=ccpow;
             	val=ccpow;
             	myobj['obj'+j]=vlens.clone();
             	PIEaddElement(myobj['obj'+j]);
             	myobj['obj'+j].position.set(xpos,1,-3);
             	myobj['obj'+j].scale.set(0.3*Math.abs(ccpow),2.5,1);
             	xpos+=0.35;
             	cnt++;
             	j++;
             }
             if(intersects[0].object==rem&&(obflag==1||obflag==2)){
             	rem.position.set(xpos,2.2,10); xpos-=0.35;cnt--;
             		if(obflag==1){
             			sum-=val;
             			PIEscene.remove(myobj['obj'+(j-1)]);
             			j--;
             		}
             		else if(obflag==2){
             			sum-=val;
             			PIEscene.remove(myobj['obj'+(j-1)]);
             			PIEscene.remove(myobj['obj'+(j-2)]);
             			j-=2;
             		}
             		obflag=0;
             }
             if(intersects[0].object==reset){
             	resetExperiment();
             }
             if(intersects[0].object==out){
             	if(mflag>0){
             		PIEscene.remove(tot);
             		PIEscene.remove(final);
             		PIEscene.remove(final1);
             		PIEscene.remove(final2);
             	}
             	mflag++;
             	var loader= new THREE.FontLoader();
	 			var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 			function ( font ) {
				var text = new THREE.TextGeometry(sum.toString()+'.0 D', {size: 0.3,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
				var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
				tot= new THREE.Mesh(text,material);
				tot.position.set(-1.0,0.9,-2.9);
				PIEaddElement(tot);
				PIErender();
			});
             	if(sum==0){
             			var	material = new THREE.MeshLambertMaterial( { color:0xffffff}  );
						var geometry = new THREE.BoxGeometry( 0.25,1,0.02 );
    					final = new THREE.Mesh( geometry, material );
    					PIEaddElement(final); final.position.set(1.5,0,-3.0);
             	}
             	else if(sum>0){
             			final1=lenh1.clone();
             			final2=lenh2.clone();
             			PIEaddElement(final1);
             			PIEaddElement(final2);
             			final1.position.set(1.5,0,-3.0);
             			final2.position.set(1.5,0,-3.0);
             			final1.scale.set(0.5*sum,5,1);
             			final2.scale.set(0.5*sum,5,1);
             			PIErender();
             	}
             	else if(sum<0){
             	final=vlens.clone();
             	PIEaddElement(final);
             	final.position.set(1.5,-0.5,-3);
             	final.scale.set(0.3*Math.abs(sum),2.5,1);
             	}
             }
	}
	PIErender();
}
function resetExperiment()
{

    /* initialise Other Variables */
    initialiseOtherVariables();
    try{
    vlens.scale.set(0.3,2.5,1);
    lenh1.scale.set(0.5,5,1);
    lenh2.scale.set(0.5,5,1);
    rem.position.set(1.5,3.0,2);	
    }
    catch(err){

    }
    /* Back */
   // myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
    sum=0;cnt=0,xpos=1.5,j=0;
	 ccpow=-1.0,vvpow=+1;
	 cpow= ccpow.toString()+'.0 D';
	 vpow= '+'+vvpow.toString()+'.0 D';
   var loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry(cpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		PIEscene.remove(ctextpow);
		ctextpow= new THREE.Mesh(text,material);
		ctextpow.position.set(-1.3,2.9,-3);
		PIEaddElement(ctextpow);
		PIErender();
	});

	loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry(vpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		PIEscene.remove(vtextpow);
		vtextpow= new THREE.Mesh(text,material);
		vtextpow.position.set(2.4,2.9,-3);
		PIEaddElement(vtextpow);
		PIErender();
	});
	 PIEscene.remove(final);
	 PIEscene.remove(final1);
	 PIEscene.remove(final2);
	 PIEscene.remove(tot);
	 mflag=0;
	
	 for(var i=0;i<10;i++){
	 	PIEscene.remove(myobj['obj'+i]);
	 	PIErender();
	 }
   
}

function updateExperimentElements(t, dt)
{

}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Multiple lenses together</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows a two types of lenses namely concave and conves lens which can be added to form a combination according to our choice of power.</p>";
    infoContent = infoContent + "<h3>Optical Power</h3>";
    infoContent = infoContent + "<p>Optical power (also referred to as dioptric power, refractive power, focusing power, or convergence power) is the degree to which a lens, mirror, or other optical system converges or diverges light.</p>";
    infoContent = infoContent + "<p>t is equal to the reciprocal of the focal length of the device: P = 1/f.High optical power corresponds to short focal length. The SI unit for optical power is the inverse metre (m−1), which is commonly called the dioptre.</p>";
    infoContent = infoContent + "<h3>Combination of lenses</h3>";
    infoContent = infoContent + "<p> For two or more thin lenses close together, the optical power of the combined lenses is approximately equal to the sum of the optical powers of each lens: P = P1 + P2.</p>";
    infoContent = infoContent + "<p>Similarly, the optical power of a single lens is roughly equal to the sum of the powers of each surface. These approximations are commonly used in optometry.</p>";
    PIEupdateInfo(infoContent);
}

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Multiple lenses together help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows a two types of lenses namely concave and conves lens which can be added to form a combination according to our choice of power.</p>";
    helpContent = helpContent + "<h3>Experiment control</h3>";
    helpContent = helpContent + "<p>There are two choice to select from<br> 1. Convex Lens <br>2. Concave lens.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a two types of lenses two add to the screen.</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, you can click on the result button and get the output of the combination of the lens.</p>";
 
    helpContent = helpContent + "<p>In addition you can reset the setup by pressing the reset button at the top of the start, pause and reset button panel.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}