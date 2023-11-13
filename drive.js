AFRAME.registerComponent('drive', {
    init: function () {
    var gsvalue= this.el.getAttribute("game")
    if (gsvalue == "play" ){
        this.driveCar()
    }

    
},
    isVelocityActive: function () {

    },

    driveCar: function () {
        var multiply = 10
        var wheelRotation = 0

        window.addEventListener("keydown", function (e) {
            var wheel = document.querySelector("#control-wheel")
            if (e.code == "ArrowRight" && wheelRotation > -40) {
                wheelRotation -= 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })
            }

            if (e.code == "ArrowLeft" && wheelRotation < 40) {
                wheelRotation += 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })
            }

            var cameraDir = document.querySelector("#camera-rig")
            var cameraPos = cameraDir.getAttribute("position")
            var cameraRot = cameraDir.getAttribute("rotation")
            var cameramove = cameraDir.getAttribute("movement-controls")
            cameraDir.setAttribute("movement-controls", { "speed": cameramove.speed + 0.005 })


            if (e.code == "ArrowRight") {
                cameraRot.y -= 5
                cameraDir.setAttribute("rotation", { x: 0, y: cameraRot.y, z: 0 })                
                cameraDir.setAttribute("movement-controls", {"speed": cameramove.speed + 0.005})

            }
            if (e.code == "ArrowLeft") {
                cameraRot.y += 5
                cameraDir.setAttribute("rotation", { x: 0, y: cameraRot.y, z: 0 })                
                cameraDir.setAttribute("movement-controls", {"speed": cameramove.speed - 0.005})
            }
            if (e.code == "ArrowUp") {
                multiply +=0.5
                if (multiply <= 100 && cameraPos.z > -500) {                  
                    cameraDir.setAttribute("movement-controls", {"speed": cameramove.speed + 0.005})
                   
                    var accelerateCar = document.querySelector("#control-acce")
                    accelerateCar.setAttribute("material", "color", "green")
                   
                    var carSpeed = document.querySelector("#speed")
                    carSpeed.setAttribute("text", { value: multiply });
                }
            
            }

            if (e.code =="Space"){
                cameraDir.setAttribute("movement-controls", {"speed":0})
                var Carbreak = document.querySelector("#control-break")
                 Carbreak.setAttribute("material","color","red")      
            }
            
        })
      window.addEventListener("keyup",function (e){
        var cameraRig = document.querySelector("#camera-rig")
        var cameraDir = new THREE.Vector3()
        cameraRig.object3D.getWorldDirection(cameraDir)   
        var cameraMoveControl = cameraRig.getAttribute("movement-controls")
        if (e.code == "Space" ){
            var Carbreak = document.querySelector("#control-break")
            Carbreak.setAttribute("material","color","gray")    
        }
        if (e.code == "ArrowUp" ){
            if (multiply > 10) {
                multiply -= 0.5
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
            }
            var CarAcc = document.querySelector("#control-acce")
            CarAcc.setAttribute("material","color","gray")    
        }
        

    })

    }

});