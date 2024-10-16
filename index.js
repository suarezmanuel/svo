import { get_vertices, get_lines } from "./utils/svo_sampler.js";
import { createProgramFromFiles } from "./utils/shaderLoader.js";

let canvas = document.getElementById('canvas');
let gl = canvas.getContext("webgl2");

render();

async function render() {

    if (!gl) { console.log("webgl2 not supported"); return; } 

    const devicePixelRatio = window.devicePixelRatio || 1;
    
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    var program = await createProgram(gl);
    gl.useProgram(program);

    let vertices = await get_vertices();
    let lines = await get_lines();

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var lineBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, lines, gl.STATIC_DRAW);

    var positionLocation = gl.getAttribLocation(program, "a_position");
    var colorLocation = gl.getUniformLocation(program, "u_color");
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var centerUniformLocation = gl.getUniformLocation(program, "u_center");
    
    gl.uniform2f(centerUniformLocation, canvas.width/2, canvas.height/2);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.enableVertexAttribArray(positionLocation);

    window.requestAnimationFrame(drawScene);


    function drawScene() {

        resizeCanvasToDisplaySize(gl.canvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribIPointer(positionLocation, 2, gl.INT, false, 0, 0);
        gl.uniform4fv(colorLocation, [0.2, 1, 0.2, 1]);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

        gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
        gl.vertexAttribIPointer(positionLocation, 2, gl.INT, false, 0, 0);
        gl.uniform4fv(colorLocation, [0, 0, 1, 1]);
        gl.drawArrays(gl.LINES, 0, lines.length / 2);

        window.requestAnimationFrame(drawScene);
    }

    function resizeCanvasToDisplaySize(canvas) {
        const width = window.innerWidth * devicePixelRatio;
        const height = window.innerHeight * devicePixelRatio;

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';

            gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }

    async function createProgram(gl) {
        return await createProgramFromFiles(gl, "./shaders/vertex-shader.glsl", "./shaders/fragment-shader.glsl");
    }
}
