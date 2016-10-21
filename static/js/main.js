const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const ioClient = io();


  ctx.strokeRect(50,50,50,150);

  const localPlayer = new Player(300, 100);
  localPlayer.initControls(2.5);
  let remotePlayer = undefined;

function gameloop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  localPlayer.update();
  localPlayer.render(ctx);
  if (remotePlayer) remotePlayer.render(ctx);
  window.requestAnimationFrame(gameloop);

}
gameloop();
ioClient.on("player_moved", function(msg){
  if(!remotePlayer){
    remotePlayer = new Player(msg.x, msg.y, true);

  }
  remotePlayer.x = msg.x
  remotePlayer.y = msg.y

});
