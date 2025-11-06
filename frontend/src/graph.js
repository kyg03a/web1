const graph = document.getElementById('coordinate-plane');
const ctx = graph.getContext('2d');

graph.width = 480;
graph.height = 480;

function drawAxis() {
    ctx.beginPath();
    ctx.moveTo(0, graph.height / 2);
    ctx.lineTo(graph.width, graph.height / 2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(graph.width / 2, 0);
    ctx.lineTo(graph.width / 2, graph.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawGrid() {
    ctx.beginPath();
    for (let x = 0; x < graph.width+1; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, graph.height);
        ctx.strokeStyle = '#acacac';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    for (let y = 0; y < graph.height+1; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(graph.width, y);
        ctx.strokeStyle = '#acacac';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.fillStyle = '#fef98c';
    ctx.arc(x, y, r, Math.PI, Math.PI * 1.5, false);
    ctx.closePath();
    ctx.fill();
}

function drawRect(x,y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.fillStyle = '#fef98c';
    ctx.rect(x, y, x-60, y-60);
    ctx.closePath();
    ctx.fill();

}

function drawTriangle(x,y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.fillStyle = '#fef98c';
    ctx.lineTo(x + 90, y);
    ctx.lineTo(x, y - 90);
    ctx.closePath();
    ctx.fill();
}

function drawCoords() {
    ctx.fillStyle = 'black';
    ctx.font = '1.5em Montserrat';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    ctx.fillText('R/2', 330, 240);
    ctx.beginPath();
    ctx.moveTo(330, 235);
    ctx.lineTo(330,245);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.fillText('R', 420, 240);
    ctx.beginPath();
    ctx.moveTo(420, 235);
    ctx.lineTo(420, 245);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.textAlign = 'left';

    ctx.fillText('-R/2', 255, 340);
    ctx.beginPath();
    ctx.moveTo(235, 330);
    ctx.lineTo(245, 330);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.fillText('-R', 255, 430);
    ctx.beginPath();
    ctx.moveTo(235, 420);
    ctx.lineTo(245, 420);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.textAlign = 'center';

    ctx.beginPath();
    ctx.fillText('-R/2', 150, 240);
    ctx.moveTo(150, 235);
    ctx.lineTo(150, 245);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillText('-R', 60, 240);
    ctx.moveTo(60, 235);
    ctx.lineTo(60, 245);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.textAlign = 'left';

    ctx.beginPath();
    ctx.fillText('R/2', 250, 160);
    ctx.moveTo(235, 150);
    ctx.lineTo(245, 150);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillText('R', 250, 70);
    ctx.moveTo(235, 60);
    ctx.lineTo(245, 60);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

}
function drawArrows() {
   
    ctx.beginPath();
    ctx.moveTo(graph.width - 10, graph.height / 2 - 5);
    ctx.lineTo(graph.width, graph.height / 2);
    ctx.lineTo(graph.width - 10, graph.height / 2 + 5);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(graph.width / 2 - 5, 10);
    ctx.lineTo(graph.width / 2, 0);
    ctx.lineTo(graph.width / 2 + 5, 10);
    ctx.fillStyle = 'black';
    ctx.fill();


    ctx.fillStyle = 'black';
    ctx.font = '17px Montserrat';

    ctx.fillText('x', graph.width - 15, graph.height / 2 - 10);

    ctx.fillText('y', graph.width / 2 + 10, 15);
}



drawCircle(240, 240, 90);
drawRect(240, 240);
drawTriangle(240, 240);

drawGrid();
drawAxis();
drawCoords();
drawArrows();