#version 300 es

in ivec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_center;

void main() {
    // Convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = (vec2(a_position) + u_center) / u_resolution;

    // Convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // Convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;

    // Flip Y to match WebGL's coordinate system
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
