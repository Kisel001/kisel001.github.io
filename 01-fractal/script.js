//
// script.js
//
//      Copyright (C) CGSG of PML 30. All rights reserved.
//
// Base script for project.
//

/* Variables for FPS timer */
let oldsec = -1;
let frame = 0;
let xClick = -1000,
  yClick = -1000;

let canvas, gl;

// OpenGL init function
export function initGL() {
  canvas = document.getElementById("myCan");
  gl = canvas.getContext("webgl2");
  gl.clearColor(0.3, 0.47, 0.8, 1);

  // Shader creation
  let vs_txt = `#version 300 es
  #line 27
  precision highp float;
  in vec3 InPosition;
    
  out vec2 DrawPos;
  uniform float Time;
  uniform int XCord, YCord;
  uniform int WFrame, HFram, Zoom;
 
  void main( void )
  {
    gl_Position = vec4(InPosition, 1);
    DrawPos = InPosition.xy;
  }
  `;
  let fs_txt = `#version 300 es
  #line 41
  precision highp float;
  out vec4 OutColor;
  
  in vec2 DrawPos;

  uniform float Time;
  uniform int XCord, YCord;
  uniform int WFrame, HFrame, Zoom, radius;

  uniform int rotateS;
  uniform int IsY;
  uniform float TgS;

  vec2 CmplAddCmpl( vec2 Z1, vec2 Z2 )
  {
    return Z1 + Z2;
  }

  vec2 CmplMinCmpl( vec2 Z1, vec2 Z2 )
  {
    return Z1 - Z2;
  }

  vec2 CmplMulCmpl( vec2 Z1, vec2 Z2 )
  {
    return vec2(Z1.x * Z2.x - Z1.y * Z2.y, Z1.x * Z2.y + Z1.y * Z2.x);
  }

  float CmplNorm2( vec2 Z )
  {
    return Z.x * Z.x + Z.y * Z.y;
  }

  #if 0
  CMPL CmplDev( CMPL Z1, CMPL Z2 )
  {
    CMPL Z = CmplSet(
              (Z1.Re * Z2.Re + Z1.Im * Z2.Im) /
              (Z2.Re * Z2.Re + Z2.Im * Z2.Im),
              (Z2.Re * Z1.Im - Z2.Im * Z1.Re) /
              (Z2.Re * Z2.Re + Z2.Im * Z2.Im));

    return Z;
  }
  #endif

  int MandelBrot( vec2 Z )
  {
    int n = 0;
    vec2 Zn;
    Zn = Z;

    while (n < 255 && length(Zn) < 2.0)
      Zn = CmplAddCmpl(CmplMulCmpl(Zn, Zn), Z), ++n;

    return n;
  }

  int Julia( vec2 Z, vec2 C )
  {
    int n = 0;
    vec2 Zn;
    Zn = Z;

    while (n < 255 && length(Zn) < 2.0)
      Zn = CmplAddCmpl(CmplMulCmpl(Zn, Zn), C), n++;

    return n;
  }
 
  void main( void )
  {
  //#if 0
    //int n = MandelBrot(vec2(DrawPos.x, DrawPos.y));
    vec2 C = vec2(0.35 + 0.008 * sin((Time + 3.0)), 0.39 + 0.008 * sin((1.1 * Time)));
    float NewX = ((DrawPos.x + 1.0) / 2.0) * float(WFrame);
    float NewY = ((DrawPos.y + 1.0) / 2.0) * float(HFrame);
    float getx = DrawPos.x;
    float gety = DrawPos.y;

    if ((NewX - float(XCord)) * (NewX - float(XCord)) + (NewY - float(float(HFrame) - float(YCord))) * (NewY - float(float(HFrame)- float(YCord))) < float(radius * radius))
    {
      NewX = (NewX - float(XCord)) / float(Zoom) + float(XCord);
      NewY = (NewY - float(float(HFrame) - float(YCord))) / float(Zoom) + float(float(HFrame) - float(YCord));
      getx = NewX / (float(WFrame) / 2.0) - 1.0;
      gety = NewY / (float(HFrame) / 2.0) - 1.0;
    }

    int n = Julia(vec2(getx, gety), C);  

    float x = float(n) / 127.5;
    x = x > 1.0 ? 1.0 : x;
    float y = float(n) / 510.0;
    float z = (float(n) * 4.0) / 255.0;
    z = z > 1.0 ? 1.0 : z;

  //#endif
  #if 0
    if (rotateS == 1)
    {
      if (IsYS == 1)
      {
        if (abs(DrawPos.x) <= 0.01 && DrawPos.y >= 0.0)
          OutColor = vec4(1.0, 1.0, 1.0, 1.0);
        else
          OutColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
      else
      {
        if (DrawPos.x >= 0.0 && (abs(DrawPos.x * TgS - DrawPos.y) <= 0.01))
          OutColor = vec4(1.0, 1.0, 1.0, 1.0);
        else
          OutColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
    }
    else
    {
      if (IsYS == 1)
      {
        if (abs(DrawPos.x) <= 0.01 && DrawPos.y <= 0.0)
          OutColor = vec4(1.0, 1.0, 1.0, 1.0);
        else
          OutColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
      else
      {
        if (DrawPos.x <= 0.0 && (abs(DrawPos.x * TgS - DrawPos.y) <= 0.01))
          OutColor = vec4(1.0, 1.0, 1.0, 1.0);
        else
          OutColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
    }

    #endif
    OutColor = vec4(x, y, z, 1.0);
  }
  `;
  let vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log("Shader program link fail: " + buf);
  }

  // Vertex buffer creation
  const size = 1;
  const vertexes = [
    -size,
    size,
    0,
    -size,
    -size,
    0,
    size,
    size,
    0,
    size,
    -size,
    0,
  ];
  const posLoc = gl.getAttribLocation(prg, "InPosition");

  let vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);

  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);

  if (posLoc != -1) {
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
  }

  // Uniform data
  XLoc = gl.getUniformLocation(prg, "XCord");
  YLoc = gl.getUniformLocation(prg, "YCord");
  WLoc = gl.getUniformLocation(prg, "WFrame");
  HLoc = gl.getUniformLocation(prg, "HFrame");
  RLoc = gl.getUniformLocation(prg, "radius");
  ZoomLoc = gl.getUniformLocation(prg, "Zoom");
  timeLoc = gl.getUniformLocation(prg, "Time");

  /* For second line */
  RotateSLoc = gl.getUniformLocation(prg, "rotateS");
  IsYSLoc = gl.getUniformLocation(prg, "IsYS");
  TgSLoc = gl.getUniformLocation(prg, "TgS");

  gl.useProgram(prg);
} // End of 'initGL' function

// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    console.log("Shader compile fail: " + gl.getShaderInfoLog(shader));

  return shader;
} // End of 'loadShader' function

let x = 1;
let timeLoc, XLoc, YLoc, WLoc, HLoc, ZoomLoc, RLoc, RotateSLoc, IsYSLoc, TgSLoc; // location variable
let IsYS = 0.0,
  TgS = 0.0,
  rotateS = 1.0;

// Render function
export function Render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (timeLoc != -1) {
    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    let sec = date.getSeconds();

    /* Get data for second line */
    if (sec == 0) {
      IsYS = 1;
      rotateS = 1;
    } else if (sec > 0 && sec < 30) {
      IsYS = 0;
      TgS = Math.tan(Math.PI / 2.0 - ((6 * sec) / 180) * Math.PI);
      rotateS = 1;
    } else if (sec == 30) {
      IsYS = 1;
      rotateS = 2;
    } else if (sec > 30) {
      IsYS = 0;
      TgS = Math.tan(Math.PI / 2.0 - ((6 * sec) / 180) * Math.PI);
      rotateS = 2;
    }

    if (date.getSeconds() != oldsec) {
      oldsec = date.getSeconds();
      document.title = "CGSG IP5 :: FPS: " + String(frame);
      frame = 0;
    } else ++frame;

    const element = document.getElementById("myCan");
    let WWW = element.width;
    let HHH = element.height;

    gl.uniform1i(WLoc, WWW);
    gl.uniform1i(HLoc, HHH);
    gl.uniform1f(timeLoc, t);
    gl.uniform1i(XLoc, xClick);
    gl.uniform1i(YLoc, yClick);
    gl.uniform1i(ZoomLoc, Zoom);
    gl.uniform1i(RLoc, radius);

    /* Send data for second line to shader */
    gl.uniform1i(RotateSLoc, rotateS);
    gl.uniform1f(TgSLoc, TgS);
    gl.uniform1i(IsYSLoc, IsYS);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} // End of 'Render' function

// Handing of mouse function
export function onClick(event) {
  const element = document.getElementById("myCan");
  xClick = event.clientX - element.clientLeft;
  yClick = event.clientY - element.clientTop;
} // End of 'onClick' function

let Zoom = 2, // zoom coef variable
  radius = 10000; // radius variable

// Handling of keyboard function
export function onKeys(event) {
  if (event.key == "ArrowDown") ++Zoom;
  else if (event.key == "ArrowUp" && Zoom > 1) --Zoom;
  //else if (event.key == "ArrowLeft" && radius > 10) radius -= 10;
  //else if (event.key == "ArrowRight" && radius < 300) radius += 10;
} // End of 'onKeys' function

// END OF 'script.js' FILE
