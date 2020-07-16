window.onload = function(){
    main();
}

function randInt(max) {
    return Math.floor((Math.random() * max) + 0);
}

function main(){
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( "rgb(0,0,50)" );
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

    
    camera.position.set( -33, 24, -33);
    camera.lookAt( 100, -30, 100 );
    camera.up.set( 0, 0, 1 );
    camera.updateProjectionMatrix();
    

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geoPlane = new THREE.BoxGeometry(30,1,30);
    var matPlane = new THREE.MeshLambertMaterial();
    matPlane.color = new THREE.Color("rgb(255,253,0)")
    var meshPlane = new THREE.Mesh(geoPlane,matPlane)
    meshPlane.position.set(16,0,15);
    scene.add( meshPlane );

    var geoBox = new Array(10);
    var matBox = new Array(10);
    var meshBox = new Array(10);
    for (let i = 0; i < 10; i++) {
        geoBox[i] = new Array(10);
        matBox[i] = new Array(10);
        meshBox[i] = new Array(10);
    }

    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            geoBox[i][j] = new THREE.BoxGeometry(1.5,1.5,1.5);
            matBox[i][j] = new THREE.MeshLambertMaterial();
            let r = randInt(255)
            let g = randInt(255)
            let b = randInt(255)
            matBox[i][j].color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);
            meshBox[i][j] = new THREE.Mesh( geoBox[i][j], matBox[i][j]);
            console.log(`${i} ${j}:${i*3+1.5} ${j*3+1.5}`)
            meshBox[i][j].position.set(i*3+1.5, 2,j*3+ 1.5);
            scene.add( meshBox[i][j] );
        }
    }

    var geoSphere = new THREE.SphereGeometry( 3, 15, 15 );
    var matSpere = new THREE.MeshBasicMaterial();
    matSpere.color = new THREE.Color("rgb(249,166,2)")
    var meshSphere = new THREE.Mesh( geoSphere, matSpere );
    meshSphere.position.set(20,15,20)
    scene.add( meshSphere );


    
    var spotLight = new THREE.SpotLight("rgb(255,0,0)");
    spotLight.position.set( 10, 60, 10 );

    spotLight.castShadow = true;
    
    spotLight.distance = 1000
    spotLight.angle = Math.PI / 10;
    spotLight.power = 3

    
    scene.add( spotLight );
    spotLight.target = meshSphere

    var pointLight = new THREE.PointLight( new THREE.Color("rgb(255,223,0)"), 1, 100 );
    pointLight.position.set( 0, 20, 0 );
    pointLight.power = 3
    pointLight.distance = 500
    scene.add( pointLight );


    

    var animate = function () {
        requestAnimationFrame( animate );
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
               if(randInt(99) > 97){
                let r = randInt(255)
                let g = randInt(255)
                let b = randInt(255)
                matBox[i][j].color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);
                meshBox[i][j] = new THREE.Mesh( geoBox[i][j], matBox[i][j]);
                console.log(`${i} ${j}:${i*3+1.5} ${j*3+1.5}`)
                meshBox[i][j].position.set(i*3+1.5, 2,j*3+ 1.5);
                scene.add( meshBox[i][j] );
               }
            }
        }
        renderer.render( scene, camera );
    };

    animate();
    
}



