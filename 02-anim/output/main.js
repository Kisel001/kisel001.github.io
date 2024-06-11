var Proj = (function (exports) {
  'use strict';

  //
  // mth_vec3.js
  //
  //      Copyright (C) CGSG of PML 30. All rights reserved.
  //
  // Vector 3D part of mth library.
  //

  // Vector 3D class
  class _vec3 {
    // Constructor
    constructor(x, y, z) {
      if (x === undefined) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      } else if (typeof x == "object") {
        if (x.x !== undefined) {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z;
        } else if (x.length == 3) {
          this.x = x[0];
          this.y = x[1];
          this.z = x[2];
        } else {
          this.x = 0;
          this.y = 0;
          this.z = 0;
        }
      } else if (y === undefined) {
        this.x = x;
        this.y = x;
        this.z = x;
      } else {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    } // End of constructor

    // Add 2 vectors
    add(v) {
      return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    } // End of 'add' function

    // Get negative vector
    getNeg() {
      return vec3(-this.x, -this.y, -this.z);
    } // End of 'getNeg' function

    // Set negative vector
    setNeg() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
    } // End of 'setNeg' function

    // Min 2 vectors
    sub(v) {
      return this.add(v.getNeg());
    } // End of 'sub' function

    // Dot 2 vectors
    dot(v) {
      if (v === undefined)
        return this.x * this.x + this.y * this.y + this.z * this.z;
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } // End of 'dot' function

    // Cross 2 vectors
    cross(v) {
      return vec3(
        this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x
      );
    } // End of 'cross' function

    // Get len of vector
    len() {
      return Math.sqrt(this.dot());
    } // End of 'len' function
    /*
    // Sub 2 vectors
    sub(v) {
      return vec3(
        this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x
      );
    } // End of 'sub' function
  */
    // Vec mul num
    mul(n) {
      return vec3(this.x * n, this.y * n, this.z * n);
    } // End of 'mul' function

    // Vec div num
    div(n) {
      return vec3(this.x / n, this.y / n, this.z / n);
    } // End of 'div' function

    // Set vec normalize
    setNormal() {
      let l = this.len();
      if (l != 0 && l != 1) {
        this.x /= l;
        this.y /= l;
        this.z /= l;
      }
    } // End of 'setNormal' function

    // Get vec nomrmalize
    getNormal() {
      let l = this.len();
      if (l == 0 || l == 1) return vec3(this);
      return this.div(l);
    } // End of 'getNormal' function

    // Vector 3D mul Matr function
    mulMatr(v, m) {
      let w =
        this.x * m.a[0][3] + this.y * m.a[1][3] + this.z * m.a[2][3] + m.a[3][3];

      return vec3(
        (this.x * m.a[0][0] +
          this.y * m.a[1][0] +
          this.z * m.a[2][0] +
          m.a[3][0]) /
          w,
        (this.x * m.a[0][1] +
          this.y * m.a[1][1] +
          this.z * m.a[2][1] +
          m.a[3][1]) /
          w,
        (this.x * m.a[0][2] +
          this.y * m.a[1][2] +
          this.z * m.a[2][2] +
          m.a[3][2]) /
          w
      );
    } // End of 'mulMatr' function

    // Convert vector to array
    toArray() {
      return new [this.x, this.y, this.z]();
    } // End of 'toArray' function
  } // End of '_vec3' class

  // Create vec3 function.
  function vec3(x, y, z) {
    return new _vec3(x, y, z);
  } // End of 'vec3' function

  // END OF 'mth_vec3.h' FILEs

  //
  // mth_def.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Base definitions for mathematic module.
  //


  // D2R function
  function D2R(a) {
    return new Number((a * Math.PI) / 180);
  } // End of 'D2R' function

  // R2D function
  function R2D(a) {
    return new Number((a * 180) / Math.PI);
  }

  // END OF 'mth_def.js' FILE

  //
  // mth_mat4.js
  //
  //      Copyright (C) CGSG of PML 30. All rights reserved.
  //
  // Matrix 4x4 part of mth library.
  //


  // Matrix 4x4 class
  class _mat4 {
    // Constructor
    constructor(
      a00,
      a01,
      a02,
      a03,
      a10,
      a11,
      a12,
      a13,
      a20,
      a21,
      a22,
      a23,
      a30,
      a31,
      a32,
      a33
    ) {
      if (a00 === undefined)
        this.a = [
          [1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1],
        ];
      else if (typeof a00 == "object" && a00.a.length == 4) this.a = a00.a;
      else
        this.a = [
          [a00, a01, a02, a03],
          [a10, a11, a12, a13],
          [a20, a21, a22, a23],
          [a30, a31, a32, a33],
        ];
    } // End of constructor

    // Matr mul matr function
    mul(m) {
      return mat4(
        this.a[0][0] * m.a[0][0] +
          this.a[0][1] * m.a[1][0] +
          this.a[0][2] * m.a[2][0] +
          this.a[0][3] * m.a[3][0],
        this.a[0][0] * m.a[0][1] +
          this.a[0][1] * m.a[1][1] +
          this.a[0][2] * m.a[2][1] +
          this.a[0][3] * m.a[3][1],
        this.a[0][0] * m.a[0][2] +
          this.a[0][1] * m.a[1][2] +
          this.a[0][2] * m.a[2][2] +
          this.a[0][3] * m.a[3][2],
        this.a[0][0] * m.a[0][3] +
          this.a[0][1] * m.a[1][3] +
          this.a[0][2] * m.a[2][3] +
          this.a[0][3] * m.a[3][3],

        this.a[1][0] * m.a[0][0] +
          this.a[1][1] * m.a[1][0] +
          this.a[1][2] * m.a[2][0] +
          this.a[1][3] * m.a[3][0],
        this.a[1][0] * m.a[0][1] +
          this.a[1][1] * m.a[1][1] +
          this.a[1][2] * m.a[2][1] +
          this.a[1][3] * m.a[3][1],
        this.a[1][0] * m.a[0][2] +
          this.a[1][1] * m.a[1][2] +
          this.a[1][2] * m.a[2][2] +
          this.a[1][3] * m.a[3][2],
        this.a[1][0] * m.a[0][3] +
          this.a[1][1] * m.a[1][3] +
          this.a[1][2] * m.a[2][3] +
          this.a[1][3] * m.a[3][3],

        this.a[2][0] * m.a[0][0] +
          this.a[2][1] * m.a[1][0] +
          this.a[2][2] * m.a[2][0] +
          this.a[2][3] * m.a[3][0],
        this.a[2][0] * m.a[0][1] +
          this.a[2][1] * m.a[1][1] +
          this.a[2][2] * m.a[2][1] +
          this.a[2][3] * m.a[3][1],
        this.a[2][0] * m.a[0][2] +
          this.a[2][1] * m.a[1][2] +
          this.a[2][2] * m.a[2][2] +
          this.a[2][3] * m.a[3][2],
        this.a[2][0] * m.a[0][3] +
          this.a[2][1] * m.a[1][3] +
          this.a[2][2] * m.a[2][3] +
          this.a[2][3] * m.a[3][3],

        this.a[3][0] * m.a[0][0] +
          this.a[3][1] * m.a[1][0] +
          this.a[3][2] * m.a[2][0] +
          this.a[3][3] * m.a[3][0],
        this.a[3][0] * m.a[0][1] +
          this.a[3][1] * m.a[1][1] +
          this.a[3][2] * m.a[2][1] +
          this.a[3][3] * m.a[3][1],
        this.a[3][0] * m.a[0][2] +
          this.a[3][1] * m.a[1][2] +
          this.a[3][2] * m.a[2][2] +
          this.a[3][3] * m.a[3][2],
        this.a[3][0] * m.a[0][3] +
          this.a[3][1] * m.a[1][3] +
          this.a[3][2] * m.a[2][3] +
          this.a[3][3] * m.a[3][3]
      );
    } // End of 'mul' function.

    // Matr translate function
    translate(v) {
      this.a = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.x, v.y, v.z, 1).a;
    } // End of 'translate' function

    // Matr scale function
    scale(v) {
      this.a = mat4(v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1);
    } // End of 'scale' function

    // Matr RotateX functio
    rotateX(a) {
      let an = D2R(a),
        c = cos(an),
        s = sin(an);

      this.a = mat4(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1).a;
    } // End of 'rotateX' function

    // Matr rotateY function
    rotateY(a) {
      let an = D2R(a),
        c = cos(an),
        s = sin(an);

      this.a = mat4(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1).a;
    } // End of 'rotateY' function

    // Matr RotateZ function
    rotateZ(a) {
      let an = D2R(a),
        c = cos(an),
        s = sin(an);

      this.a = mat4(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1).a;
    } // End of 'rotateZ' function

    // Matr rotate function
    rotate(a, r) {
      let A = D2R(a),
        s = Math.sin(A),
        c = Math.cos(A);
      let V = r.getNormal();
      this.a = mat4(
        c + V.x * V.x * (1 - c),
        V.x * V.y * (1 - c) + V.z * s,
        V.x * V.z * (1 - c) - V.y * s,
        0,
        V.y * V.x * (1 - c) - V.z * s,
        c + V.y * V.y * (1 - c),
        V.y * V.z * (1 - c) + V.x * s,
        0,
        V.z * V.x * (1 - c) + V.y * s,
        V.z * V.y * (1 - c) - V.x * s,
        c + V.z * V.z * (1 - c),
        0,
        0,
        0,
        0,
        1
      ).a;
    } // End of 'rotate' function

    // Matr transponse function
    transponse(m) {
      this.a = mat4(
        m.a[0][0],
        m.a[1][0],
        m.a[2][0],
        m.a[3][0],
        m.a[0][1],
        m.a[1][1],
        m.a[2][1],
        m.a[3][1],
        m.a[0][2],
        m.a[1][2],
        m.a[2][2],
        m.a[3][2],
        m.a[0][3],
        m.a[1][3],
        m.a[2][3],
        m.a[3][3]
      ).a;
    } // End of 'transponse' function.

    // Determinate matrix function.
    determ() {
      return (
        this.a[0][0] *
          mat3Determ(
            this.a[1][1],
            this.a[1][2],
            this.a[1][3],
            this.a[2][1],
            this.a[2][2],
            this.a[2][3],
            this.a[3][1],
            this.a[3][2],
            this.a[3][3]
          ) -
        this.a[0][1] *
          mat3Determ(
            this.a[1][0],
            this.a[1][2],
            this.a[1][3],
            this.a[2][0],
            this.a[2][2],
            this.a[2][3],
            this.a[3][0],
            this.a[3][2],
            this.a[3][3]
          ) +
        this.a[0][2] *
          mat3Determ(
            this.a[1][0],
            this.a[1][1],
            this.a[1][3],
            this.a[2][0],
            this.a[2][1],
            this.a[2][3],
            this.a[3][0],
            this.a[3][1],
            this.a[3][3]
          ) -
        this.a[0][3] *
          mat3Determ(
            this.a[1][0],
            this.a[1][1],
            this.a[1][2],
            this.a[2][0],
            this.a[2][1],
            this.a[2][2],
            this.a[3][0],
            this.a[3][1],
            this.a[3][2]
          )
      );
    } // End of 'determ' function

    // Get inverse matrix function
    getInverse() {
      let r = mat4();
      let det = this.determ();

      if (det == 0) return r;

      /* build adjoint matrix */
      r.a[0][0] =
        +mat3Determ(
          this.a[1][1],
          this.a[1][2],
          this.a[1][3],
          this.a[2][1],
          this.a[2][2],
          this.a[2][3],
          this.a[3][1],
          this.a[3][2],
          this.a[3][3]
        ) / det;

      r.a[1][0] =
        -mat3Determ(
          this.a[1][0],
          this.a[1][2],
          this.a[1][3],
          this.a[2][0],
          this.a[2][2],
          this.a[2][3],
          this.a[3][0],
          this.a[3][2],
          this.a[3][3]
        ) / det;

      r.a[2][0] =
        +mat3Determ(
          this.a[1][0],
          this.a[1][1],
          this.a[1][3],
          this.a[2][0],
          this.a[2][1],
          this.a[2][3],
          this.a[3][0],
          this.a[3][1],
          this.a[3][3]
        ) / det;

      r.a[3][0] =
        -mat3Determ(
          this.a[1][0],
          this.a[1][1],
          this.a[1][2],
          this.a[2][0],
          this.a[2][1],
          this.a[2][2],
          this.a[3][0],
          this.a[3][1],
          this.a[3][2]
        ) / det;

      r.a[0][1] =
        -mat3Determ(
          this.a[0][1],
          this.a[0][2],
          this.a[0][3],
          this.a[2][1],
          this.a[2][2],
          this.a[2][3],
          this.a[3][1],
          this.a[3][2],
          this.a[3][3]
        ) / det;

      r.a[1][1] =
        +mat3Determ(
          this.a[0][0],
          this.a[0][2],
          this.a[0][3],
          this.a[2][0],
          this.a[2][2],
          this.a[2][3],
          this.a[3][0],
          this.a[3][2],
          this.a[3][3]
        ) / det;

      r.a[2][1] =
        -mat3Determ(
          this.a[0][0],
          this.a[0][1],
          this.a[0][3],
          this.a[2][0],
          this.a[2][1],
          this.a[2][3],
          this.a[3][0],
          this.a[3][1],
          this.a[3][3]
        ) / det;

      r.a[3][1] =
        +mat3Determ(
          this.a[0][0],
          this.a[0][1],
          this.a[0][2],
          this.a[2][0],
          this.a[2][1],
          this.a[2][2],
          this.a[3][0],
          this.a[3][1],
          this.a[3][2]
        ) / det;

      r.a[0][2] =
        +mat3Determ(
          this.a[0][1],
          this.a[0][2],
          this.a[0][3],
          this.a[1][1],
          this.a[1][2],
          this.a[1][3],
          this.a[3][1],
          this.a[3][2],
          this.a[3][3]
        ) / det;

      r.a[1][2] =
        -mat3Determ(
          this.a[0][0],
          this.a[0][2],
          this.a[0][3],
          this.a[1][0],
          this.a[1][2],
          this.a[1][3],
          this.a[3][0],
          this.a[3][2],
          this.a[3][3]
        ) / det;

      r.a[2][2] =
        +mat3Determ(
          this.a[0][0],
          this.a[0][1],
          this.a[0][3],
          this.a[1][0],
          this.a[1][1],
          this.a[1][3],
          this.a[3][0],
          this.a[3][1],
          this.a[3][3]
        ) / det;

      r.a[3][2] =
        -mat3Determ(
          this.a[0][0],
          this.a[0][1],
          this.a[0][2],
          this.a[1][0],
          this.a[1][1],
          this.a[1][2],
          this.a[3][0],
          this.a[3][1],
          this.a[3][2]
        ) / det;

      r.a[0][3] =
        -mat3Determ(
          this.a[0][1],
          this.a[0][2],
          this.a[0][3],
          this.a[1][1],
          this.a[1][2],
          this.a[1][3],
          this.a[2][1],
          this.a[2][2],
          this.a[2][3]
        ) / det;

      r.a[1][3] =
        +mat3Determ(
          this.a[0][0],
          this.a[0][2],
          this.a[0][3],
          this.a[1][0],
          this.a[1][2],
          this.a[1][3],
          this.a[2][0],
          this.a[2][2],
          this.a[2][3]
        ) / det;

      r.a[2][3] =
        -mat3Determ(
          this.a[0][0],
          this.a[0][1],
          this.a[0][3],
          this.a[1][0],
          this.a[1][1],
          this.a[1][3],
          this.a[2][0],
          this.a[2][1],
          this.a[2][3]
        ) / det;

      r.a[3][3] =
        +mat3Determ(
          this.a[0][0],
          this.a[0][1],
          this.a[0][2],
          this.a[1][0],
          this.a[1][1],
          this.a[1][2],
          this.a[2][0],
          this.a[2][1],
          this.a[2][2]
        ) / det;

      return r;
    } // End of 'getInverse' function.

    // frustum matrix function
    frustum(L, R, B, T, N, F) {
      this.a = mat4(
        (2 * N) / (R - L),
        0,
        0,
        0,
        0,
        (2 * N) / (T - B),
        0,
        0,
        (R + L) / (R - L),
        (T + B) / (T - B),
        -(F + N) / (F - N),
        -1,
        0,
        0,
        (-2 * N * F) / (F - N),
        0
      ).a;
    } // End of 'frustum' function

    // ortho matrix function
    ortho(L, R, B, T, N, F) {
      this.a = mat4(
        2 / (R - L),
        0,
        0,
        0,
        0,
        2 / (T - B),
        0,
        0,
        0,
        0,
        -2 / (F - N),
        0,
        -(R + L) / (R - L),
        -(T + B) / (T - B),
        -(F + N) / (F - N),
        1
      );
    } // End of 'ortho' function

    // Set view matrix function
    view(Loc, At, Up1) {
      const Dir = vec3(At).sub(Loc).getNormal();
      const Right = vec3(Dir).cross(Up1).getNormal();
      const Up = vec3(Right).cross(Dir).getNormal();

      this.a = mat4(
        Right.x,
        Up.x,
        -Dir.x,
        0,
        Right.y,
        Up.y,
        -Dir.y,
        0,
        Right.z,
        Up.z,
        -Dir.z,
        0,
        -Loc.dot(Right),
        -Loc.dot(Up),
        Loc.dot(Dir),
        1
      ).a;
    } // End of 'view' function

    toArray() {
      return [
        this.a[0][0],
        this.a[0][1],
        this.a[0][2],
        this.a[0][3],
        this.a[1][0],
        this.a[2][1],
        this.a[1][2],
        this.a[1][3],
        this.a[2][0],
        this.a[2][1],
        this.a[2][2],
        this.a[2][3],
        this.a[3][0],
        this.a[3][1],
        this.a[3][2],
        this.a[3][3],
      ];
    }
  }

  // Get matrix function.
  function mat4(
    a00,
    a01,
    a02,
    a03,
    a10,
    a11,
    a12,
    a13,
    a20,
    a21,
    a22,
    a23,
    a30,
    a31,
    a32,
    a33
  ) {
    return new _mat4(
      a00,
      a01,
      a02,
      a03,
      a10,
      a11,
      a12,
      a13,
      a20,
      a21,
      a22,
      a23,
      a30,
      a31,
      a32,
      a33
    );
  } // End of 'mat4' function.

  // mat3 determination function
  function mat3Determ(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
    return new Number(
      a11 * a22 * a33 +
        a12 * a23 * a31 +
        a13 * a21 * a32 -
        a11 * a23 * a32 -
        a12 * a21 * a33 -
        a13 * a22 * a31
    );
  } // End of 'mat3Determ' function

  // END OF 'mth_mat4.js' FILEs

  //
  // mth.js
  //
  //      Copyright (C) CGSG of PML 30. All rights reserved.
  //
  // Main file of mth library.
  //


  // END OF 'mth.js' FILE

  var mth = /*#__PURE__*/Object.freeze({
    __proto__: null,
    D2R: D2R,
    R2D: R2D,
    _mat4: _mat4,
    _vec3: _vec3,
    mat3Determ: mat3Determ,
    mat4: mat4,
    vec3: vec3
  });

  //
  // prim.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Primitive module.
  //


  // Vertex class
  class _Vertex {
    // Constructor
    constructor(p, n) {
      this.v = [p.x, p.y, p.z, n.x, n.y, n.z];
    } // End of constructor
  } // End of '_Vertex' class

  // Get vertex function
  function Vertex(p, n) {
    return new _Vertex(p, n);
  } // End of 'Vertex' function

  // Primitive class
  class Prim {
    // Constructor
    constructor(gl, type, vertices, indices, prg) {
      this.type = type;
      this.VA = gl.createVertexArray();

      //if (vertices != null && indices != null)
      //  this.autoNormals(vertices, indices, vertices.length, indices.length);

      if (vertices != null && vertices.length != 0) {
        gl.bindVertexArray(this.VA);
        this.VBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBuf);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(vertices),
          gl.STATIC_DRAW
        );
        const posLoc = gl.getAttribLocation(prg, "InPosition");
        const norLoc = gl.getAttribLocation(prg, "InNormal");

        if (posLoc != -1) {
          gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);
          gl.enableVertexAttribArray(posLoc);
        }
        if (norLoc != -1) {
          gl.vertexAttribPointer(norLoc, 3, gl.FLOAT, false, 24, 12);
          gl.enableVertexAttribArray(norLoc);
        }
        this.noofV = vertices.length / 6;
      } else {
        this.noofV = 0;
        this.VBuf = 0;
      }

      /* Set index data */
      if (indices != null && indices.length != 0) {
        this.IBuf = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBuf);
        gl.bufferData(
          gl.ELEMENT_ARRAY_BUFFER,
          new Uint32Array(indices),
          gl.STATIC_DRAW
        );
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this.noofI = indices.length;
        this.NumOfElements = this.noofI;
      } else {
        this.noofI = 0;
        this.IBuf = 0;
        this.NumOfElements = this.noofV;
      }
      /* GetMinMaxBB */
      //IP5_RndPrimEvalBB(&Pr->MinBB, &Pr->MaxBB, V, NoofV);

      this.MtlNo = 0;
    } // End of contstructor

    // Prim draw function
    primDraw(rnd, matr, shd) {
      let gl = rnd.gl;
      const progId = shd.prg;
      const glPrimType = this.type == "Trimesh" ? gl.TRIANGLES : gl.POINTS;
      const w = mat4(matr),
        wnormal = w.getInverse(),
        wvp = w.mul(rnd.matrVP);

      wnormal.transponse(matr.getInverse());

      // send data to shader
      gl.useProgram(progId);

      gl.uniformMatrix4fv(
        shd.MatrWVPLoc,
        false,
        new Float32Array([].concat(...wvp.a))
      ); // wvp.toArray()));
      gl.uniformMatrix4fv(
        shd.MatrWInvLoc,
        false,
        new Float32Array([].concat(...wnormal.a))
      );
      gl.uniformMatrix4fv(
        shd.MatrWLoc,
        false,
        new Float32Array([].concat(...w.a))
      );

      // render
      gl.bindVertexArray(this.VA);

      if (this.IBuf == 0) {
        gl.drawArrays(glPrimType, 0, this.NumOfElements);
      } else {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBuf);
        gl.drawElements(glPrimType, this.NumOfElements, gl.UNSIGNED_INT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      }

      gl.bindVertexArray(null);
      gl.useProgram(null);
    } //S End of 'rimDraw' function

    // Evalutation bound box function
    evalBB() {
      return 0;
    } // End of 'evalBB' function

    // Evalutation normals by position vectors function.
    autoNormals(V, I, noofV, noofI) {
      let i;

      /* Set all vertex normals to zero */
      for (i = 0; i < noofV; ++i) {
        V[6 * i + 3] = 0;
        V[6 * i + 4] = 0;
        V[6 * i + 5] = 0;
      }

      /* Eval normal for every facet */
      for (i = 0; i < noofI; i += 3) {
        const n0 = I[i],
          n1 = I[i + 1],
          n2 = I[i + 2];
        const p0 = vec3(V[6 * n0], V[6 * n0 + 1], V[6 * n0 + 2]),
          p1 = vec3(V[6 * n1], V[6 * n1 + 1], V[6 * n1 + 2]),
          p2 = vec3(V[6 * n2], V[6 * n2 + 1], V[6 * n2 + 2]),
          N = p1.sub(p0).cross(p2.sub(p0)).getNormal();

        const nn0 = N, //.add(
          //   ipgl.mth.vec3(V[6 * n0 + 3], V[6 * n0 + 4], V[6 * n0 + 5])
          // ),
          nn1 = N, //.add(ipgl.mth.vec3(V[6 * n1 + 3], V[6 * n1 + 4], V[6 * n2 + 5])),
          nn2 = N; //.add(ipgl.mth.vec3(V[6 * n2 + 3], V[6 * n2 + 4], V[6 * n2 + 5]));

        // n0
        V[6 * n0 + 3] = nn0.x;
        V[6 * n0 + 4] = nn0.y;
        V[6 * n0 + 5] = nn0.z;

        // n1
        V[6 * n1 + 3] = nn1.x;
        V[6 * n1 + 4] = nn1.y;
        V[6 * n1 + 5] = nn1.z;

        // n2
        V[6 * n2 + 3] = nn2.x;
        V[6 * n2 + 4] = nn2.y;
        V[6 * n2 + 5] = nn2.z;
      }

      /* Normalize all vertex normals */
      for (i = 0; i < noofV; i++) {
        let N = vec3(V[6 * i + 3], V[6 * i + 4], V[6 * i + 5])
          .getNormal();

        V[6 * i + 3] = N.x;
        V[6 * i + 4] = N.y;
        V[6 * i + 5] = N.z;
      }
    } // End of 'autoNormals' function
  }

  // END OF 'prim.js' FILE

  var prim$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Prim: Prim,
    Vertex: Vertex,
    _Vertex: _Vertex
  });

  //
  // shd.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Shader module.
  //

  // Text for default vertex shader
  const defvstxt = `#version 300 es
precision highp float;
#line 12

/*layout(location = 0)*/ in vec3 InPosition;
/*layout(location = 1)*/ in vec3 InNormal;

out vec4 DrawColor;   
out vec3 DrawNormal;
out vec3 DrawPosition; 

uniform mat4 MatrWVP;
uniform mat4 MatrWInv;
uniform mat4 MatrW;

void main( void )
{
  gl_Position = (MatrWVP * vec4(InPosition, 1.0)); 
                     
                     //gl_Position = //mat4(1.414, -0.816, -0.577, -0.577,
                //       0.0,  1.632, -0.577, -0.577,
                //    -1.414, -0.816, -0.577, -0.577,
                //      0.0,     0.0,   -8.8,   -8.6) * vec4(InPosition, 1.0);
  DrawColor = vec4(1.0, 1.0, 0.0, 1.0);
  DrawNormal = mat3(MatrWInv) * InNormal;
  DrawPosition = vec3(MatrW * vec4(InPosition, 1.0));
}
`;

  // Text for default fragment shader
  const deffstxt = `#version 300 es
precision highp float;
#line 42

in vec4 DrawColor;   
in vec3 DrawNormal;
in vec3 DrawPosition; 

out vec4 OutColor;

#if 0
void main( void )
{
  vec3 L = normalize(vec3(-1, -1, -1));
  vec3 N = normalize(DrawNormal);

  N = faceforward(N, L, N);

  float k = dot(L, normalize(N));

  vec3 color = k * vec3(0, 0.7f, 0.6f);
  //vec3 R, V = vec3(0, 0, -1);

  //R = reflect(V, N);
  //color += vec3(0.2f) * max(0.01f, pow(dot(R, L), 10.0f));

  //OutColor = vec4(color, 1.0f);
  OutColor = vec4(N, 1.0);
}
#endif
void main( void )
{
  vec3 L = vec3(2, 1, 3);
  vec3 N = normalize(faceforward(DrawNormal, -L, DrawNormal));

  float k = dot(N, normalize(L));
  vec3 color = vec3(1.0, 0.829, 0.829) * 0.2;
  color += vec3(1.0, 0.829, 0.829) * k * 0.8;
  OutColor = vec4(color, 1.0);
}
`;

  // Load and compile shader function
  function loadShader(gl, shaderType, shaderSource) {
    const shader = gl.createShader(shaderType);

    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      console.log("Shader compile fail: " + gl.getShaderInfoLog(shader));

    return shader;
  } // End of 'loadShader' function

  // Shader class
  class _shader {
    constructor(gl) {
      this.vs = loadShader(gl, gl.VERTEX_SHADER, defvstxt);
      this.fs = loadShader(gl, gl.FRAGMENT_SHADER, deffstxt);
      this.prg = gl.createProgram();

      gl.attachShader(this.prg, this.vs);
      gl.attachShader(this.prg, this.fs);
      gl.linkProgram(this.prg);

      if (!gl.getProgramParameter(this.prg, gl.LINK_STATUS)) {
        let buf = gl.getProgramInfoLog(this.prg);
        console.log("Shader program link fail: " + buf);
      }

      this.MatrWVPLoc = gl.getUniformLocation(this.prg, "MatrWVP");
      this.MatrWLoc = gl.getUniformLocation(this.prg, "MatrW");
      this.MatrWInvLoc = gl.getUniformLocation(this.prg, "MatrWInv");
    } // End of constructor
  } // End of 'Shader' class

  // Get shader function
  function shader(gl) {
    return new _shader(gl);
  } // End of 'shader' function

  /* old render
  class _shader {
    constructor(gl, name) {
      this._init(name);
    }

    async _init(gl, name) {
      this.name = name;
      this.shaders = [
        {
          id: null,
          type: gl.FRAGMENT_SHADER,
        },
        {},
      ];

      for (const s of this.shaders) {
        let response = await fetch("bin/shaders/${name}/${s.name}.glsl");
        let src = await response.text();
        if (typeof src == "string" && src != "") s.src = src;
      }
      // recompile shaders
    }
  } */

  // END OF 'shd.js' FILE

  var shd = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _shader: _shader,
    shader: shader
  });

  //
  // res.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Resource module.
  //


  // END OF 'res.js' FILE

  var res = /*#__PURE__*/Object.freeze({
    __proto__: null,
    prim: prim$1,
    shd: shd
  });

  //
  // rnd.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Render module.
  //


  // Project parameters
  let projSize = 0.1;
  let projDist = 0.1;
  let projFarClip = 300;

  // Render class
  class Render {
    // Constructor
    constructor(canvasid) {
      this.handle = document.getElementById(canvasid);
      this.gl = this.handle.getContext("webgl2");
      if (this.gl === undefined) {
        alert(
          "Error GL0047!\nWebGL 2.0 not supported by your browser!\nFor more information, visit https://school30.spb.ru/cgsg/"
        );
      }
      this.gl.clearColor(0.3, 0.47, 0.8, 1);
      this.w = this.handle.width;
      this.h = this.handle.height;

      this.matrVP = mat4();
      this.matrProj = mat4();
      this.matrView = mat4();

      // Create default shader
      this.shader = shader(this.gl);
      this.shdprg = this.shader.prg;

      this.projSet();
      this.camSet(
        vec3(5, 5, 5),
        vec3(0, 0, 0),
        vec3(0, 1, 0)
      );
    } // End of constructor

    // Render start function
    start() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    } // End of 'start' function

    // Render end function
    end() {
      return;
    } // End of 'end' function

    // Set camera function
    camSet(Loc, At, Up) {
      this.matrView = mat4();
      this.matrView.view(Loc, At, Up);
      this.matrVP = this.matrView.mul(this.matrProj);
      //this.matrVP = this.matrProj.mul(this.matrView);

      this.camRight = vec3(
        this.matrView.a[0][0],
        this.matrView.a[1][0],
        this.matrView.a[2][0]
      );
      this.camUp = vec3(
        this.matrView.a[0][1],
        this.matrView.a[1][1],
        this.matrView.a[2][1]
      );
      this.camDir = vec3(
        -this.matrView.a[0][2],
        -this.matrView.a[1][2],
        -this.matrView.a[2][2]
      );
      this.camLoc = Loc;
      this.camAt = At;

      return;
    } // End of 'camSet' function

    // Set project matrix function
    projSet() {
      let rx, ry;

      rx = projSize;
      ry = projSize;

      if (this.w >= this.h) {
        rx *= this.w / this.h;
      } else {
        ry *= this.h / this.w;
      }

      this.matrProj = mat4();
      this.matrProj.frustum(
        -rx / 2,
        rx / 2,
        -ry / 2,
        ry / 2,
        projDist,
        projFarClip
      );
      this.matrVP = this.matrView.mul(this.matrProj);
    } // End of 'projSet' function
  } // End of 'Render' class

  // END OF 'rnd.js' FILE

  var rnd = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Render: Render,
    projDist: projDist,
    projFarClip: projFarClip,
    projSize: projSize,
    res: res
  });

  //
  // timer.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Timer module.
  //

  // Timer class
  class Timer {
    constructor() {
      // Timer obtain current time in seconds method
      const getTime = () => {
        const date = new Date();
        let t =
          date.getMilliseconds() / 1000.0 +
          date.getSeconds() +
          date.getMinutes() * 60;
        return t;
      };

      // Timer response method
      this.response = (tag_id = null) => {
        let t = getTime();
        // Global time
        this.globalTime = t;
        this.globalDeltaTime = t - this.oldTime;
        // Time with pause
        if (this.isPause) {
          this.localDeltaTime = 0;
          this.pauseTime += t - this.oldTime;
        } else {
          this.localDeltaTime = this.globalDeltaTime;
          this.localTime = t - this.pauseTime - this.startTime;
        }
        // FPS
        this.frameCounter++;
        if (t - this.oldTimeFPS > 3) {
          this.FPS = this.frameCounter / (t - this.oldTimeFPS);
          this.oldTimeFPS = t;
          this.frameCounter = 0;
          if (tag_id != null)
            document.getElementById(tag_id).innerHTML = this.getFPS();
        }
        this.oldTime = t;
      };

      // Obtain FPS as string method
      this.getFPS = () => this.FPS.toFixed(3);

      // Fill timer global data
      this.globalTime = this.localTime = getTime();
      this.globalDeltaTime = this.localDeltaTime = 0;

      // Fill timer semi global data
      this.startTime = this.oldTime = this.oldTimeFPS = this.globalTime;
      this.frameCounter = 0;
      this.isPause = false;
      this.FPS = 30.0;
      this.pauseTime = 0;

      return this;
    }
  } // End of 'Timer' function

  // END OF 'timer.js' FILE

  //
  // plat.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Platon module.
  //

  // Get icosaedr V array
  function getIcoV() {
    return [
      1.0, -0.5, 0.0, 0.794654, -0.187592, 0.57735, 0.809017, 0.5, 0.587785,
      0.794654, -0.187592, 0.57735, 0.309017, -0.5, 0.951057, 0.794654, -0.187592,
      0.57735, -0.309017, 0.5, 0.951057, 0.794654, -0.187592, -0.57735, -0.809017,
      -0.5, 0.587785, 0.794654, -0.187592, -0.57735, -1.0, 0.5, 0.0, 0.794654,
      -0.187592, -0.57735, -0.809017, -0.5, -0.587785, -0.303531, -0.187592,
      -0.934172, -0.309017, 0.5, -0.951057, -0.303531, -0.187592, -0.934172,
      0.309017, -0.5, -0.951057, -0.303531, -0.187592, -0.934172, 0.809017, 0.5,
      -0.587785, -0.982247, -0.187592, 0.0, 1.0, -0.5, 0.0, -0.982247, -0.187592,
      0.0, 0.809017, 0.5, 0.587785, -0.982247, -0.187592, 0.0, 0.309017, -0.5,
      0.951057, -0.303531, -0.187592, 0.934172, -0.309017, 0.5, 0.951057,
      -0.303531, -0.187592, 0.934172, -0.809017, -0.5, 0.587785, -0.303531,
      -0.187592, 0.934172, -1.0, 0.5, 0.0, 0.794654, -0.187592, 0.57735,
      -0.809017, -0.5, -0.587785, 0.794654, -0.187592, 0.57735, -0.309017, 0.5,
      -0.951057, 0.794654, -0.187592, 0.57735, 0.309017, -0.5, -0.951057,
      0.794654, -0.187592, -0.57735, 0.809017, 0.5, -0.587785, 0.794654,
      -0.187592, -0.57735, 1.0, -0.5, 0.0, 0.794654, -0.187592, -0.57735,
      0.809017, 0.5, 0.587785, -0.303531, -0.187592, -0.934172, 0.309017, -0.5,
      0.951057, -0.303531, -0.187592, -0.934172, -0.309017, 0.5, 0.951057,
      -0.303531, -0.187592, -0.934172, -0.809017, -0.5, 0.587785, -0.982247,
      -0.187592, -0.0, -1.0, 0.5, 0.0, -0.982247, -0.187592, -0.0, -0.809017,
      -0.5, -0.587785, -0.982247, -0.187592, -0.0, -0.309017, 0.5, -0.951057,
      -0.303531, -0.187592, 0.934172, 0.309017, -0.5, -0.951057, -0.303531,
      -0.187592, 0.934172, 0.809017, 0.5, -0.587785, -0.303531, -0.187592,
      0.934172, 1.0, -0.5, 0.0, 0.491123, -0.794654, 0.356822, 0.809017, 0.5,
      0.587785, -0.187592, -0.794654, -0.57735, 0.309017, -0.5, 0.951057,
      0.491123, -0.794654, 0.356822, -0.309017, 0.5, 0.951057, -0.187592,
      -0.794654, -0.57735, -0.809017, -0.5, 0.587785, -0.607062, -0.794654, -0.0,
      -1.0, 0.5, 0.0, 0.491123, -0.794654, 0.356822, -0.809017, -0.5, -0.587785,
      -0.607062, -0.794654, -0.0, -0.309017, 0.5, -0.951057, 0.491123, -0.794654,
      0.356822, 0.309017, -0.5, -0.951057, 0.491123, -0.794654, -0.356822,
      0.809017, 0.5, -0.587785, -0.607062, -0.794654, 0.0, 1.0, -0.5, 0.0,
      0.491123, -0.794654, -0.356822, 0.809017, 0.5, 0.587785, -0.607062,
      -0.794654, 0.0, 0.309017, -0.5, 0.951057, -0.187592, -0.794654, 0.57735,
      -0.309017, 0.5, 0.951057, 0.491123, -0.794654, -0.356822, -0.809017, -0.5,
      0.587785, -0.187592, -0.794654, 0.57735, -1.0, 0.5, 0.0, 0.491123,
      -0.794654, -0.356822, -0.809017, -0.5, -0.587785, -0.187592, -0.794654,
      -0.57735, -0.309017, 0.5, -0.951057, -0.187592, -0.794654, 0.57735,
      0.309017, -0.5, -0.951057, -0.187592, -0.794654, -0.57735, 0.809017, 0.5,
      -0.587785, -0.187592, -0.794654, 0.57735, 0.0, 1.118034, 0.0, -0.187592,
      -0.794654, -0.57735, 0.0, 1.118034, 0.0, 0.491123, -0.794654, 0.356822, 0.0,
      1.118034, 0.0, -0.607062, -0.794654, 0.0, 0.0, 1.118034, 0.0, 0.491123,
      -0.794654, -0.356822, 0.0, 1.118034, 0.0, -0.187592, -0.794654, 0.57735,
      0.0, -1.118034, 0.0, 0.491123, -0.794654, 0.356822, 0.0, -1.118034, 0.0,
      -0.607062, -0.794654, -0.0, 0.0, -1.118034, 0.0, 0.491123, -0.794654,
      -0.356822, 0.0, -1.118034, 0.0, -0.187592, -0.794654, 0.57735, 0.0,
      -1.118034, 0.0, -0.187592, -0.794654, -0.57735,
    ];
  }

  // Get icosaedr I
  function getIcoI() {
    return [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 55, 34, 36, 56, 38, 40, 57, 42,
      44, 58, 46, 48, 59, 31, 33, 50, 35, 37, 51, 39, 41, 52, 43, 45, 53, 47, 49,
      54,
    ];
  }

  // Get dodecaedr V
  function getDecV() {
    const V = new getIcoV();
    const I = new getIcoI();

    let V1 = [];

    for (let i = 0; i < 60; i += 3) {
      const S1 = V[6 * I[i]];
      const S2 = V[6 * I[i] + 1];
      const S3 = V[6 * I[i] + 2];
      const S4 = V[6 * I[i + 1]];
      const S5 = V[6 * I[i + 1] + 1];
      const S6 = V[6 * I[i + 1] + 2];
      const S7 = V[6 * I[i + 2]];
      const S8 = V[6 * I[i + 2] + 1];
      const S9 = V[6 * I[i + 2] + 2];

      const S10 = (S1 + S4 + S7) / 3;
      const S11 = (S2 + S5 + S8) / 3;
      const S12 = (S3 + S6 + S9) / 3;

      V1.push(S10);
      V1.push(S11);
      V1.push(S12);
      V1.push(0);
      V1.push(0);
      V1.push(0);

      V1.push(S10);
      V1.push(S11);
      V1.push(S12);
      V1.push(0);
      V1.push(0);
      V1.push(0);

      V1.push(S10);
      V1.push(S11);
      V1.push(S12);
      V1.push(0);
      V1.push(0);
      V1.push(0);
    }

    return V1;
  }

  function getDecoI() {
    let S = [];
    let A, B, C, D, E;
    let I1N = [
      1, 18, 15, 7, 4, 13, 4, 7, 0, 10, 3, 0, 10, 12, 6, 12, 6, 9, 2, 14, 11, 14,
      2, 5, 8, 8, 1, 4, 13, 11, 11, 14, 12, 10, 13, 0, 7, 15, 17, 3, 6, 3, 17, 19,
      9, 2, 9, 19, 16, 5, 1, 8, 5, 16, 18, 18, 16, 19, 17, 15,
    ];

    let NewI = [];

    for (let i = 0; i < 108; i++) S[i] = 0;

    for (let i = 0; i < 70; i += 5) {
      let S1 = I1N[i],
        S2 = I1N[i + 1],
        S3 = I1N[i + 2],
        S4 = I1N[i + 3],
        S5 = I1N[i + 4];

      A = S[S1]++;
      B = S[S2]++;
      C = S[S3]++;
      D = S[S4]++;
      E = S[S5]++;

      S1 *= 3;
      S2 *= 3;
      S3 *= 3;
      S4 *= 3;
      S5 *= 3;

      if (A == 0);
      else if (A == 1) ++S1;
      else if (A == 2) S1 += 2;

      if (B == 0);
      else if (B == 1) ++S2;
      else if (B == 2) S2 += 2;

      if (C == 0);
      else if (C == 1) ++S3;
      else if (C == 2) S3 += 2;

      if (D == 0);
      else if (D == 1) ++S4;
      else if (D == 2) S4 += 2;

      if (E == 0);
      else if (E == 1) ++S5;
      else if (E == 2) S5 += 2;

      NewI.push(S1);
      NewI.push(S2);
      NewI.push(S3);
      NewI.push(S1);
      NewI.push(S3);
      NewI.push(S4);
      NewI.push(S1);
      NewI.push(S4);
      NewI.push(S5);
    }

    //for (let Elem of I) {
    //  let S1 = Elem * 3;

    //   A = S[Elem]++;

    //   if (A == 0);
    //   else if (A == 1) ++S1;
    //   else if (A == 2) S1 += 2;
    //
    //  NewI.push(S1);
    //}

    return NewI;
  }

  function getTetraV() {
    return [
      -1, -1, -1, 0, 0, 0, -1, -1, -1, 0, 0, 0, -1, -1, -1, 0, 0, 0, -1, 1, 1, 0,
      0, 0, -1, 1, 1, 0, 0, 0, -1, 1, 1, 0, 0, 0, 1, 1, -1, 0, 0, 0, 1, 1, -1, 0,
      0, 0, 1, 1, -1, 0, 0, 0, 1, -1, 1, 0, 0, 0, 1, -1, 1, 0, 0, 0, 1, -1, 1, 0,
      0, 0,
    ];
  }

  function getTetraI() {
    return [0, 3, 9, 1, 4, 6, 5, 7, 10, 2, 11, 8];
  }

  function getOctaV() {
    return [
      0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0,

      0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0,

      0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,

      0, -1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0,

      0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0,

      0, 1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0,

      0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,

      0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0,
    ];
  }

  function getOctaI() {
    return [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
  }

  // End of 'plat.js' FILE

  var plat = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getDecV: getDecV,
    getDecoI: getDecoI,
    getIcoI: getIcoI,
    getIcoV: getIcoV,
    getOctaI: getOctaI,
    getOctaV: getOctaV,
    getTetraI: getTetraI,
    getTetraV: getTetraV
  });

  //
  // anim.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Anim module.
  //


  // Default anim variable
  let MainAnim;

  // Anim class
  class Anim {
    constructor(canvasid) {
      this.rnd = new Render(canvasid);
      //this.rnd.gl.disable(this.rnd.gl.BLEND);
      this.rnd.gl.enable(this.rnd.gl.DEPTH_TEST);
      this.timer = new Timer();
      //this.rnd.gl.pointSize(5);
    } // End of constructor

    // Anim render function.
    render() {
      this.rnd.start();
      this.rnd.end();
      this.timer.response();
    } // End of 'render' function
  } // End of 'Anim' class

  let prim, prim1, prim2, prim3, prim4;

  // Init default anim
  function AnimInit() {
    //let V = [
    //  -1, -1, -1, 1, 5, 1, -1, 0, 1, 0, 0, 0, 1, -1, 1, 0, 0, 0, 1, -1, -1, 0, 0,
    //  0, -1, 1, -1, 0, 0, 0, -1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, -1, 0, 0,
    //   0,
    //];
    //];

    let V = [
      -1.0, -1.0, -1.0, 0.0, -1.0, 0.0, -1.0, -1.0, 1.0, 0.0, 1.0, 0.0, 1.0, -1.0,
      1.0, 0.0, -1.0, 0.0, 1.0, -1.0, -1.0, 0.0, -1.0, 0.0, -1.0, -1.0, -1.0,
      -1.0, 0.0, 0.0, -1.0, 1.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 1.0, -1.0, 0.0,
      0.0, -1.0, -1.0, 1.0, -1.0, 0.0, 0.0, -1.0, -1.0, -1.0, 0.0, 0.0, 1.0, -1.0,
      1.0, -1.0, 0.0, 0.0, -1.0, 1.0, 1.0, -1.0, 0.0, 0.0, 1.0, 1.0, -1.0, -1.0,
      0.0, 0.0, 1.0, -1.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, -1.0, 1.0, 0.0, 0.0,
      1.0, 1.0, 1.0, 1.0, 0.0, 0.0, -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, -1.0, 1.0,
      -1.0, -1.0, 1.0, 0.0, 0.0, 1.0, -1.0, 1.0, -1.0, 0.0, 0.0, 1.0, 1.0, 1.0,
      1.0, 0.0, 0.0, 1.0, 1.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, -1.0, 0.0, -1.0,
      0.0, -1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, -1.0, 0.0, 1.0, 1.0,
      -1.0, 0.0, -1.0, 0.0,
    ];

    let I = [
      0, 1, 2, 0, 3, 2, 4, 5, 6, 4, 7, 6, 8, 9, 10, 8, 11, 10, 12, 13, 14, 12, 15,
      14, 16, 17, 18, 16, 19, 18, 20, 21, 22, 20, 23, 22,
    ];

    //let V = [
    //  -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1, 1, -1, -1,
    //  1, -1, -1, -1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    //  -1, 1, 1, -1,
    //];
    //let V = [-1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0];
    //let V = [
    //  -1, -1, 0, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0,
    //];
    ///let V = [-1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //let I = [0, 1, 2];

    //let V = [-1, -1, 0, 1, 1, 0, -1, 1, 0];

    //let I = [0, 1, 2, 0, 3, 2];

    MainAnim = new Anim("AnimHandle");

    new shader(MainAnim.rnd.gl);
    prim = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      V,
      I,
      MainAnim.rnd.shdprg
    );
    prim1 = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      getIcoV(),
      getIcoI(),
      MainAnim.rnd.shdprg
    );

    let VS = new getDecV();
    let IS = new getDecoI();

    let LOL = new Prim(
      MainAnim.rnd.gl,
      "Lol",
      null,
      null,
      MainAnim.rnd.shdprg
    );
    LOL.autoNormals(VS, IS, 60, 108);

    prim2 = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      VS,
      IS,
      MainAnim.rnd.shdprg
    );

    let VSS = new getTetraV();
    let ISS = new getTetraI();

    LOL.autoNormals(VSS, ISS, 12, 12);

    prim3 = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      VSS,
      ISS,
      MainAnim.rnd.shdprg
    );

    let VSSS = new getOctaV();
    let ISSS = new getOctaI();

    LOL.autoNormals(VSSS, ISSS, 24, 24);

    prim4 = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      VSSS,
      ISSS,
      MainAnim.rnd.shdprg
    );
  } // End of 'AnimInit' function

  // Render default anim
  function AnimRender() {
    MainAnim.render();
    let m = mat4(),
      m1 = mat4(),
      m2 = mat4(),
      m4 = mat4(),
      m5 = mat4(),
      m7 = mat4(),
      m9 = mat4();

    m4.translate(vec3(1.5, 2, -2));
    m5.rotate(MainAnim.timer.localTime * 50, vec3(8, 4, 2));
    m.rotate(MainAnim.timer.localTime * 50, vec3(3, 5, 2));
    m1.translate(vec3(-2, 2, -2));
    m2.rotate(MainAnim.timer.localTime * 50, vec3(1, 7, 4));
    let m3 = m2.mul(m1);
    let m6 = m5.mul(m4);
    m7.translate(vec3(-5, -1, 0));
    let m8 = m5.mul(m7);
    m9.translate(vec3(-3, -3, 2));
    let m10 = m.mul(m9);

    prim.primDraw(MainAnim.rnd, m3, MainAnim.rnd.shader);
    prim1.primDraw(MainAnim.rnd, m6, MainAnim.rnd.shader);
    prim2.primDraw(MainAnim.rnd, m, MainAnim.rnd.shader);
    prim3.primDraw(MainAnim.rnd, m8, MainAnim.rnd.shader);
    prim4.primDraw(MainAnim.rnd, m10, MainAnim.rnd.shader);
  } // End of 'AnimRender' function

  // END OF 'anim.js' FILE

  var anim = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Anim: Anim,
    AnimInit: AnimInit,
    AnimRender: AnimRender,
    get MainAnim () { return MainAnim; },
    Timer: Timer,
    rnd: rnd
  });

  //
  // includes.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // base includes of project.
  //


  // END OF 'includes.js' FILE

  var ipgl = /*#__PURE__*/Object.freeze({
    __proto__: null,
    anim: anim,
    mth: mth,
    plat: plat
  });

  //
  // main.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // main file of project (for rollup and include to html).
  //
  // [PUBLIC]
  //


  // Executable code
  window.addEventListener("load", () => {
    AnimInit();
    const Rendering = () => {
      // drawing
      AnimRender();
      // animation register
      window.requestAnimationFrame(Rendering);
    };
    Rendering();
    // onClickButton();
  });

  function onClickButton() {
    const element = document.getElementById("myInput");
    console.log(element.value);
  }

  //window.addEventListener("mousemove", (event) => {
  //  ipgl.onClick(event);
  //});

  //window.addEventListener("keydown", (event) => {
  //  ipgl.onKeys(event);
  //});

  // END OF 'main.js' FILE.

  exports.ipgl = ipgl;
  exports.onClickButton = onClickButton;

  return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC9tdGhfdmVjMy5qcyIsIi4uL3NyYy9tdGgvbXRoX2RlZi5qcyIsIi4uL3NyYy9tdGgvbXRoX21hdDQuanMiLCIuLi9zcmMvbXRoL210aC5qcyIsIi4uL3NyYy9hbmltL3JlbmRlci9yZXMvcHJpbS9wcmltLmpzIiwiLi4vc3JjL2FuaW0vcmVuZGVyL3Jlcy9zaGFkZXIvc2hkLmpzIiwiLi4vc3JjL2FuaW0vcmVuZGVyL3Jlcy9yZXMuanMiLCIuLi9zcmMvYW5pbS9yZW5kZXIvcm5kLmpzIiwiLi4vc3JjL2FuaW0vdGltZXIuanMiLCIuLi9zcmMvdXRpbHMvcGxhdC5qcyIsIi4uL3NyYy9hbmltL2FuaW0uanMiLCIuLi9zcmMvaW5jbHVkZXMuanMiLCIuLi9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vXHJcbi8vIG10aF92ZWMzLmpzXHJcbi8vXHJcbi8vICAgICAgQ29weXJpZ2h0IChDKSBDR1NHIG9mIFBNTCAzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gVmVjdG9yIDNEIHBhcnQgb2YgbXRoIGxpYnJhcnkuXHJcbi8vXHJcblxyXG4vLyBWZWN0b3IgM0QgY2xhc3NcclxuZXhwb3J0IGNsYXNzIF92ZWMzIHtcclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcclxuICAgIGlmICh4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgdGhpcy56ID0gMDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHggPT0gXCJvYmplY3RcIikge1xyXG4gICAgICBpZiAoeC54ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnggPSB4Lng7XHJcbiAgICAgICAgdGhpcy55ID0geC55O1xyXG4gICAgICAgIHRoaXMueiA9IHguejtcclxuICAgICAgfSBlbHNlIGlmICh4Lmxlbmd0aCA9PSAzKSB7XHJcbiAgICAgICAgdGhpcy54ID0geFswXTtcclxuICAgICAgICB0aGlzLnkgPSB4WzFdO1xyXG4gICAgICAgIHRoaXMueiA9IHhbMl07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMueiA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgIHRoaXMueSA9IHg7XHJcbiAgICAgIHRoaXMueiA9IHg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnggPSB4O1xyXG4gICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICB0aGlzLnogPSB6O1xyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mIGNvbnN0cnVjdG9yXHJcblxyXG4gIC8vIEFkZCAyIHZlY3RvcnNcclxuICBhZGQodikge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICsgdi54LCB0aGlzLnkgKyB2LnksIHRoaXMueiArIHYueik7XHJcbiAgfSAvLyBFbmQgb2YgJ2FkZCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0IG5lZ2F0aXZlIHZlY3RvclxyXG4gIGdldE5lZygpIHtcclxuICAgIHJldHVybiB2ZWMzKC10aGlzLngsIC10aGlzLnksIC10aGlzLnopO1xyXG4gIH0gLy8gRW5kIG9mICdnZXROZWcnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNldCBuZWdhdGl2ZSB2ZWN0b3JcclxuICBzZXROZWcoKSB7XHJcbiAgICB0aGlzLnggPSAtdGhpcy54O1xyXG4gICAgdGhpcy55ID0gLXRoaXMueTtcclxuICAgIHRoaXMueiA9IC10aGlzLno7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldE5lZycgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWluIDIgdmVjdG9yc1xyXG4gIHN1Yih2KSB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGQodi5nZXROZWcoKSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3N1YicgZnVuY3Rpb25cclxuXHJcbiAgLy8gRG90IDIgdmVjdG9yc1xyXG4gIGRvdCh2KSB7XHJcbiAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56O1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcclxuICB9IC8vIEVuZCBvZiAnZG90JyBmdW5jdGlvblxyXG5cclxuICAvLyBDcm9zcyAyIHZlY3RvcnNcclxuICBjcm9zcyh2KSB7XHJcbiAgICByZXR1cm4gdmVjMyhcclxuICAgICAgdGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueFxyXG4gICAgKTtcclxuICB9IC8vIEVuZCBvZiAnY3Jvc3MnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldCBsZW4gb2YgdmVjdG9yXHJcbiAgbGVuKCkge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRvdCgpKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxyXG4gIC8qXHJcbiAgLy8gU3ViIDIgdmVjdG9yc1xyXG4gIHN1Yih2KSB7XHJcbiAgICByZXR1cm4gdmVjMyhcclxuICAgICAgdGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueFxyXG4gICAgKTtcclxuICB9IC8vIEVuZCBvZiAnc3ViJyBmdW5jdGlvblxyXG4qL1xyXG4gIC8vIFZlYyBtdWwgbnVtXHJcbiAgbXVsKG4pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAqIG4sIHRoaXMueSAqIG4sIHRoaXMueiAqIG4pO1xyXG4gIH0gLy8gRW5kIG9mICdtdWwnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlYyBkaXYgbnVtXHJcbiAgZGl2KG4pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIG4sIHRoaXMueSAvIG4sIHRoaXMueiAvIG4pO1xyXG4gIH0gLy8gRW5kIG9mICdkaXYnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNldCB2ZWMgbm9ybWFsaXplXHJcbiAgc2V0Tm9ybWFsKCkge1xyXG4gICAgbGV0IGwgPSB0aGlzLmxlbigpO1xyXG4gICAgaWYgKGwgIT0gMCAmJiBsICE9IDEpIHtcclxuICAgICAgdGhpcy54IC89IGw7XHJcbiAgICAgIHRoaXMueSAvPSBsO1xyXG4gICAgICB0aGlzLnogLz0gbDtcclxuICAgIH1cclxuICB9IC8vIEVuZCBvZiAnc2V0Tm9ybWFsJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXQgdmVjIG5vbXJtYWxpemVcclxuICBnZXROb3JtYWwoKSB7XHJcbiAgICBsZXQgbCA9IHRoaXMubGVuKCk7XHJcbiAgICBpZiAobCA9PSAwIHx8IGwgPT0gMSkgcmV0dXJuIHZlYzModGhpcyk7XHJcbiAgICByZXR1cm4gdGhpcy5kaXYobCk7XHJcbiAgfSAvLyBFbmQgb2YgJ2dldE5vcm1hbCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIDNEIG11bCBNYXRyIGZ1bmN0aW9uXHJcbiAgbXVsTWF0cih2LCBtKSB7XHJcbiAgICBsZXQgdyA9XHJcbiAgICAgIHRoaXMueCAqIG0uYVswXVszXSArIHRoaXMueSAqIG0uYVsxXVszXSArIHRoaXMueiAqIG0uYVsyXVszXSArIG0uYVszXVszXTtcclxuXHJcbiAgICByZXR1cm4gdmVjMyhcclxuICAgICAgKHRoaXMueCAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy55ICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLnogKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIG0uYVszXVswXSkgL1xyXG4gICAgICAgIHcsXHJcbiAgICAgICh0aGlzLnggKiBtLmFbMF1bMV0gK1xyXG4gICAgICAgIHRoaXMueSAqIG0uYVsxXVsxXSArXHJcbiAgICAgICAgdGhpcy56ICogbS5hWzJdWzFdICtcclxuICAgICAgICBtLmFbM11bMV0pIC9cclxuICAgICAgICB3LFxyXG4gICAgICAodGhpcy54ICogbS5hWzBdWzJdICtcclxuICAgICAgICB0aGlzLnkgKiBtLmFbMV1bMl0gK1xyXG4gICAgICAgIHRoaXMueiAqIG0uYVsyXVsyXSArXHJcbiAgICAgICAgbS5hWzNdWzJdKSAvXHJcbiAgICAgICAgd1xyXG4gICAgKTtcclxuICB9IC8vIEVuZCBvZiAnbXVsTWF0cicgZnVuY3Rpb25cclxuXHJcbiAgLy8gQ29udmVydCB2ZWN0b3IgdG8gYXJyYXlcclxuICB0b0FycmF5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBbdGhpcy54LCB0aGlzLnksIHRoaXMuel0oKTtcclxuICB9IC8vIEVuZCBvZiAndG9BcnJheScgZnVuY3Rpb25cclxufSAvLyBFbmQgb2YgJ192ZWMzJyBjbGFzc1xyXG5cclxuLy8gQ3JlYXRlIHZlYzMgZnVuY3Rpb24uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMzKHgsIHksIHopIHtcclxuICByZXR1cm4gbmV3IF92ZWMzKHgsIHksIHopO1xyXG59IC8vIEVuZCBvZiAndmVjMycgZnVuY3Rpb25cclxuXHJcbi8vIEVORCBPRiAnbXRoX3ZlYzMuaCcgRklMRXNcclxuIiwiLy9cclxuLy8gbXRoX2RlZi5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gQmFzZSBkZWZpbml0aW9ucyBmb3IgbWF0aGVtYXRpYyBtb2R1bGUuXHJcbi8vXHJcblxyXG5leHBvcnQgeyBEMlIsIFIyRCB9O1xyXG5cclxuLy8gRDJSIGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIEQyUihhKSB7XHJcbiAgcmV0dXJuIG5ldyBOdW1iZXIoKGEgKiBNYXRoLlBJKSAvIDE4MCk7XHJcbn0gLy8gRW5kIG9mICdEMlInIGZ1bmN0aW9uXHJcblxyXG4vLyBSMkQgZnVuY3Rpb25cclxuZnVuY3Rpb24gUjJEKGEpIHtcclxuICByZXR1cm4gbmV3IE51bWJlcigoYSAqIDE4MCkgLyBNYXRoLlBJKTtcclxufVxyXG5cclxuLy8gRU5EIE9GICdtdGhfZGVmLmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIG10aF9tYXQ0LmpzXHJcbi8vXHJcbi8vICAgICAgQ29weXJpZ2h0IChDKSBDR1NHIG9mIFBNTCAzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gTWF0cml4IDR4NCBwYXJ0IG9mIG10aCBsaWJyYXJ5LlxyXG4vL1xyXG5cclxuLy8gSW1wb3J0XHJcbmltcG9ydCB7IHZlYzMsIF92ZWMzIH0gZnJvbSBcIi4vbXRoX3ZlYzNcIjtcclxuaW1wb3J0IHsgRDJSLCBSMkQgfSBmcm9tIFwiLi9tdGhfZGVmLmpzXCI7XHJcblxyXG4vLyBNYXRyaXggNHg0IGNsYXNzXHJcbmV4cG9ydCBjbGFzcyBfbWF0NCB7XHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGEwMCxcclxuICAgIGEwMSxcclxuICAgIGEwMixcclxuICAgIGEwMyxcclxuICAgIGExMCxcclxuICAgIGExMSxcclxuICAgIGExMixcclxuICAgIGExMyxcclxuICAgIGEyMCxcclxuICAgIGEyMSxcclxuICAgIGEyMixcclxuICAgIGEyMyxcclxuICAgIGEzMCxcclxuICAgIGEzMSxcclxuICAgIGEzMixcclxuICAgIGEzM1xyXG4gICkge1xyXG4gICAgaWYgKGEwMCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICB0aGlzLmEgPSBbXHJcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDFdLFxyXG4gICAgICBdO1xyXG4gICAgZWxzZSBpZiAodHlwZW9mIGEwMCA9PSBcIm9iamVjdFwiICYmIGEwMC5hLmxlbmd0aCA9PSA0KSB0aGlzLmEgPSBhMDAuYTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy5hID0gW1xyXG4gICAgICAgIFthMDAsIGEwMSwgYTAyLCBhMDNdLFxyXG4gICAgICAgIFthMTAsIGExMSwgYTEyLCBhMTNdLFxyXG4gICAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdLFxyXG4gICAgICBdO1xyXG4gIH0gLy8gRW5kIG9mIGNvbnN0cnVjdG9yXHJcblxyXG4gIC8vIE1hdHIgbXVsIG1hdHIgZnVuY3Rpb25cclxuICBtdWwobSkge1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIHRoaXMuYVswXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzFdICtcclxuICAgICAgICB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMV0gK1xyXG4gICAgICAgIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsxXSArXHJcbiAgICAgICAgdGhpcy5hWzBdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMl0gK1xyXG4gICAgICAgIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsyXSArXHJcbiAgICAgICAgdGhpcy5hWzBdWzJdICogbS5hWzJdWzJdICtcclxuICAgICAgICB0aGlzLmFbMF1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVszXSArXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdICogbS5hWzFdWzNdICtcclxuICAgICAgICB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bM10gK1xyXG4gICAgICAgIHRoaXMuYVswXVszXSAqIG0uYVszXVszXSxcclxuXHJcbiAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIHRoaXMuYVsxXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzFdICtcclxuICAgICAgICB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMV0gK1xyXG4gICAgICAgIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVsxXSArXHJcbiAgICAgICAgdGhpcy5hWzFdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMl0gK1xyXG4gICAgICAgIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVsyXSArXHJcbiAgICAgICAgdGhpcy5hWzFdWzJdICogbS5hWzJdWzJdICtcclxuICAgICAgICB0aGlzLmFbMV1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVszXSArXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdICogbS5hWzFdWzNdICtcclxuICAgICAgICB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bM10gK1xyXG4gICAgICAgIHRoaXMuYVsxXVszXSAqIG0uYVszXVszXSxcclxuXHJcbiAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIHRoaXMuYVsyXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzFdICtcclxuICAgICAgICB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMV0gK1xyXG4gICAgICAgIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVsxXSArXHJcbiAgICAgICAgdGhpcy5hWzJdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMl0gK1xyXG4gICAgICAgIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVsyXSArXHJcbiAgICAgICAgdGhpcy5hWzJdWzJdICogbS5hWzJdWzJdICtcclxuICAgICAgICB0aGlzLmFbMl1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVszXSArXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdICogbS5hWzFdWzNdICtcclxuICAgICAgICB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bM10gK1xyXG4gICAgICAgIHRoaXMuYVsyXVszXSAqIG0uYVszXVszXSxcclxuXHJcbiAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIHRoaXMuYVszXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzFdICtcclxuICAgICAgICB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMV0gK1xyXG4gICAgICAgIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsxXSArXHJcbiAgICAgICAgdGhpcy5hWzNdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMl0gK1xyXG4gICAgICAgIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsyXSArXHJcbiAgICAgICAgdGhpcy5hWzNdWzJdICogbS5hWzJdWzJdICtcclxuICAgICAgICB0aGlzLmFbM11bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVszXSArXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdICogbS5hWzFdWzNdICtcclxuICAgICAgICB0aGlzLmFbM11bMl0gKiBtLmFbMl1bM10gK1xyXG4gICAgICAgIHRoaXMuYVszXVszXSAqIG0uYVszXVszXVxyXG4gICAgKTtcclxuICB9IC8vIEVuZCBvZiAnbXVsJyBmdW5jdGlvbi5cclxuXHJcbiAgLy8gTWF0ciB0cmFuc2xhdGUgZnVuY3Rpb25cclxuICB0cmFuc2xhdGUodikge1xyXG4gICAgdGhpcy5hID0gbWF0NCgxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCB2LngsIHYueSwgdi56LCAxKS5hO1xyXG4gIH0gLy8gRW5kIG9mICd0cmFuc2xhdGUnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIE1hdHIgc2NhbGUgZnVuY3Rpb25cclxuICBzY2FsZSh2KSB7XHJcbiAgICB0aGlzLmEgPSBtYXQ0KHYueCwgMCwgMCwgMCwgMCwgdi55LCAwLCAwLCAwLCAwLCB2LnosIDAsIDAsIDAsIDAsIDEpO1xyXG4gIH0gLy8gRW5kIG9mICdzY2FsZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0ciBSb3RhdGVYIGZ1bmN0aW9cclxuICByb3RhdGVYKGEpIHtcclxuICAgIGxldCBhbiA9IEQyUihhKSxcclxuICAgICAgYyA9IGNvcyhhbiksXHJcbiAgICAgIHMgPSBzaW4oYW4pO1xyXG5cclxuICAgIHRoaXMuYSA9IG1hdDQoMSwgMCwgMCwgMCwgMCwgYywgcywgMCwgMCwgLXMsIGMsIDAsIDAsIDAsIDAsIDEpLmE7XHJcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZVgnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIE1hdHIgcm90YXRlWSBmdW5jdGlvblxyXG4gIHJvdGF0ZVkoYSkge1xyXG4gICAgbGV0IGFuID0gRDJSKGEpLFxyXG4gICAgICBjID0gY29zKGFuKSxcclxuICAgICAgcyA9IHNpbihhbik7XHJcblxyXG4gICAgdGhpcy5hID0gbWF0NChjLCAwLCAtcywgMCwgMCwgMSwgMCwgMCwgcywgMCwgYywgMCwgMCwgMCwgMCwgMSkuYTtcclxuICB9IC8vIEVuZCBvZiAncm90YXRlWScgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0ciBSb3RhdGVaIGZ1bmN0aW9uXHJcbiAgcm90YXRlWihhKSB7XHJcbiAgICBsZXQgYW4gPSBEMlIoYSksXHJcbiAgICAgIGMgPSBjb3MoYW4pLFxyXG4gICAgICBzID0gc2luKGFuKTtcclxuXHJcbiAgICB0aGlzLmEgPSBtYXQ0KGMsIHMsIDAsIDAsIC1zLCBjLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxKS5hO1xyXG4gIH0gLy8gRW5kIG9mICdyb3RhdGVaJyBmdW5jdGlvblxyXG5cclxuICAvLyBNYXRyIHJvdGF0ZSBmdW5jdGlvblxyXG4gIHJvdGF0ZShhLCByKSB7XHJcbiAgICBsZXQgQSA9IEQyUihhKSxcclxuICAgICAgcyA9IE1hdGguc2luKEEpLFxyXG4gICAgICBjID0gTWF0aC5jb3MoQSk7XHJcbiAgICBsZXQgViA9IHIuZ2V0Tm9ybWFsKCk7XHJcbiAgICB0aGlzLmEgPSBtYXQ0KFxyXG4gICAgICBjICsgVi54ICogVi54ICogKDEgLSBjKSxcclxuICAgICAgVi54ICogVi55ICogKDEgLSBjKSArIFYueiAqIHMsXHJcbiAgICAgIFYueCAqIFYueiAqICgxIC0gYykgLSBWLnkgKiBzLFxyXG4gICAgICAwLFxyXG4gICAgICBWLnkgKiBWLnggKiAoMSAtIGMpIC0gVi56ICogcyxcclxuICAgICAgYyArIFYueSAqIFYueSAqICgxIC0gYyksXHJcbiAgICAgIFYueSAqIFYueiAqICgxIC0gYykgKyBWLnggKiBzLFxyXG4gICAgICAwLFxyXG4gICAgICBWLnogKiBWLnggKiAoMSAtIGMpICsgVi55ICogcyxcclxuICAgICAgVi56ICogVi55ICogKDEgLSBjKSAtIFYueCAqIHMsXHJcbiAgICAgIGMgKyBWLnogKiBWLnogKiAoMSAtIGMpLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAxXHJcbiAgICApLmE7XHJcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0ciB0cmFuc3BvbnNlIGZ1bmN0aW9uXHJcbiAgdHJhbnNwb25zZShtKSB7XHJcbiAgICB0aGlzLmEgPSBtYXQ0KFxyXG4gICAgICBtLmFbMF1bMF0sXHJcbiAgICAgIG0uYVsxXVswXSxcclxuICAgICAgbS5hWzJdWzBdLFxyXG4gICAgICBtLmFbM11bMF0sXHJcbiAgICAgIG0uYVswXVsxXSxcclxuICAgICAgbS5hWzFdWzFdLFxyXG4gICAgICBtLmFbMl1bMV0sXHJcbiAgICAgIG0uYVszXVsxXSxcclxuICAgICAgbS5hWzBdWzJdLFxyXG4gICAgICBtLmFbMV1bMl0sXHJcbiAgICAgIG0uYVsyXVsyXSxcclxuICAgICAgbS5hWzNdWzJdLFxyXG4gICAgICBtLmFbMF1bM10sXHJcbiAgICAgIG0uYVsxXVszXSxcclxuICAgICAgbS5hWzJdWzNdLFxyXG4gICAgICBtLmFbM11bM11cclxuICAgICkuYTtcclxuICB9IC8vIEVuZCBvZiAndHJhbnNwb25zZScgZnVuY3Rpb24uXHJcblxyXG4gIC8vIERldGVybWluYXRlIG1hdHJpeCBmdW5jdGlvbi5cclxuICBkZXRlcm0oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLmFbMF1bMF0gKlxyXG4gICAgICAgIG1hdDNEZXRlcm0oXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbMV1bM10sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bM10sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bM11cclxuICAgICAgICApIC1cclxuICAgICAgdGhpcy5hWzBdWzFdICpcclxuICAgICAgICBtYXQzRGV0ZXJtKFxyXG4gICAgICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICAgICAgdGhpcy5hWzFdWzJdLFxyXG4gICAgICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICAgICAgdGhpcy5hWzJdWzBdLFxyXG4gICAgICAgICAgdGhpcy5hWzJdWzJdLFxyXG4gICAgICAgICAgdGhpcy5hWzJdWzNdLFxyXG4gICAgICAgICAgdGhpcy5hWzNdWzBdLFxyXG4gICAgICAgICAgdGhpcy5hWzNdWzJdLFxyXG4gICAgICAgICAgdGhpcy5hWzNdWzNdXHJcbiAgICAgICAgKSArXHJcbiAgICAgIHRoaXMuYVswXVsyXSAqXHJcbiAgICAgICAgbWF0M0RldGVybShcclxuICAgICAgICAgIHRoaXMuYVsxXVswXSxcclxuICAgICAgICAgIHRoaXMuYVsxXVsxXSxcclxuICAgICAgICAgIHRoaXMuYVsxXVszXSxcclxuICAgICAgICAgIHRoaXMuYVsyXVswXSxcclxuICAgICAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgICAgIHRoaXMuYVsyXVszXSxcclxuICAgICAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgICAgIHRoaXMuYVszXVsxXSxcclxuICAgICAgICAgIHRoaXMuYVszXVszXVxyXG4gICAgICAgICkgLVxyXG4gICAgICB0aGlzLmFbMF1bM10gKlxyXG4gICAgICAgIG1hdDNEZXRlcm0oXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMF0sXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMF0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMl1cclxuICAgICAgICApXHJcbiAgICApO1xyXG4gIH0gLy8gRW5kIG9mICdkZXRlcm0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldCBpbnZlcnNlIG1hdHJpeCBmdW5jdGlvblxyXG4gIGdldEludmVyc2UoKSB7XHJcbiAgICBsZXQgciA9IG1hdDQoKTtcclxuICAgIGxldCBkZXQgPSB0aGlzLmRldGVybSgpO1xyXG5cclxuICAgIGlmIChkZXQgPT0gMCkgcmV0dXJuIHI7XHJcblxyXG4gICAgLyogYnVpbGQgYWRqb2ludCBtYXRyaXggKi9cclxuICAgIHIuYVswXVswXSA9XHJcbiAgICAgICttYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVsxXVsxXSxcclxuICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzNdLFxyXG4gICAgICAgIHRoaXMuYVszXVsxXSxcclxuICAgICAgICB0aGlzLmFbM11bMl0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzNdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzFdWzBdID1cclxuICAgICAgLW1hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsyXSxcclxuICAgICAgICB0aGlzLmFbMV1bM10sXHJcbiAgICAgICAgdGhpcy5hWzJdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsyXSxcclxuICAgICAgICB0aGlzLmFbMl1bM10sXHJcbiAgICAgICAgdGhpcy5hWzNdWzBdLFxyXG4gICAgICAgIHRoaXMuYVszXVsyXSxcclxuICAgICAgICB0aGlzLmFbM11bM11cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbMl1bMF0gPVxyXG4gICAgICArbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMV1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsxXVszXSxcclxuICAgICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsyXVszXSxcclxuICAgICAgICB0aGlzLmFbM11bMF0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdLFxyXG4gICAgICAgIHRoaXMuYVszXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVszXVswXSA9XHJcbiAgICAgIC1tYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVsxXVswXSxcclxuICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsyXVswXSxcclxuICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzJdLFxyXG4gICAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzJdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzBdWzFdID1cclxuICAgICAgLW1hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdLFxyXG4gICAgICAgIHRoaXMuYVswXVsyXSxcclxuICAgICAgICB0aGlzLmFbMF1bM10sXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsyXSxcclxuICAgICAgICB0aGlzLmFbMl1bM10sXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdLFxyXG4gICAgICAgIHRoaXMuYVszXVsyXSxcclxuICAgICAgICB0aGlzLmFbM11bM11cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbMV1bMV0gPVxyXG4gICAgICArbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMF1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzJdLFxyXG4gICAgICAgIHRoaXMuYVswXVszXSxcclxuICAgICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsyXVszXSxcclxuICAgICAgICB0aGlzLmFbM11bMF0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzJdLFxyXG4gICAgICAgIHRoaXMuYVszXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVsyXVsxXSA9XHJcbiAgICAgIC1tYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVswXVswXSxcclxuICAgICAgICB0aGlzLmFbMF1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsyXVswXSxcclxuICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzNdLFxyXG4gICAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzNdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzNdWzFdID1cclxuICAgICAgK21hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzBdWzBdLFxyXG4gICAgICAgIHRoaXMuYVswXVsxXSxcclxuICAgICAgICB0aGlzLmFbMF1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzBdLFxyXG4gICAgICAgIHRoaXMuYVszXVsxXSxcclxuICAgICAgICB0aGlzLmFbM11bMl1cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbMF1bMl0gPVxyXG4gICAgICArbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMF1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzJdLFxyXG4gICAgICAgIHRoaXMuYVswXVszXSxcclxuICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsxXVszXSxcclxuICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzJdLFxyXG4gICAgICAgIHRoaXMuYVszXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVsxXVsyXSA9XHJcbiAgICAgIC1tYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVswXVswXSxcclxuICAgICAgICB0aGlzLmFbMF1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsxXVswXSxcclxuICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgICB0aGlzLmFbM11bMl0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzNdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzJdWzJdID1cclxuICAgICAgK21hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzBdWzBdLFxyXG4gICAgICAgIHRoaXMuYVswXVsxXSxcclxuICAgICAgICB0aGlzLmFbMF1bM10sXHJcbiAgICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsxXSxcclxuICAgICAgICB0aGlzLmFbMV1bM10sXHJcbiAgICAgICAgdGhpcy5hWzNdWzBdLFxyXG4gICAgICAgIHRoaXMuYVszXVsxXSxcclxuICAgICAgICB0aGlzLmFbM11bM11cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbM11bMl0gPVxyXG4gICAgICAtbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMF1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdLFxyXG4gICAgICAgIHRoaXMuYVswXVsyXSxcclxuICAgICAgICB0aGlzLmFbMV1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsyXSxcclxuICAgICAgICB0aGlzLmFbM11bMF0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdLFxyXG4gICAgICAgIHRoaXMuYVszXVsyXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVswXVszXSA9XHJcbiAgICAgIC1tYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVswXVsxXSxcclxuICAgICAgICB0aGlzLmFbMF1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsxXSxcclxuICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzNdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzFdWzNdID1cclxuICAgICAgK21hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzBdWzBdLFxyXG4gICAgICAgIHRoaXMuYVswXVsyXSxcclxuICAgICAgICB0aGlzLmFbMF1bM10sXHJcbiAgICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsyXSxcclxuICAgICAgICB0aGlzLmFbMV1bM10sXHJcbiAgICAgICAgdGhpcy5hWzJdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsyXSxcclxuICAgICAgICB0aGlzLmFbMl1bM11cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbMl1bM10gPVxyXG4gICAgICAtbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMF1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdLFxyXG4gICAgICAgIHRoaXMuYVswXVszXSxcclxuICAgICAgICB0aGlzLmFbMV1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsxXVszXSxcclxuICAgICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsyXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVszXVszXSA9XHJcbiAgICAgICttYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVswXVswXSxcclxuICAgICAgICB0aGlzLmFbMF1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsxXVswXSxcclxuICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsyXVswXSxcclxuICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzJdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfSAvLyBFbmQgb2YgJ2dldEludmVyc2UnIGZ1bmN0aW9uLlxyXG5cclxuICAvLyBmcnVzdHVtIG1hdHJpeCBmdW5jdGlvblxyXG4gIGZydXN0dW0oTCwgUiwgQiwgVCwgTiwgRikge1xyXG4gICAgdGhpcy5hID0gbWF0NChcclxuICAgICAgKDIgKiBOKSAvIChSIC0gTCksXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgICgyICogTikgLyAoVCAtIEIpLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAoUiArIEwpIC8gKFIgLSBMKSxcclxuICAgICAgKFQgKyBCKSAvIChUIC0gQiksXHJcbiAgICAgIC0oRiArIE4pIC8gKEYgLSBOKSxcclxuICAgICAgLTEsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgICgtMiAqIE4gKiBGKSAvIChGIC0gTiksXHJcbiAgICAgIDBcclxuICAgICkuYTtcclxuICB9IC8vIEVuZCBvZiAnZnJ1c3R1bScgZnVuY3Rpb25cclxuXHJcbiAgLy8gb3J0aG8gbWF0cml4IGZ1bmN0aW9uXHJcbiAgb3J0aG8oTCwgUiwgQiwgVCwgTiwgRikge1xyXG4gICAgdGhpcy5hID0gbWF0NChcclxuICAgICAgMiAvIChSIC0gTCksXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDIgLyAoVCAtIEIpLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAtMiAvIChGIC0gTiksXHJcbiAgICAgIDAsXHJcbiAgICAgIC0oUiArIEwpIC8gKFIgLSBMKSxcclxuICAgICAgLShUICsgQikgLyAoVCAtIEIpLFxyXG4gICAgICAtKEYgKyBOKSAvIChGIC0gTiksXHJcbiAgICAgIDFcclxuICAgICk7XHJcbiAgfSAvLyBFbmQgb2YgJ29ydGhvJyBmdW5jdGlvblxyXG5cclxuICAvLyBTZXQgdmlldyBtYXRyaXggZnVuY3Rpb25cclxuICB2aWV3KExvYywgQXQsIFVwMSkge1xyXG4gICAgY29uc3QgRGlyID0gdmVjMyhBdCkuc3ViKExvYykuZ2V0Tm9ybWFsKCk7XHJcbiAgICBjb25zdCBSaWdodCA9IHZlYzMoRGlyKS5jcm9zcyhVcDEpLmdldE5vcm1hbCgpO1xyXG4gICAgY29uc3QgVXAgPSB2ZWMzKFJpZ2h0KS5jcm9zcyhEaXIpLmdldE5vcm1hbCgpO1xyXG5cclxuICAgIHRoaXMuYSA9IG1hdDQoXHJcbiAgICAgIFJpZ2h0LngsXHJcbiAgICAgIFVwLngsXHJcbiAgICAgIC1EaXIueCxcclxuICAgICAgMCxcclxuICAgICAgUmlnaHQueSxcclxuICAgICAgVXAueSxcclxuICAgICAgLURpci55LFxyXG4gICAgICAwLFxyXG4gICAgICBSaWdodC56LFxyXG4gICAgICBVcC56LFxyXG4gICAgICAtRGlyLnosXHJcbiAgICAgIDAsXHJcbiAgICAgIC1Mb2MuZG90KFJpZ2h0KSxcclxuICAgICAgLUxvYy5kb3QoVXApLFxyXG4gICAgICBMb2MuZG90KERpciksXHJcbiAgICAgIDFcclxuICAgICkuYTtcclxuICB9IC8vIEVuZCBvZiAndmlldycgZnVuY3Rpb25cclxuXHJcbiAgdG9BcnJheSgpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHRoaXMuYVswXVswXSxcclxuICAgICAgdGhpcy5hWzBdWzFdLFxyXG4gICAgICB0aGlzLmFbMF1bMl0sXHJcbiAgICAgIHRoaXMuYVswXVszXSxcclxuICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgIHRoaXMuYVsxXVsyXSxcclxuICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgdGhpcy5hWzJdWzJdLFxyXG4gICAgICB0aGlzLmFbMl1bM10sXHJcbiAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgdGhpcy5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVszXVszXSxcclxuICAgIF07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBHZXQgbWF0cml4IGZ1bmN0aW9uLlxyXG5leHBvcnQgZnVuY3Rpb24gbWF0NChcclxuICBhMDAsXHJcbiAgYTAxLFxyXG4gIGEwMixcclxuICBhMDMsXHJcbiAgYTEwLFxyXG4gIGExMSxcclxuICBhMTIsXHJcbiAgYTEzLFxyXG4gIGEyMCxcclxuICBhMjEsXHJcbiAgYTIyLFxyXG4gIGEyMyxcclxuICBhMzAsXHJcbiAgYTMxLFxyXG4gIGEzMixcclxuICBhMzNcclxuKSB7XHJcbiAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgIGEwMCxcclxuICAgIGEwMSxcclxuICAgIGEwMixcclxuICAgIGEwMyxcclxuICAgIGExMCxcclxuICAgIGExMSxcclxuICAgIGExMixcclxuICAgIGExMyxcclxuICAgIGEyMCxcclxuICAgIGEyMSxcclxuICAgIGEyMixcclxuICAgIGEyMyxcclxuICAgIGEzMCxcclxuICAgIGEzMSxcclxuICAgIGEzMixcclxuICAgIGEzM1xyXG4gICk7XHJcbn0gLy8gRW5kIG9mICdtYXQ0JyBmdW5jdGlvbi5cclxuXHJcbi8vIG1hdDMgZGV0ZXJtaW5hdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0M0RldGVybShhMTEsIGExMiwgYTEzLCBhMjEsIGEyMiwgYTIzLCBhMzEsIGEzMiwgYTMzKSB7XHJcbiAgcmV0dXJuIG5ldyBOdW1iZXIoXHJcbiAgICBhMTEgKiBhMjIgKiBhMzMgK1xyXG4gICAgICBhMTIgKiBhMjMgKiBhMzEgK1xyXG4gICAgICBhMTMgKiBhMjEgKiBhMzIgLVxyXG4gICAgICBhMTEgKiBhMjMgKiBhMzIgLVxyXG4gICAgICBhMTIgKiBhMjEgKiBhMzMgLVxyXG4gICAgICBhMTMgKiBhMjIgKiBhMzFcclxuICApO1xyXG59IC8vIEVuZCBvZiAnbWF0M0RldGVybScgZnVuY3Rpb25cclxuXHJcbi8vIEVORCBPRiAnbXRoX21hdDQuanMnIEZJTEVzXHJcbiIsIi8vXHJcbi8vIG10aC5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwgMzAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vXHJcbi8vIE1haW4gZmlsZSBvZiBtdGggbGlicmFyeS5cclxuLy9cclxuXHJcbi8qIGltcG9ydHMgKi9cclxuaW1wb3J0IHsgdmVjMywgX3ZlYzMgfSBmcm9tIFwiLi9tdGhfdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBtYXQ0LCBfbWF0NCwgbWF0M0RldGVybSB9IGZyb20gXCIuL210aF9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IEQyUiwgUjJEIH0gZnJvbSBcIi4vbXRoX2RlZi5qc1wiO1xyXG5cclxuLyogZXhwb3J0cyAqL1xyXG5leHBvcnQgeyB2ZWMzLCBfdmVjMyB9O1xyXG5leHBvcnQgeyBtYXQ0LCBfbWF0NCwgbWF0M0RldGVybSB9O1xyXG5leHBvcnQgeyBEMlIsIFIyRCB9O1xyXG5cclxuLy8gRU5EIE9GICdtdGguanMnIEZJTEVcclxuIiwiLy9cclxuLy8gcHJpbS5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gUHJpbWl0aXZlIG1vZHVsZS5cclxuLy9cclxuXHJcbmltcG9ydCAqIGFzIGlwZ2wgZnJvbSBcIi4uLy4uLy4uLy4uL2luY2x1ZGVzXCI7XHJcblxyXG4vLyBWZXJ0ZXggY2xhc3NcclxuZXhwb3J0IGNsYXNzIF9WZXJ0ZXgge1xyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgY29uc3RydWN0b3IocCwgbikge1xyXG4gICAgdGhpcy52ID0gW3AueCwgcC55LCBwLnosIG4ueCwgbi55LCBuLnpdO1xyXG4gIH0gLy8gRW5kIG9mIGNvbnN0cnVjdG9yXHJcbn0gLy8gRW5kIG9mICdfVmVydGV4JyBjbGFzc1xyXG5cclxuLy8gR2V0IG9iamVjdCB2ZXJ0ZXhcclxuZnVuY3Rpb24gX0dldE9ialZlcnRleCh2KSB7XHJcbiAgcmV0dXJuIHsgcDogW3ZbMF0sIHZbMV0sIHZbMl1dLCBuOiBbblswXSwgblsxXSwgblsyXV0gfTtcclxufSAvLyBFbmQgb2YgJ19HZXRPYmpWZXJ0ZXgnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXQgbmV3IG9iamVjdCB2ZXJ0ZXhcclxuZnVuY3Rpb24gR2V0T2JqVmVydGV4KHYpIHtcclxuICByZXR1cm4gbmV3IF9HZXRPYmpWZXJ0ZXgodik7XHJcbn0gLy8gRW5kIG9mICdHZXRPYmpWZXJ0ZXgnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXQgdmVydGV4IGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBWZXJ0ZXgocCwgbikge1xyXG4gIHJldHVybiBuZXcgX1ZlcnRleChwLCBuKTtcclxufSAvLyBFbmQgb2YgJ1ZlcnRleCcgZnVuY3Rpb25cclxuXHJcbi8vIFByaW1pdGl2ZSBjbGFzc1xyXG5leHBvcnQgY2xhc3MgUHJpbSB7XHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBjb25zdHJ1Y3RvcihnbCwgdHlwZSwgdmVydGljZXMsIGluZGljZXMsIHByZykge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuVkEgPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG5cclxuICAgIC8vaWYgKHZlcnRpY2VzICE9IG51bGwgJiYgaW5kaWNlcyAhPSBudWxsKVxyXG4gICAgLy8gIHRoaXMuYXV0b05vcm1hbHModmVydGljZXMsIGluZGljZXMsIHZlcnRpY2VzLmxlbmd0aCwgaW5kaWNlcy5sZW5ndGgpO1xyXG5cclxuICAgIGlmICh2ZXJ0aWNlcyAhPSBudWxsICYmIHZlcnRpY2VzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLlZBKTtcclxuICAgICAgdGhpcy5WQnVmID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLlZCdWYpO1xyXG4gICAgICBnbC5idWZmZXJEYXRhKFxyXG4gICAgICAgIGdsLkFSUkFZX0JVRkZFUixcclxuICAgICAgICBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKSxcclxuICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBwb3NMb2MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcmcsIFwiSW5Qb3NpdGlvblwiKTtcclxuICAgICAgY29uc3Qgbm9yTG9jID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJnLCBcIkluTm9ybWFsXCIpO1xyXG5cclxuICAgICAgaWYgKHBvc0xvYyAhPSAtMSkge1xyXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zTG9jLCAzLCBnbC5GTE9BVCwgZmFsc2UsIDI0LCAwKTtcclxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NMb2MpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChub3JMb2MgIT0gLTEpIHtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKG5vckxvYywgMywgZ2wuRkxPQVQsIGZhbHNlLCAyNCwgMTIpO1xyXG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG5vckxvYyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5ub29mViA9IHZlcnRpY2VzLmxlbmd0aCAvIDY7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5vb2ZWID0gMDtcclxuICAgICAgdGhpcy5WQnVmID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKiBTZXQgaW5kZXggZGF0YSAqL1xyXG4gICAgaWYgKGluZGljZXMgIT0gbnVsbCAmJiBpbmRpY2VzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgIHRoaXMuSUJ1ZiA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLklCdWYpO1xyXG4gICAgICBnbC5idWZmZXJEYXRhKFxyXG4gICAgICAgIGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLFxyXG4gICAgICAgIG5ldyBVaW50MzJBcnJheShpbmRpY2VzKSxcclxuICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICApO1xyXG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKTtcclxuICAgICAgdGhpcy5ub29mSSA9IGluZGljZXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLk51bU9mRWxlbWVudHMgPSB0aGlzLm5vb2ZJO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ub29mSSA9IDA7XHJcbiAgICAgIHRoaXMuSUJ1ZiA9IDA7XHJcbiAgICAgIHRoaXMuTnVtT2ZFbGVtZW50cyA9IHRoaXMubm9vZlY7XHJcbiAgICB9XHJcbiAgICAvKiBHZXRNaW5NYXhCQiAqL1xyXG4gICAgLy9JUDVfUm5kUHJpbUV2YWxCQigmUHItPk1pbkJCLCAmUHItPk1heEJCLCBWLCBOb29mVik7XHJcblxyXG4gICAgdGhpcy5NdGxObyA9IDA7XHJcbiAgfSAvLyBFbmQgb2YgY29udHN0cnVjdG9yXHJcblxyXG4gIC8vIFByaW0gZHJhdyBmdW5jdGlvblxyXG4gIHByaW1EcmF3KHJuZCwgbWF0ciwgc2hkKSB7XHJcbiAgICBsZXQgZ2wgPSBybmQuZ2w7XHJcbiAgICBjb25zdCBwcm9nSWQgPSBzaGQucHJnO1xyXG4gICAgbGV0IGxvYztcclxuICAgIGNvbnN0IGdsUHJpbVR5cGUgPSB0aGlzLnR5cGUgPT0gXCJUcmltZXNoXCIgPyBnbC5UUklBTkdMRVMgOiBnbC5QT0lOVFM7XHJcbiAgICBjb25zdCB3ID0gaXBnbC5tdGgubWF0NChtYXRyKSxcclxuICAgICAgd25vcm1hbCA9IHcuZ2V0SW52ZXJzZSgpLFxyXG4gICAgICB3dnAgPSB3Lm11bChybmQubWF0clZQKTtcclxuXHJcbiAgICB3bm9ybWFsLnRyYW5zcG9uc2UobWF0ci5nZXRJbnZlcnNlKCkpO1xyXG5cclxuICAgIC8vIHNlbmQgZGF0YSB0byBzaGFkZXJcclxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ0lkKTtcclxuXHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KFxyXG4gICAgICBzaGQuTWF0cldWUExvYyxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW10uY29uY2F0KC4uLnd2cC5hKSlcclxuICAgICk7IC8vIHd2cC50b0FycmF5KCkpKTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoXHJcbiAgICAgIHNoZC5NYXRyV0ludkxvYyxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW10uY29uY2F0KC4uLndub3JtYWwuYSkpXHJcbiAgICApO1xyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihcclxuICAgICAgc2hkLk1hdHJXTG9jLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbXS5jb25jYXQoLi4udy5hKSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gcmVuZGVyXHJcbiAgICBnbC5iaW5kVmVydGV4QXJyYXkodGhpcy5WQSk7XHJcblxyXG4gICAgaWYgKHRoaXMuSUJ1ZiA9PSAwKSB7XHJcbiAgICAgIGdsLmRyYXdBcnJheXMoZ2xQcmltVHlwZSwgMCwgdGhpcy5OdW1PZkVsZW1lbnRzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSUJ1Zik7XHJcbiAgICAgIGdsLmRyYXdFbGVtZW50cyhnbFByaW1UeXBlLCB0aGlzLk51bU9mRWxlbWVudHMsIGdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgIGdsLnVzZVByb2dyYW0obnVsbCk7XHJcbiAgfSAvL1MgRW5kIG9mICdyaW1EcmF3JyBmdW5jdGlvblxyXG5cclxuICAvLyBFdmFsdXRhdGlvbiBib3VuZCBib3ggZnVuY3Rpb25cclxuICBldmFsQkIoKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9IC8vIEVuZCBvZiAnZXZhbEJCJyBmdW5jdGlvblxyXG5cclxuICAvLyBFdmFsdXRhdGlvbiBub3JtYWxzIGJ5IHBvc2l0aW9uIHZlY3RvcnMgZnVuY3Rpb24uXHJcbiAgYXV0b05vcm1hbHMoViwgSSwgbm9vZlYsIG5vb2ZJKSB7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICAvKiBTZXQgYWxsIHZlcnRleCBub3JtYWxzIHRvIHplcm8gKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCBub29mVjsgKytpKSB7XHJcbiAgICAgIFZbNiAqIGkgKyAzXSA9IDA7XHJcbiAgICAgIFZbNiAqIGkgKyA0XSA9IDA7XHJcbiAgICAgIFZbNiAqIGkgKyA1XSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRXZhbCBub3JtYWwgZm9yIGV2ZXJ5IGZhY2V0ICovXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbm9vZkk7IGkgKz0gMykge1xyXG4gICAgICBjb25zdCBuMCA9IElbaV0sXHJcbiAgICAgICAgbjEgPSBJW2kgKyAxXSxcclxuICAgICAgICBuMiA9IElbaSArIDJdO1xyXG4gICAgICBjb25zdCBwMCA9IGlwZ2wubXRoLnZlYzMoVls2ICogbjBdLCBWWzYgKiBuMCArIDFdLCBWWzYgKiBuMCArIDJdKSxcclxuICAgICAgICBwMSA9IGlwZ2wubXRoLnZlYzMoVls2ICogbjFdLCBWWzYgKiBuMSArIDFdLCBWWzYgKiBuMSArIDJdKSxcclxuICAgICAgICBwMiA9IGlwZ2wubXRoLnZlYzMoVls2ICogbjJdLCBWWzYgKiBuMiArIDFdLCBWWzYgKiBuMiArIDJdKSxcclxuICAgICAgICBOID0gcDEuc3ViKHAwKS5jcm9zcyhwMi5zdWIocDApKS5nZXROb3JtYWwoKTtcclxuXHJcbiAgICAgIGNvbnN0IG5uMCA9IE4sIC8vLmFkZChcclxuICAgICAgICAvLyAgIGlwZ2wubXRoLnZlYzMoVls2ICogbjAgKyAzXSwgVls2ICogbjAgKyA0XSwgVls2ICogbjAgKyA1XSlcclxuICAgICAgICAvLyApLFxyXG4gICAgICAgIG5uMSA9IE4sIC8vLmFkZChpcGdsLm10aC52ZWMzKFZbNiAqIG4xICsgM10sIFZbNiAqIG4xICsgNF0sIFZbNiAqIG4yICsgNV0pKSxcclxuICAgICAgICBubjIgPSBOOyAvLy5hZGQoaXBnbC5tdGgudmVjMyhWWzYgKiBuMiArIDNdLCBWWzYgKiBuMiArIDRdLCBWWzYgKiBuMiArIDVdKSk7XHJcblxyXG4gICAgICAvLyBuMFxyXG4gICAgICBWWzYgKiBuMCArIDNdID0gbm4wLng7XHJcbiAgICAgIFZbNiAqIG4wICsgNF0gPSBubjAueTtcclxuICAgICAgVls2ICogbjAgKyA1XSA9IG5uMC56O1xyXG5cclxuICAgICAgLy8gbjFcclxuICAgICAgVls2ICogbjEgKyAzXSA9IG5uMS54O1xyXG4gICAgICBWWzYgKiBuMSArIDRdID0gbm4xLnk7XHJcbiAgICAgIFZbNiAqIG4xICsgNV0gPSBubjEuejtcclxuXHJcbiAgICAgIC8vIG4yXHJcbiAgICAgIFZbNiAqIG4yICsgM10gPSBubjIueDtcclxuICAgICAgVls2ICogbjIgKyA0XSA9IG5uMi55O1xyXG4gICAgICBWWzYgKiBuMiArIDVdID0gbm4yLno7XHJcbiAgICB9XHJcblxyXG4gICAgLyogTm9ybWFsaXplIGFsbCB2ZXJ0ZXggbm9ybWFscyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IG5vb2ZWOyBpKyspIHtcclxuICAgICAgbGV0IE4gPSBpcGdsLm10aFxyXG4gICAgICAgIC52ZWMzKFZbNiAqIGkgKyAzXSwgVls2ICogaSArIDRdLCBWWzYgKiBpICsgNV0pXHJcbiAgICAgICAgLmdldE5vcm1hbCgpO1xyXG5cclxuICAgICAgVls2ICogaSArIDNdID0gTi54O1xyXG4gICAgICBWWzYgKiBpICsgNF0gPSBOLnk7XHJcbiAgICAgIFZbNiAqIGkgKyA1XSA9IE4uejtcclxuICAgIH1cclxuICB9IC8vIEVuZCBvZiAnYXV0b05vcm1hbHMnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIEVORCBPRiAncHJpbS5qcycgRklMRVxyXG4iLCIvL1xyXG4vLyBzaGQuanNcclxuLy9cclxuLy8gICAgICBDb3B5cmlnaHQgKEMpIENHU0cgb2YgUE1MMzAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vXHJcbi8vIFNoYWRlciBtb2R1bGUuXHJcbi8vXHJcblxyXG4vLyBUZXh0IGZvciBkZWZhdWx0IHZlcnRleCBzaGFkZXJcclxuY29uc3QgZGVmdnN0eHQgPSBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuI2xpbmUgMTJcclxuXHJcbi8qbGF5b3V0KGxvY2F0aW9uID0gMCkqLyBpbiB2ZWMzIEluUG9zaXRpb247XHJcbi8qbGF5b3V0KGxvY2F0aW9uID0gMSkqLyBpbiB2ZWMzIEluTm9ybWFsO1xyXG5cclxub3V0IHZlYzQgRHJhd0NvbG9yOyAgIFxyXG5vdXQgdmVjMyBEcmF3Tm9ybWFsO1xyXG5vdXQgdmVjMyBEcmF3UG9zaXRpb247IFxyXG5cclxudW5pZm9ybSBtYXQ0IE1hdHJXVlA7XHJcbnVuaWZvcm0gbWF0NCBNYXRyV0ludjtcclxudW5pZm9ybSBtYXQ0IE1hdHJXO1xyXG5cclxudm9pZCBtYWluKCB2b2lkIClcclxue1xyXG4gIGdsX1Bvc2l0aW9uID0gKE1hdHJXVlAgKiB2ZWM0KEluUG9zaXRpb24sIDEuMCkpOyBcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIC8vZ2xfUG9zaXRpb24gPSAvL21hdDQoMS40MTQsIC0wLjgxNiwgLTAuNTc3LCAtMC41NzcsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAwLjAsICAxLjYzMiwgLTAuNTc3LCAtMC41NzcsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAtMS40MTQsIC0wLjgxNiwgLTAuNTc3LCAtMC41NzcsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgIDAuMCwgICAgIDAuMCwgICAtOC44LCAgIC04LjYpICogdmVjNChJblBvc2l0aW9uLCAxLjApO1xyXG4gIERyYXdDb2xvciA9IHZlYzQoMS4wLCAxLjAsIDAuMCwgMS4wKTtcclxuICBEcmF3Tm9ybWFsID0gbWF0MyhNYXRyV0ludikgKiBJbk5vcm1hbDtcclxuICBEcmF3UG9zaXRpb24gPSB2ZWMzKE1hdHJXICogdmVjNChJblBvc2l0aW9uLCAxLjApKTtcclxufVxyXG5gO1xyXG5cclxuLy8gVGV4dCBmb3IgZGVmYXVsdCBmcmFnbWVudCBzaGFkZXJcclxuY29uc3QgZGVmZnN0eHQgPSBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuI2xpbmUgNDJcclxuXHJcbmluIHZlYzQgRHJhd0NvbG9yOyAgIFxyXG5pbiB2ZWMzIERyYXdOb3JtYWw7XHJcbmluIHZlYzMgRHJhd1Bvc2l0aW9uOyBcclxuXHJcbm91dCB2ZWM0IE91dENvbG9yO1xyXG5cclxuI2lmIDBcclxudm9pZCBtYWluKCB2b2lkIClcclxue1xyXG4gIHZlYzMgTCA9IG5vcm1hbGl6ZSh2ZWMzKC0xLCAtMSwgLTEpKTtcclxuICB2ZWMzIE4gPSBub3JtYWxpemUoRHJhd05vcm1hbCk7XHJcblxyXG4gIE4gPSBmYWNlZm9yd2FyZChOLCBMLCBOKTtcclxuXHJcbiAgZmxvYXQgayA9IGRvdChMLCBub3JtYWxpemUoTikpO1xyXG5cclxuICB2ZWMzIGNvbG9yID0gayAqIHZlYzMoMCwgMC43ZiwgMC42Zik7XHJcbiAgLy92ZWMzIFIsIFYgPSB2ZWMzKDAsIDAsIC0xKTtcclxuXHJcbiAgLy9SID0gcmVmbGVjdChWLCBOKTtcclxuICAvL2NvbG9yICs9IHZlYzMoMC4yZikgKiBtYXgoMC4wMWYsIHBvdyhkb3QoUiwgTCksIDEwLjBmKSk7XHJcblxyXG4gIC8vT3V0Q29sb3IgPSB2ZWM0KGNvbG9yLCAxLjBmKTtcclxuICBPdXRDb2xvciA9IHZlYzQoTiwgMS4wKTtcclxufVxyXG4jZW5kaWZcclxudm9pZCBtYWluKCB2b2lkIClcclxue1xyXG4gIHZlYzMgTCA9IHZlYzMoMiwgMSwgMyk7XHJcbiAgdmVjMyBOID0gbm9ybWFsaXplKGZhY2Vmb3J3YXJkKERyYXdOb3JtYWwsIC1MLCBEcmF3Tm9ybWFsKSk7XHJcblxyXG4gIGZsb2F0IGsgPSBkb3QoTiwgbm9ybWFsaXplKEwpKTtcclxuICB2ZWMzIGNvbG9yID0gdmVjMygxLjAsIDAuODI5LCAwLjgyOSkgKiAwLjI7XHJcbiAgY29sb3IgKz0gdmVjMygxLjAsIDAuODI5LCAwLjgyOSkgKiBrICogMC44O1xyXG4gIE91dENvbG9yID0gdmVjNChjb2xvciwgMS4wKTtcclxufVxyXG5gO1xyXG5cclxuLy8gTG9hZCBhbmQgY29tcGlsZSBzaGFkZXIgZnVuY3Rpb25cclxuZnVuY3Rpb24gbG9hZFNoYWRlcihnbCwgc2hhZGVyVHlwZSwgc2hhZGVyU291cmNlKSB7XHJcbiAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHNoYWRlclR5cGUpO1xyXG5cclxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzaGFkZXJTb3VyY2UpO1xyXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcclxuXHJcbiAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpXHJcbiAgICBjb25zb2xlLmxvZyhcIlNoYWRlciBjb21waWxlIGZhaWw6IFwiICsgZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcclxuXHJcbiAgcmV0dXJuIHNoYWRlcjtcclxufSAvLyBFbmQgb2YgJ2xvYWRTaGFkZXInIGZ1bmN0aW9uXHJcblxyXG4vLyBTaGFkZXIgY2xhc3NcclxuZXhwb3J0IGNsYXNzIF9zaGFkZXIge1xyXG4gIGNvbnN0cnVjdG9yKGdsKSB7XHJcbiAgICB0aGlzLnZzID0gbG9hZFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgZGVmdnN0eHQpO1xyXG4gICAgdGhpcy5mcyA9IGxvYWRTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgZGVmZnN0eHQpO1xyXG4gICAgdGhpcy5wcmcgPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcblxyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJnLCB0aGlzLnZzKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLnByZywgdGhpcy5mcyk7XHJcbiAgICBnbC5saW5rUHJvZ3JhbSh0aGlzLnByZyk7XHJcblxyXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJnLCBnbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgbGV0IGJ1ZiA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJnKTtcclxuICAgICAgY29uc29sZS5sb2coXCJTaGFkZXIgcHJvZ3JhbSBsaW5rIGZhaWw6IFwiICsgYnVmKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLk1hdHJXVlBMb2MgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcmcsIFwiTWF0cldWUFwiKTtcclxuICAgIHRoaXMuTWF0cldMb2MgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcmcsIFwiTWF0cldcIik7XHJcbiAgICB0aGlzLk1hdHJXSW52TG9jID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJnLCBcIk1hdHJXSW52XCIpO1xyXG4gIH0gLy8gRW5kIG9mIGNvbnN0cnVjdG9yXHJcbn0gLy8gRW5kIG9mICdTaGFkZXInIGNsYXNzXHJcblxyXG4vLyBHZXQgc2hhZGVyIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFkZXIoZ2wpIHtcclxuICByZXR1cm4gbmV3IF9zaGFkZXIoZ2wpO1xyXG59IC8vIEVuZCBvZiAnc2hhZGVyJyBmdW5jdGlvblxyXG5cclxuLyogb2xkIHJlbmRlclxyXG5jbGFzcyBfc2hhZGVyIHtcclxuICBjb25zdHJ1Y3RvcihnbCwgbmFtZSkge1xyXG4gICAgdGhpcy5faW5pdChuYW1lKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIF9pbml0KGdsLCBuYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5zaGFkZXJzID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogZ2wuRlJBR01FTlRfU0hBREVSLFxyXG4gICAgICB9LFxyXG4gICAgICB7fSxcclxuICAgIF07XHJcblxyXG4gICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2hhZGVycykge1xyXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImJpbi9zaGFkZXJzLyR7bmFtZX0vJHtzLm5hbWV9Lmdsc2xcIik7XHJcbiAgICAgIGxldCBzcmMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygc3JjID09IFwic3RyaW5nXCIgJiYgc3JjICE9IFwiXCIpIHMuc3JjID0gc3JjO1xyXG4gICAgfVxyXG4gICAgLy8gcmVjb21waWxlIHNoYWRlcnNcclxuICB9XHJcbn0gKi9cclxuXHJcbi8vIEVORCBPRiAnc2hkLmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIHJlcy5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gUmVzb3VyY2UgbW9kdWxlLlxyXG4vL1xyXG5cclxuLy8gSW1wb3J0XHJcbmltcG9ydCAqIGFzIHByaW0gZnJvbSBcIi4vcHJpbS9wcmltLmpzXCI7XHJcbmltcG9ydCAqIGFzIHNoZCBmcm9tIFwiLi9zaGFkZXIvc2hkLmpzXCI7XHJcblxyXG4vLyBFeHBvcnRcclxuZXhwb3J0ICogYXMgcHJpbSBmcm9tIFwiLi9wcmltL3ByaW0uanNcIjtcclxuZXhwb3J0ICogYXMgc2hkIGZyb20gXCIuL3NoYWRlci9zaGQuanNcIjtcclxuXHJcbi8vIEVORCBPRiAncmVzLmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIHJuZC5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gUmVuZGVyIG1vZHVsZS5cclxuLy9cclxuXHJcbi8vIEltcG9ydFxyXG5pbXBvcnQgKiBhcyBpcGdsIGZyb20gXCIuLy4uLy4uL2luY2x1ZGVzLmpzXCI7XHJcbmltcG9ydCAqIGFzIHJlcyBmcm9tIFwiLi9yZXMvcmVzLmpzXCI7XHJcblxyXG4vLyBFeHBvcnRcclxuZXhwb3J0ICogYXMgcmVzIGZyb20gXCIuL3Jlcy9yZXMuanNcIjtcclxuXHJcbi8vIFByb2plY3QgcGFyYW1ldGVyc1xyXG5leHBvcnQgbGV0IHByb2pTaXplID0gMC4xO1xyXG5leHBvcnQgbGV0IHByb2pEaXN0ID0gMC4xO1xyXG5leHBvcnQgbGV0IHByb2pGYXJDbGlwID0gMzAwO1xyXG5cclxuLy8gUmVuZGVyIGNsYXNzXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXIge1xyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgY29uc3RydWN0b3IoY2FudmFzaWQpIHtcclxuICAgIHRoaXMuaGFuZGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzaWQpO1xyXG4gICAgdGhpcy5nbCA9IHRoaXMuaGFuZGxlLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbiAgICBpZiAodGhpcy5nbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGFsZXJ0KFxyXG4gICAgICAgIFwiRXJyb3IgR0wwMDQ3IVxcbldlYkdMIDIuMCBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3NlciFcXG5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgdmlzaXQgaHR0cHM6Ly9zY2hvb2wzMC5zcGIucnUvY2dzZy9cIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbC5jbGVhckNvbG9yKDAuMywgMC40NywgMC44LCAxKTtcclxuICAgIHRoaXMudyA9IHRoaXMuaGFuZGxlLndpZHRoO1xyXG4gICAgdGhpcy5oID0gdGhpcy5oYW5kbGUuaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMubWF0clZQID0gaXBnbC5tdGgubWF0NCgpO1xyXG4gICAgdGhpcy5tYXRyUHJvaiA9IGlwZ2wubXRoLm1hdDQoKTtcclxuICAgIHRoaXMubWF0clZpZXcgPSBpcGdsLm10aC5tYXQ0KCk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGRlZmF1bHQgc2hhZGVyXHJcbiAgICB0aGlzLnNoYWRlciA9IHJlcy5zaGQuc2hhZGVyKHRoaXMuZ2wpO1xyXG4gICAgdGhpcy5zaGRwcmcgPSB0aGlzLnNoYWRlci5wcmc7XHJcblxyXG4gICAgdGhpcy5wcm9qU2V0KCk7XHJcbiAgICB0aGlzLmNhbVNldChcclxuICAgICAgaXBnbC5tdGgudmVjMyg1LCA1LCA1KSxcclxuICAgICAgaXBnbC5tdGgudmVjMygwLCAwLCAwKSxcclxuICAgICAgaXBnbC5tdGgudmVjMygwLCAxLCAwKVxyXG4gICAgKTtcclxuICB9IC8vIEVuZCBvZiBjb25zdHJ1Y3RvclxyXG5cclxuICAvLyBSZW5kZXIgc3RhcnQgZnVuY3Rpb25cclxuICBzdGFydCgpIHtcclxuICAgIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuICB9IC8vIEVuZCBvZiAnc3RhcnQnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFJlbmRlciBlbmQgZnVuY3Rpb25cclxuICBlbmQoKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSAvLyBFbmQgb2YgJ2VuZCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gU2V0IGNhbWVyYSBmdW5jdGlvblxyXG4gIGNhbVNldChMb2MsIEF0LCBVcCkge1xyXG4gICAgdGhpcy5tYXRyVmlldyA9IGlwZ2wubXRoLm1hdDQoKTtcclxuICAgIHRoaXMubWF0clZpZXcudmlldyhMb2MsIEF0LCBVcCk7XHJcbiAgICB0aGlzLm1hdHJWUCA9IHRoaXMubWF0clZpZXcubXVsKHRoaXMubWF0clByb2opO1xyXG4gICAgLy90aGlzLm1hdHJWUCA9IHRoaXMubWF0clByb2oubXVsKHRoaXMubWF0clZpZXcpO1xyXG5cclxuICAgIHRoaXMuY2FtUmlnaHQgPSBpcGdsLm10aC52ZWMzKFxyXG4gICAgICB0aGlzLm1hdHJWaWV3LmFbMF1bMF0sXHJcbiAgICAgIHRoaXMubWF0clZpZXcuYVsxXVswXSxcclxuICAgICAgdGhpcy5tYXRyVmlldy5hWzJdWzBdXHJcbiAgICApO1xyXG4gICAgdGhpcy5jYW1VcCA9IGlwZ2wubXRoLnZlYzMoXHJcbiAgICAgIHRoaXMubWF0clZpZXcuYVswXVsxXSxcclxuICAgICAgdGhpcy5tYXRyVmlldy5hWzFdWzFdLFxyXG4gICAgICB0aGlzLm1hdHJWaWV3LmFbMl1bMV1cclxuICAgICk7XHJcbiAgICB0aGlzLmNhbURpciA9IGlwZ2wubXRoLnZlYzMoXHJcbiAgICAgIC10aGlzLm1hdHJWaWV3LmFbMF1bMl0sXHJcbiAgICAgIC10aGlzLm1hdHJWaWV3LmFbMV1bMl0sXHJcbiAgICAgIC10aGlzLm1hdHJWaWV3LmFbMl1bMl1cclxuICAgICk7XHJcbiAgICB0aGlzLmNhbUxvYyA9IExvYztcclxuICAgIHRoaXMuY2FtQXQgPSBBdDtcclxuXHJcbiAgICByZXR1cm47XHJcbiAgfSAvLyBFbmQgb2YgJ2NhbVNldCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gU2V0IHByb2plY3QgbWF0cml4IGZ1bmN0aW9uXHJcbiAgcHJvalNldCgpIHtcclxuICAgIGxldCByeCwgcnk7XHJcblxyXG4gICAgcnggPSBwcm9qU2l6ZTtcclxuICAgIHJ5ID0gcHJvalNpemU7XHJcblxyXG4gICAgaWYgKHRoaXMudyA+PSB0aGlzLmgpIHtcclxuICAgICAgcnggKj0gdGhpcy53IC8gdGhpcy5oO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcnkgKj0gdGhpcy5oIC8gdGhpcy53O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF0clByb2ogPSBpcGdsLm10aC5tYXQ0KCk7XHJcbiAgICB0aGlzLm1hdHJQcm9qLmZydXN0dW0oXHJcbiAgICAgIC1yeCAvIDIsXHJcbiAgICAgIHJ4IC8gMixcclxuICAgICAgLXJ5IC8gMixcclxuICAgICAgcnkgLyAyLFxyXG4gICAgICBwcm9qRGlzdCxcclxuICAgICAgcHJvakZhckNsaXBcclxuICAgICk7XHJcbiAgICB0aGlzLm1hdHJWUCA9IHRoaXMubWF0clZpZXcubXVsKHRoaXMubWF0clByb2opO1xyXG4gIH0gLy8gRW5kIG9mICdwcm9qU2V0JyBmdW5jdGlvblxyXG59IC8vIEVuZCBvZiAnUmVuZGVyJyBjbGFzc1xyXG5cclxuLy8gRU5EIE9GICdybmQuanMnIEZJTEVcclxuIiwiLy9cclxuLy8gdGltZXIuanNcclxuLy9cclxuLy8gICAgICBDb3B5cmlnaHQgKEMpIENHU0cgb2YgUE1MMzAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vXHJcbi8vIFRpbWVyIG1vZHVsZS5cclxuLy9cclxuXHJcbi8vIFRpbWVyIGNsYXNzXHJcbmV4cG9ydCBjbGFzcyBUaW1lciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBUaW1lciBvYnRhaW4gY3VycmVudCB0aW1lIGluIHNlY29uZHMgbWV0aG9kXHJcbiAgICBjb25zdCBnZXRUaW1lID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgbGV0IHQgPVxyXG4gICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwLjAgK1xyXG4gICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcclxuICAgICAgICBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwO1xyXG4gICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gVGltZXIgcmVzcG9uc2UgbWV0aG9kXHJcbiAgICB0aGlzLnJlc3BvbnNlID0gKHRhZ19pZCA9IG51bGwpID0+IHtcclxuICAgICAgbGV0IHQgPSBnZXRUaW1lKCk7XHJcbiAgICAgIC8vIEdsb2JhbCB0aW1lXHJcbiAgICAgIHRoaXMuZ2xvYmFsVGltZSA9IHQ7XHJcbiAgICAgIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdCAtIHRoaXMub2xkVGltZTtcclxuICAgICAgLy8gVGltZSB3aXRoIHBhdXNlXHJcbiAgICAgIGlmICh0aGlzLmlzUGF1c2UpIHtcclxuICAgICAgICB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnBhdXNlVGltZSArPSB0IC0gdGhpcy5vbGRUaW1lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSB0aGlzLmdsb2JhbERlbHRhVGltZTtcclxuICAgICAgICB0aGlzLmxvY2FsVGltZSA9IHQgLSB0aGlzLnBhdXNlVGltZSAtIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEZQU1xyXG4gICAgICB0aGlzLmZyYW1lQ291bnRlcisrO1xyXG4gICAgICBpZiAodCAtIHRoaXMub2xkVGltZUZQUyA+IDMpIHtcclxuICAgICAgICB0aGlzLkZQUyA9IHRoaXMuZnJhbWVDb3VudGVyIC8gKHQgLSB0aGlzLm9sZFRpbWVGUFMpO1xyXG4gICAgICAgIHRoaXMub2xkVGltZUZQUyA9IHQ7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGlmICh0YWdfaWQgIT0gbnVsbClcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhZ19pZCkuaW5uZXJIVE1MID0gdGhpcy5nZXRGUFMoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9sZFRpbWUgPSB0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPYnRhaW4gRlBTIGFzIHN0cmluZyBtZXRob2RcclxuICAgIHRoaXMuZ2V0RlBTID0gKCkgPT4gdGhpcy5GUFMudG9GaXhlZCgzKTtcclxuXHJcbiAgICAvLyBGaWxsIHRpbWVyIGdsb2JhbCBkYXRhXHJcbiAgICB0aGlzLmdsb2JhbFRpbWUgPSB0aGlzLmxvY2FsVGltZSA9IGdldFRpbWUoKTtcclxuICAgIHRoaXMuZ2xvYmFsRGVsdGFUaW1lID0gdGhpcy5sb2NhbERlbHRhVGltZSA9IDA7XHJcblxyXG4gICAgLy8gRmlsbCB0aW1lciBzZW1pIGdsb2JhbCBkYXRhXHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMub2xkVGltZSA9IHRoaXMub2xkVGltZUZQUyA9IHRoaXMuZ2xvYmFsVGltZTtcclxuICAgIHRoaXMuZnJhbWVDb3VudGVyID0gMDtcclxuICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5GUFMgPSAzMC4wO1xyXG4gICAgdGhpcy5wYXVzZVRpbWUgPSAwO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufSAvLyBFbmQgb2YgJ1RpbWVyJyBmdW5jdGlvblxyXG5cclxuLy8gRU5EIE9GICd0aW1lci5qcycgRklMRVxyXG4iLCIvL1xyXG4vLyBwbGF0LmpzXHJcbi8vXHJcbi8vICAgICAgQ29weXJpZ2h0IChDKSBDR1NHIG9mIFBNTDMwLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vL1xyXG4vLyBQbGF0b24gbW9kdWxlLlxyXG4vL1xyXG5cclxuLy8gR2V0IGljb3NhZWRyIFYgYXJyYXlcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEljb1YoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIDEuMCwgLTAuNSwgMC4wLCAwLjc5NDY1NCwgLTAuMTg3NTkyLCAwLjU3NzM1LCAwLjgwOTAxNywgMC41LCAwLjU4Nzc4NSxcclxuICAgIDAuNzk0NjU0LCAtMC4xODc1OTIsIDAuNTc3MzUsIDAuMzA5MDE3LCAtMC41LCAwLjk1MTA1NywgMC43OTQ2NTQsIC0wLjE4NzU5MixcclxuICAgIDAuNTc3MzUsIC0wLjMwOTAxNywgMC41LCAwLjk1MTA1NywgMC43OTQ2NTQsIC0wLjE4NzU5MiwgLTAuNTc3MzUsIC0wLjgwOTAxNyxcclxuICAgIC0wLjUsIDAuNTg3Nzg1LCAwLjc5NDY1NCwgLTAuMTg3NTkyLCAtMC41NzczNSwgLTEuMCwgMC41LCAwLjAsIDAuNzk0NjU0LFxyXG4gICAgLTAuMTg3NTkyLCAtMC41NzczNSwgLTAuODA5MDE3LCAtMC41LCAtMC41ODc3ODUsIC0wLjMwMzUzMSwgLTAuMTg3NTkyLFxyXG4gICAgLTAuOTM0MTcyLCAtMC4zMDkwMTcsIDAuNSwgLTAuOTUxMDU3LCAtMC4zMDM1MzEsIC0wLjE4NzU5MiwgLTAuOTM0MTcyLFxyXG4gICAgMC4zMDkwMTcsIC0wLjUsIC0wLjk1MTA1NywgLTAuMzAzNTMxLCAtMC4xODc1OTIsIC0wLjkzNDE3MiwgMC44MDkwMTcsIDAuNSxcclxuICAgIC0wLjU4Nzc4NSwgLTAuOTgyMjQ3LCAtMC4xODc1OTIsIDAuMCwgMS4wLCAtMC41LCAwLjAsIC0wLjk4MjI0NywgLTAuMTg3NTkyLFxyXG4gICAgMC4wLCAwLjgwOTAxNywgMC41LCAwLjU4Nzc4NSwgLTAuOTgyMjQ3LCAtMC4xODc1OTIsIDAuMCwgMC4zMDkwMTcsIC0wLjUsXHJcbiAgICAwLjk1MTA1NywgLTAuMzAzNTMxLCAtMC4xODc1OTIsIDAuOTM0MTcyLCAtMC4zMDkwMTcsIDAuNSwgMC45NTEwNTcsXHJcbiAgICAtMC4zMDM1MzEsIC0wLjE4NzU5MiwgMC45MzQxNzIsIC0wLjgwOTAxNywgLTAuNSwgMC41ODc3ODUsIC0wLjMwMzUzMSxcclxuICAgIC0wLjE4NzU5MiwgMC45MzQxNzIsIC0xLjAsIDAuNSwgMC4wLCAwLjc5NDY1NCwgLTAuMTg3NTkyLCAwLjU3NzM1LFxyXG4gICAgLTAuODA5MDE3LCAtMC41LCAtMC41ODc3ODUsIDAuNzk0NjU0LCAtMC4xODc1OTIsIDAuNTc3MzUsIC0wLjMwOTAxNywgMC41LFxyXG4gICAgLTAuOTUxMDU3LCAwLjc5NDY1NCwgLTAuMTg3NTkyLCAwLjU3NzM1LCAwLjMwOTAxNywgLTAuNSwgLTAuOTUxMDU3LFxyXG4gICAgMC43OTQ2NTQsIC0wLjE4NzU5MiwgLTAuNTc3MzUsIDAuODA5MDE3LCAwLjUsIC0wLjU4Nzc4NSwgMC43OTQ2NTQsXHJcbiAgICAtMC4xODc1OTIsIC0wLjU3NzM1LCAxLjAsIC0wLjUsIDAuMCwgMC43OTQ2NTQsIC0wLjE4NzU5MiwgLTAuNTc3MzUsXHJcbiAgICAwLjgwOTAxNywgMC41LCAwLjU4Nzc4NSwgLTAuMzAzNTMxLCAtMC4xODc1OTIsIC0wLjkzNDE3MiwgMC4zMDkwMTcsIC0wLjUsXHJcbiAgICAwLjk1MTA1NywgLTAuMzAzNTMxLCAtMC4xODc1OTIsIC0wLjkzNDE3MiwgLTAuMzA5MDE3LCAwLjUsIDAuOTUxMDU3LFxyXG4gICAgLTAuMzAzNTMxLCAtMC4xODc1OTIsIC0wLjkzNDE3MiwgLTAuODA5MDE3LCAtMC41LCAwLjU4Nzc4NSwgLTAuOTgyMjQ3LFxyXG4gICAgLTAuMTg3NTkyLCAtMC4wLCAtMS4wLCAwLjUsIDAuMCwgLTAuOTgyMjQ3LCAtMC4xODc1OTIsIC0wLjAsIC0wLjgwOTAxNyxcclxuICAgIC0wLjUsIC0wLjU4Nzc4NSwgLTAuOTgyMjQ3LCAtMC4xODc1OTIsIC0wLjAsIC0wLjMwOTAxNywgMC41LCAtMC45NTEwNTcsXHJcbiAgICAtMC4zMDM1MzEsIC0wLjE4NzU5MiwgMC45MzQxNzIsIDAuMzA5MDE3LCAtMC41LCAtMC45NTEwNTcsIC0wLjMwMzUzMSxcclxuICAgIC0wLjE4NzU5MiwgMC45MzQxNzIsIDAuODA5MDE3LCAwLjUsIC0wLjU4Nzc4NSwgLTAuMzAzNTMxLCAtMC4xODc1OTIsXHJcbiAgICAwLjkzNDE3MiwgMS4wLCAtMC41LCAwLjAsIDAuNDkxMTIzLCAtMC43OTQ2NTQsIDAuMzU2ODIyLCAwLjgwOTAxNywgMC41LFxyXG4gICAgMC41ODc3ODUsIC0wLjE4NzU5MiwgLTAuNzk0NjU0LCAtMC41NzczNSwgMC4zMDkwMTcsIC0wLjUsIDAuOTUxMDU3LFxyXG4gICAgMC40OTExMjMsIC0wLjc5NDY1NCwgMC4zNTY4MjIsIC0wLjMwOTAxNywgMC41LCAwLjk1MTA1NywgLTAuMTg3NTkyLFxyXG4gICAgLTAuNzk0NjU0LCAtMC41NzczNSwgLTAuODA5MDE3LCAtMC41LCAwLjU4Nzc4NSwgLTAuNjA3MDYyLCAtMC43OTQ2NTQsIC0wLjAsXHJcbiAgICAtMS4wLCAwLjUsIDAuMCwgMC40OTExMjMsIC0wLjc5NDY1NCwgMC4zNTY4MjIsIC0wLjgwOTAxNywgLTAuNSwgLTAuNTg3Nzg1LFxyXG4gICAgLTAuNjA3MDYyLCAtMC43OTQ2NTQsIC0wLjAsIC0wLjMwOTAxNywgMC41LCAtMC45NTEwNTcsIDAuNDkxMTIzLCAtMC43OTQ2NTQsXHJcbiAgICAwLjM1NjgyMiwgMC4zMDkwMTcsIC0wLjUsIC0wLjk1MTA1NywgMC40OTExMjMsIC0wLjc5NDY1NCwgLTAuMzU2ODIyLFxyXG4gICAgMC44MDkwMTcsIDAuNSwgLTAuNTg3Nzg1LCAtMC42MDcwNjIsIC0wLjc5NDY1NCwgMC4wLCAxLjAsIC0wLjUsIDAuMCxcclxuICAgIDAuNDkxMTIzLCAtMC43OTQ2NTQsIC0wLjM1NjgyMiwgMC44MDkwMTcsIDAuNSwgMC41ODc3ODUsIC0wLjYwNzA2MixcclxuICAgIC0wLjc5NDY1NCwgMC4wLCAwLjMwOTAxNywgLTAuNSwgMC45NTEwNTcsIC0wLjE4NzU5MiwgLTAuNzk0NjU0LCAwLjU3NzM1LFxyXG4gICAgLTAuMzA5MDE3LCAwLjUsIDAuOTUxMDU3LCAwLjQ5MTEyMywgLTAuNzk0NjU0LCAtMC4zNTY4MjIsIC0wLjgwOTAxNywgLTAuNSxcclxuICAgIDAuNTg3Nzg1LCAtMC4xODc1OTIsIC0wLjc5NDY1NCwgMC41NzczNSwgLTEuMCwgMC41LCAwLjAsIDAuNDkxMTIzLFxyXG4gICAgLTAuNzk0NjU0LCAtMC4zNTY4MjIsIC0wLjgwOTAxNywgLTAuNSwgLTAuNTg3Nzg1LCAtMC4xODc1OTIsIC0wLjc5NDY1NCxcclxuICAgIC0wLjU3NzM1LCAtMC4zMDkwMTcsIDAuNSwgLTAuOTUxMDU3LCAtMC4xODc1OTIsIC0wLjc5NDY1NCwgMC41NzczNSxcclxuICAgIDAuMzA5MDE3LCAtMC41LCAtMC45NTEwNTcsIC0wLjE4NzU5MiwgLTAuNzk0NjU0LCAtMC41NzczNSwgMC44MDkwMTcsIDAuNSxcclxuICAgIC0wLjU4Nzc4NSwgLTAuMTg3NTkyLCAtMC43OTQ2NTQsIDAuNTc3MzUsIDAuMCwgMS4xMTgwMzQsIDAuMCwgLTAuMTg3NTkyLFxyXG4gICAgLTAuNzk0NjU0LCAtMC41NzczNSwgMC4wLCAxLjExODAzNCwgMC4wLCAwLjQ5MTEyMywgLTAuNzk0NjU0LCAwLjM1NjgyMiwgMC4wLFxyXG4gICAgMS4xMTgwMzQsIDAuMCwgLTAuNjA3MDYyLCAtMC43OTQ2NTQsIDAuMCwgMC4wLCAxLjExODAzNCwgMC4wLCAwLjQ5MTEyMyxcclxuICAgIC0wLjc5NDY1NCwgLTAuMzU2ODIyLCAwLjAsIDEuMTE4MDM0LCAwLjAsIC0wLjE4NzU5MiwgLTAuNzk0NjU0LCAwLjU3NzM1LFxyXG4gICAgMC4wLCAtMS4xMTgwMzQsIDAuMCwgMC40OTExMjMsIC0wLjc5NDY1NCwgMC4zNTY4MjIsIDAuMCwgLTEuMTE4MDM0LCAwLjAsXHJcbiAgICAtMC42MDcwNjIsIC0wLjc5NDY1NCwgLTAuMCwgMC4wLCAtMS4xMTgwMzQsIDAuMCwgMC40OTExMjMsIC0wLjc5NDY1NCxcclxuICAgIC0wLjM1NjgyMiwgMC4wLCAtMS4xMTgwMzQsIDAuMCwgLTAuMTg3NTkyLCAtMC43OTQ2NTQsIDAuNTc3MzUsIDAuMCxcclxuICAgIC0xLjExODAzNCwgMC4wLCAtMC4xODc1OTIsIC0wLjc5NDY1NCwgLTAuNTc3MzUsXHJcbiAgXTtcclxufVxyXG5cclxuLy8gR2V0IGljb3NhZWRyIElcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEljb0koKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIDAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCxcclxuICAgIDIxLCAyMiwgMjMsIDI0LCAyNSwgMjYsIDI3LCAyOCwgMjksIDMwLCAzMiwgNTUsIDM0LCAzNiwgNTYsIDM4LCA0MCwgNTcsIDQyLFxyXG4gICAgNDQsIDU4LCA0NiwgNDgsIDU5LCAzMSwgMzMsIDUwLCAzNSwgMzcsIDUxLCAzOSwgNDEsIDUyLCA0MywgNDUsIDUzLCA0NywgNDksXHJcbiAgICA1NCxcclxuICBdO1xyXG59XHJcblxyXG4vLyBHZXQgZG9kZWNhZWRyIFZcclxuZXhwb3J0IGZ1bmN0aW9uIGdldERlY1YoKSB7XHJcbiAgY29uc3QgViA9IG5ldyBnZXRJY29WKCk7XHJcbiAgY29uc3QgSSA9IG5ldyBnZXRJY29JKCk7XHJcblxyXG4gIGxldCBWMSA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDYwOyBpICs9IDMpIHtcclxuICAgIGNvbnN0IFMxID0gVls2ICogSVtpXV07XHJcbiAgICBjb25zdCBTMiA9IFZbNiAqIElbaV0gKyAxXTtcclxuICAgIGNvbnN0IFMzID0gVls2ICogSVtpXSArIDJdO1xyXG4gICAgY29uc3QgUzQgPSBWWzYgKiBJW2kgKyAxXV07XHJcbiAgICBjb25zdCBTNSA9IFZbNiAqIElbaSArIDFdICsgMV07XHJcbiAgICBjb25zdCBTNiA9IFZbNiAqIElbaSArIDFdICsgMl07XHJcbiAgICBjb25zdCBTNyA9IFZbNiAqIElbaSArIDJdXTtcclxuICAgIGNvbnN0IFM4ID0gVls2ICogSVtpICsgMl0gKyAxXTtcclxuICAgIGNvbnN0IFM5ID0gVls2ICogSVtpICsgMl0gKyAyXTtcclxuXHJcbiAgICBjb25zdCBTMTAgPSAoUzEgKyBTNCArIFM3KSAvIDM7XHJcbiAgICBjb25zdCBTMTEgPSAoUzIgKyBTNSArIFM4KSAvIDM7XHJcbiAgICBjb25zdCBTMTIgPSAoUzMgKyBTNiArIFM5KSAvIDM7XHJcblxyXG4gICAgVjEucHVzaChTMTApO1xyXG4gICAgVjEucHVzaChTMTEpO1xyXG4gICAgVjEucHVzaChTMTIpO1xyXG4gICAgVjEucHVzaCgwKTtcclxuICAgIFYxLnB1c2goMCk7XHJcbiAgICBWMS5wdXNoKDApO1xyXG5cclxuICAgIFYxLnB1c2goUzEwKTtcclxuICAgIFYxLnB1c2goUzExKTtcclxuICAgIFYxLnB1c2goUzEyKTtcclxuICAgIFYxLnB1c2goMCk7XHJcbiAgICBWMS5wdXNoKDApO1xyXG4gICAgVjEucHVzaCgwKTtcclxuXHJcbiAgICBWMS5wdXNoKFMxMCk7XHJcbiAgICBWMS5wdXNoKFMxMSk7XHJcbiAgICBWMS5wdXNoKFMxMik7XHJcbiAgICBWMS5wdXNoKDApO1xyXG4gICAgVjEucHVzaCgwKTtcclxuICAgIFYxLnB1c2goMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gVjE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWNvSSgpIHtcclxuICBsZXQgUyA9IFtdO1xyXG4gIGxldCBBLCBCLCBDLCBELCBFO1xyXG5cclxuICBsZXQgSSA9IFtcclxuICAgIDEsIDE4LCAxNSwgMSwgMTUsIDcsIDEsIDcsIDQsIDEzLCA0LCA3LCAxMywgNywgMCwgMTMsIDAsIDEwLCAzLCAwLCAxMCwgMyxcclxuICAgIDEwLCAxMiwgMywgMTIsIDYsIDEyLCA2LCA5LCAxMiwgOSwgMiwgMTIsIDIsIDE0LCAxMSwgMTQsIDIsIDExLCAyLCA1LCAxMSwgNSxcclxuICAgIDgsIDgsIDEsIDQsIDgsIDQsIDEzLCA4LCAxMywgMTEsIDExLCAxNCwgMTIsIDExLCAxMiwgMTAsIDExLCAxMCwgMTMsIDAsIDcsXHJcbiAgICAxNSwgMCwgMTUsIDE3LCAwLCAxNywgMywgNiwgMywgMTcsIDYsIDE3LCAxOSwgNiwgMTksIDksIDIsIDksIDE5LCAyLCAxOSwgMTYsXHJcbiAgICAyLCAxNiwgNSwgMSwgOCwgNSwgMSwgNSwgMTYsIDEsIDE2LCAxOCwgMTgsIDE2LCAxOSwgMTgsIDE5LCAxNywgMTgsIDE3LCAxNSxcclxuICBdO1xyXG4gIGxldCBJMU4gPSBbXHJcbiAgICAxLCAxOCwgMTUsIDcsIDQsIDEzLCA0LCA3LCAwLCAxMCwgMywgMCwgMTAsIDEyLCA2LCAxMiwgNiwgOSwgMiwgMTQsIDExLCAxNCxcclxuICAgIDIsIDUsIDgsIDgsIDEsIDQsIDEzLCAxMSwgMTEsIDE0LCAxMiwgMTAsIDEzLCAwLCA3LCAxNSwgMTcsIDMsIDYsIDMsIDE3LCAxOSxcclxuICAgIDksIDIsIDksIDE5LCAxNiwgNSwgMSwgOCwgNSwgMTYsIDE4LCAxOCwgMTYsIDE5LCAxNywgMTUsXHJcbiAgXTtcclxuXHJcbiAgbGV0IE5ld0kgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDg7IGkrKykgU1tpXSA9IDA7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNzA7IGkgKz0gNSkge1xyXG4gICAgbGV0IFMxID0gSTFOW2ldLFxyXG4gICAgICBTMiA9IEkxTltpICsgMV0sXHJcbiAgICAgIFMzID0gSTFOW2kgKyAyXSxcclxuICAgICAgUzQgPSBJMU5baSArIDNdLFxyXG4gICAgICBTNSA9IEkxTltpICsgNF07XHJcblxyXG4gICAgQSA9IFNbUzFdKys7XHJcbiAgICBCID0gU1tTMl0rKztcclxuICAgIEMgPSBTW1MzXSsrO1xyXG4gICAgRCA9IFNbUzRdKys7XHJcbiAgICBFID0gU1tTNV0rKztcclxuXHJcbiAgICBTMSAqPSAzO1xyXG4gICAgUzIgKj0gMztcclxuICAgIFMzICo9IDM7XHJcbiAgICBTNCAqPSAzO1xyXG4gICAgUzUgKj0gMztcclxuXHJcbiAgICBpZiAoQSA9PSAwKTtcclxuICAgIGVsc2UgaWYgKEEgPT0gMSkgKytTMTtcclxuICAgIGVsc2UgaWYgKEEgPT0gMikgUzEgKz0gMjtcclxuXHJcbiAgICBpZiAoQiA9PSAwKTtcclxuICAgIGVsc2UgaWYgKEIgPT0gMSkgKytTMjtcclxuICAgIGVsc2UgaWYgKEIgPT0gMikgUzIgKz0gMjtcclxuXHJcbiAgICBpZiAoQyA9PSAwKTtcclxuICAgIGVsc2UgaWYgKEMgPT0gMSkgKytTMztcclxuICAgIGVsc2UgaWYgKEMgPT0gMikgUzMgKz0gMjtcclxuXHJcbiAgICBpZiAoRCA9PSAwKTtcclxuICAgIGVsc2UgaWYgKEQgPT0gMSkgKytTNDtcclxuICAgIGVsc2UgaWYgKEQgPT0gMikgUzQgKz0gMjtcclxuXHJcbiAgICBpZiAoRSA9PSAwKTtcclxuICAgIGVsc2UgaWYgKEUgPT0gMSkgKytTNTtcclxuICAgIGVsc2UgaWYgKEUgPT0gMikgUzUgKz0gMjtcclxuXHJcbiAgICBOZXdJLnB1c2goUzEpO1xyXG4gICAgTmV3SS5wdXNoKFMyKTtcclxuICAgIE5ld0kucHVzaChTMyk7XHJcbiAgICBOZXdJLnB1c2goUzEpO1xyXG4gICAgTmV3SS5wdXNoKFMzKTtcclxuICAgIE5ld0kucHVzaChTNCk7XHJcbiAgICBOZXdJLnB1c2goUzEpO1xyXG4gICAgTmV3SS5wdXNoKFM0KTtcclxuICAgIE5ld0kucHVzaChTNSk7XHJcbiAgfVxyXG5cclxuICAvL2ZvciAobGV0IEVsZW0gb2YgSSkge1xyXG4gIC8vICBsZXQgUzEgPSBFbGVtICogMztcclxuXHJcbiAgLy8gICBBID0gU1tFbGVtXSsrO1xyXG5cclxuICAvLyAgIGlmIChBID09IDApO1xyXG4gIC8vICAgZWxzZSBpZiAoQSA9PSAxKSArK1MxO1xyXG4gIC8vICAgZWxzZSBpZiAoQSA9PSAyKSBTMSArPSAyO1xyXG4gIC8vXHJcbiAgLy8gIE5ld0kucHVzaChTMSk7XHJcbiAgLy99XHJcblxyXG4gIHJldHVybiBOZXdJO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGV0cmFWKCkge1xyXG4gIHJldHVybiBbXHJcbiAgICAtMSwgLTEsIC0xLCAwLCAwLCAwLCAtMSwgLTEsIC0xLCAwLCAwLCAwLCAtMSwgLTEsIC0xLCAwLCAwLCAwLCAtMSwgMSwgMSwgMCxcclxuICAgIDAsIDAsIC0xLCAxLCAxLCAwLCAwLCAwLCAtMSwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgLTEsIDAsIDAsIDAsIDEsIDEsIC0xLCAwLFxyXG4gICAgMCwgMCwgMSwgMSwgLTEsIDAsIDAsIDAsIDEsIC0xLCAxLCAwLCAwLCAwLCAxLCAtMSwgMSwgMCwgMCwgMCwgMSwgLTEsIDEsIDAsXHJcbiAgICAwLCAwLFxyXG4gIF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXRyYUkoKSB7XHJcbiAgcmV0dXJuIFswLCAzLCA5LCAxLCA0LCA2LCA1LCA3LCAxMCwgMiwgMTEsIDhdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2N0YVYoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIDAsIC0xLCAwLCAwLCAwLCAwLCAtMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgLTEsIDAsIDAsIDAsXHJcblxyXG4gICAgMCwgLTEsIDAsIDAsIDAsIDAsIDAsIDAsIC0xLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLFxyXG5cclxuICAgIDAsIC0xLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLFxyXG5cclxuICAgIDAsIC0xLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAtMSwgMCwgMCwgMCwgMCwgMCxcclxuXHJcbiAgICAwLCAxLCAwLCAwLCAwLCAwLCAtMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgLTEsIDAsIDAsIDAsXHJcblxyXG4gICAgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgLTEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsXHJcblxyXG4gICAgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCxcclxuXHJcbiAgICAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAtMSwgMCwgMCwgMCwgMCwgMCxcclxuICBdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2N0YUkoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIDAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCxcclxuICAgIDIxLCAyMiwgMjMsXHJcbiAgXTtcclxufVxyXG5cclxuLy8gRW5kIG9mICdwbGF0LmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIGFuaW0uanNcclxuLy9cclxuLy8gICAgICBDb3B5cmlnaHQgKEMpIENHU0cgb2YgUE1MMzAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vXHJcbi8vIEFuaW0gbW9kdWxlLlxyXG4vL1xyXG5cclxuLy8gSW1wb3J0XHJcbmltcG9ydCAqIGFzIHJuZCBmcm9tIFwiLi9yZW5kZXIvcm5kLmpzXCI7XHJcbmltcG9ydCAqIGFzIGlwZ2wgZnJvbSBcIi4vLi4vaW5jbHVkZXMuanNcIjtcclxuaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi90aW1lci5qc1wiO1xyXG5pbXBvcnQgeyBnZXREZWNWLCBnZXREZWNvSSwgZ2V0SWNvSSB9IGZyb20gXCIuLi91dGlscy9wbGF0LmpzXCI7XHJcbi8vaW1wb3J0IHsgYWxsb3dlZE5vZGVFbnZpcm9ubWVudEZsYWdzIH0gZnJvbSBcInByb2Nlc3NcIjtcclxuXHJcbi8vIEV4cG9ydFxyXG5leHBvcnQgKiBhcyBybmQgZnJvbSBcIi4vcmVuZGVyL3JuZC5qc1wiO1xyXG5leHBvcnQgeyBUaW1lciB9O1xyXG5cclxuLy8gRGVmYXVsdCBhbmltIHZhcmlhYmxlXHJcbmV4cG9ydCBsZXQgTWFpbkFuaW07XHJcblxyXG4vLyBBbmltIGNsYXNzXHJcbmV4cG9ydCBjbGFzcyBBbmltIHtcclxuICBjb25zdHJ1Y3RvcihjYW52YXNpZCkge1xyXG4gICAgdGhpcy5ybmQgPSBuZXcgcm5kLlJlbmRlcihjYW52YXNpZCk7XHJcbiAgICAvL3RoaXMucm5kLmdsLmRpc2FibGUodGhpcy5ybmQuZ2wuQkxFTkQpO1xyXG4gICAgdGhpcy5ybmQuZ2wuZW5hYmxlKHRoaXMucm5kLmdsLkRFUFRIX1RFU1QpO1xyXG4gICAgdGhpcy50aW1lciA9IG5ldyBUaW1lcigpO1xyXG4gICAgLy90aGlzLnJuZC5nbC5wb2ludFNpemUoNSk7XHJcbiAgfSAvLyBFbmQgb2YgY29uc3RydWN0b3JcclxuXHJcbiAgLy8gQW5pbSByZW5kZXIgZnVuY3Rpb24uXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgdGhpcy5ybmQuc3RhcnQoKTtcclxuICAgIHRoaXMucm5kLmVuZCgpO1xyXG4gICAgdGhpcy50aW1lci5yZXNwb25zZSgpO1xyXG4gIH0gLy8gRW5kIG9mICdyZW5kZXInIGZ1bmN0aW9uXHJcbn0gLy8gRW5kIG9mICdBbmltJyBjbGFzc1xyXG5cclxubGV0IHByaW0sIHByaW0xLCBzaGQsIHByaW0yLCBwcmltMywgcHJpbTQ7XHJcblxyXG4vLyBJbml0IGRlZmF1bHQgYW5pbVxyXG5leHBvcnQgZnVuY3Rpb24gQW5pbUluaXQoKSB7XHJcbiAgLy9sZXQgViA9IFtcclxuICAvLyAgLTEsIC0xLCAtMSwgMSwgNSwgMSwgLTEsIDAsIDEsIDAsIDAsIDAsIDEsIC0xLCAxLCAwLCAwLCAwLCAxLCAtMSwgLTEsIDAsIDAsXHJcbiAgLy8gIDAsIC0xLCAxLCAtMSwgMCwgMCwgMCwgLTEsIDEsIDEsIDAsIDAsIDAsIDEsIDEsIDEsIDAsIDAsIDAsIDEsIDEsIC0xLCAwLCAwLFxyXG4gIC8vICAgMCxcclxuICAvL107XHJcbiAgLy9dO1xyXG5cclxuICBsZXQgViA9IFtcclxuICAgIC0xLjAsIC0xLjAsIC0xLjAsIDAuMCwgLTEuMCwgMC4wLCAtMS4wLCAtMS4wLCAxLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgLTEuMCxcclxuICAgIDEuMCwgMC4wLCAtMS4wLCAwLjAsIDEuMCwgLTEuMCwgLTEuMCwgMC4wLCAtMS4wLCAwLjAsIC0xLjAsIC0xLjAsIC0xLjAsXHJcbiAgICAtMS4wLCAwLjAsIDAuMCwgLTEuMCwgMS4wLCAtMS4wLCAxLjAsIDAuMCwgMC4wLCAtMS4wLCAxLjAsIDEuMCwgLTEuMCwgMC4wLFxyXG4gICAgMC4wLCAtMS4wLCAtMS4wLCAxLjAsIC0xLjAsIDAuMCwgMC4wLCAtMS4wLCAtMS4wLCAtMS4wLCAwLjAsIDAuMCwgMS4wLCAtMS4wLFxyXG4gICAgMS4wLCAtMS4wLCAwLjAsIDAuMCwgLTEuMCwgMS4wLCAxLjAsIC0xLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgLTEuMCwgLTEuMCxcclxuICAgIDAuMCwgMC4wLCAxLjAsIC0xLjAsIC0xLjAsIDEuMCwgMC4wLCAwLjAsIC0xLjAsIDEuMCwgLTEuMCwgMS4wLCAwLjAsIDAuMCxcclxuICAgIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIC0xLjAsIC0xLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgLTEuMCwgMS4wLFxyXG4gICAgLTEuMCwgLTEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAtMS4wLCAxLjAsIC0xLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLFxyXG4gICAgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIC0xLjAsIDEuMCwgMC4wLCAwLjAsIC0xLjAsIDEuMCwgLTEuMCwgMC4wLCAtMS4wLFxyXG4gICAgMC4wLCAtMS4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDEuMCwgMC4wLCAtMS4wLCAwLjAsIDEuMCwgMS4wLFxyXG4gICAgLTEuMCwgMC4wLCAtMS4wLCAwLjAsXHJcbiAgXTtcclxuXHJcbiAgbGV0IEkgPSBbXHJcbiAgICAwLCAxLCAyLCAwLCAzLCAyLCA0LCA1LCA2LCA0LCA3LCA2LCA4LCA5LCAxMCwgOCwgMTEsIDEwLCAxMiwgMTMsIDE0LCAxMiwgMTUsXHJcbiAgICAxNCwgMTYsIDE3LCAxOCwgMTYsIDE5LCAxOCwgMjAsIDIxLCAyMiwgMjAsIDIzLCAyMixcclxuICBdO1xyXG5cclxuICAvL2xldCBWID0gW1xyXG4gIC8vICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIDEsIC0xLCAtMSwgMSwgMSwgLTEsIDEsIDEsIC0xLCAxLCAxLCAtMSwgLTEsXHJcbiAgLy8gIDEsIC0xLCAtMSwgLTEsIDEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcclxuICAvLyAgLTEsIDEsIDEsIC0xLFxyXG4gIC8vXTtcclxuICAvL2xldCBWID0gWy0xLCAtMSwgMCwgMCwgMCwgMCwgMSwgMSwgMCwgMCwgMCwgMCwgMSwgLTEsIDAsIDAsIDAsIDBdO1xyXG4gIC8vbGV0IFYgPSBbXHJcbiAgLy8gIC0xLCAtMSwgMCwgMCwgMCwgMCwgLTEsIDEsIDAsIDAsIDAsIDAsIDEsIDEsIDAsIDAsIDAsIDAsIDEsIC0xLCAwLCAwLCAwLCAwLFxyXG4gIC8vXTtcclxuICAvLy9sZXQgViA9IFstMSwgLTEsIDAsIDAsIDAsIDAsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xyXG4gIC8vbGV0IEkgPSBbMCwgMSwgMl07XHJcblxyXG4gIC8vbGV0IFYgPSBbLTEsIC0xLCAwLCAxLCAxLCAwLCAtMSwgMSwgMF07XHJcblxyXG4gIC8vbGV0IEkgPSBbMCwgMSwgMiwgMCwgMywgMl07XHJcblxyXG4gIE1haW5BbmltID0gbmV3IEFuaW0oXCJBbmltSGFuZGxlXCIpO1xyXG5cclxuICBzaGQgPSBuZXcgcm5kLnJlcy5zaGQuc2hhZGVyKE1haW5BbmltLnJuZC5nbCk7XHJcbiAgcHJpbSA9IG5ldyBybmQucmVzLnByaW0uUHJpbShcclxuICAgIE1haW5BbmltLnJuZC5nbCxcclxuICAgIFwiVHJpbWVzaFwiLFxyXG4gICAgVixcclxuICAgIEksXHJcbiAgICBNYWluQW5pbS5ybmQuc2hkcHJnXHJcbiAgKTtcclxuICBwcmltMSA9IG5ldyBybmQucmVzLnByaW0uUHJpbShcclxuICAgIE1haW5BbmltLnJuZC5nbCxcclxuICAgIFwiVHJpbWVzaFwiLFxyXG4gICAgaXBnbC5wbGF0LmdldEljb1YoKSxcclxuICAgIGlwZ2wucGxhdC5nZXRJY29JKCksXHJcbiAgICBNYWluQW5pbS5ybmQuc2hkcHJnXHJcbiAgKTtcclxuXHJcbiAgbGV0IFZTID0gbmV3IGdldERlY1YoKTtcclxuICBsZXQgSVMgPSBuZXcgZ2V0RGVjb0koKTtcclxuXHJcbiAgbGV0IExPTCA9IG5ldyBybmQucmVzLnByaW0uUHJpbShcclxuICAgIE1haW5BbmltLnJuZC5nbCxcclxuICAgIFwiTG9sXCIsXHJcbiAgICBudWxsLFxyXG4gICAgbnVsbCxcclxuICAgIE1haW5BbmltLnJuZC5zaGRwcmdcclxuICApO1xyXG4gIExPTC5hdXRvTm9ybWFscyhWUywgSVMsIDYwLCAxMDgpO1xyXG5cclxuICBwcmltMiA9IG5ldyBybmQucmVzLnByaW0uUHJpbShcclxuICAgIE1haW5BbmltLnJuZC5nbCxcclxuICAgIFwiVHJpbWVzaFwiLFxyXG4gICAgVlMsXHJcbiAgICBJUyxcclxuICAgIE1haW5BbmltLnJuZC5zaGRwcmdcclxuICApO1xyXG5cclxuICBsZXQgVlNTID0gbmV3IGlwZ2wucGxhdC5nZXRUZXRyYVYoKTtcclxuICBsZXQgSVNTID0gbmV3IGlwZ2wucGxhdC5nZXRUZXRyYUkoKTtcclxuXHJcbiAgTE9MLmF1dG9Ob3JtYWxzKFZTUywgSVNTLCAxMiwgMTIpO1xyXG5cclxuICBwcmltMyA9IG5ldyBybmQucmVzLnByaW0uUHJpbShcclxuICAgIE1haW5BbmltLnJuZC5nbCxcclxuICAgIFwiVHJpbWVzaFwiLFxyXG4gICAgVlNTLFxyXG4gICAgSVNTLFxyXG4gICAgTWFpbkFuaW0ucm5kLnNoZHByZ1xyXG4gICk7XHJcblxyXG4gIGxldCBWU1NTID0gbmV3IGlwZ2wucGxhdC5nZXRPY3RhVigpO1xyXG4gIGxldCBJU1NTID0gbmV3IGlwZ2wucGxhdC5nZXRPY3RhSSgpO1xyXG5cclxuICBMT0wuYXV0b05vcm1hbHMoVlNTUywgSVNTUywgMjQsIDI0KTtcclxuXHJcbiAgcHJpbTQgPSBuZXcgcm5kLnJlcy5wcmltLlByaW0oXHJcbiAgICBNYWluQW5pbS5ybmQuZ2wsXHJcbiAgICBcIlRyaW1lc2hcIixcclxuICAgIFZTU1MsXHJcbiAgICBJU1NTLFxyXG4gICAgTWFpbkFuaW0ucm5kLnNoZHByZ1xyXG4gICk7XHJcbn0gLy8gRW5kIG9mICdBbmltSW5pdCcgZnVuY3Rpb25cclxuXHJcbi8vIFJlbmRlciBkZWZhdWx0IGFuaW1cclxuZXhwb3J0IGZ1bmN0aW9uIEFuaW1SZW5kZXIoKSB7XHJcbiAgTWFpbkFuaW0ucmVuZGVyKCk7XHJcbiAgbGV0IG0gPSBpcGdsLm10aC5tYXQ0KCksXHJcbiAgICBtMSA9IGlwZ2wubXRoLm1hdDQoKSxcclxuICAgIG0yID0gaXBnbC5tdGgubWF0NCgpLFxyXG4gICAgbTQgPSBpcGdsLm10aC5tYXQ0KCksXHJcbiAgICBtNSA9IGlwZ2wubXRoLm1hdDQoKSxcclxuICAgIG03ID0gaXBnbC5tdGgubWF0NCgpLFxyXG4gICAgbTkgPSBpcGdsLm10aC5tYXQ0KCk7XHJcblxyXG4gIG00LnRyYW5zbGF0ZShpcGdsLm10aC52ZWMzKDEuNSwgMiwgLTIpKTtcclxuICBtNS5yb3RhdGUoTWFpbkFuaW0udGltZXIubG9jYWxUaW1lICogNTAsIGlwZ2wubXRoLnZlYzMoOCwgNCwgMikpO1xyXG4gIG0ucm90YXRlKE1haW5BbmltLnRpbWVyLmxvY2FsVGltZSAqIDUwLCBpcGdsLm10aC52ZWMzKDMsIDUsIDIpKTtcclxuICBtMS50cmFuc2xhdGUoaXBnbC5tdGgudmVjMygtMiwgMiwgLTIpKTtcclxuICBtMi5yb3RhdGUoTWFpbkFuaW0udGltZXIubG9jYWxUaW1lICogNTAsIGlwZ2wubXRoLnZlYzMoMSwgNywgNCkpO1xyXG4gIGxldCBtMyA9IG0yLm11bChtMSk7XHJcbiAgbGV0IG02ID0gbTUubXVsKG00KTtcclxuICBtNy50cmFuc2xhdGUoaXBnbC5tdGgudmVjMygtNSwgLTEsIDApKTtcclxuICBsZXQgbTggPSBtNS5tdWwobTcpO1xyXG4gIG05LnRyYW5zbGF0ZShpcGdsLm10aC52ZWMzKC0zLCAtMywgMikpO1xyXG4gIGxldCBtMTAgPSBtLm11bChtOSk7XHJcblxyXG4gIHByaW0ucHJpbURyYXcoTWFpbkFuaW0ucm5kLCBtMywgTWFpbkFuaW0ucm5kLnNoYWRlcik7XHJcbiAgcHJpbTEucHJpbURyYXcoTWFpbkFuaW0ucm5kLCBtNiwgTWFpbkFuaW0ucm5kLnNoYWRlcik7XHJcbiAgcHJpbTIucHJpbURyYXcoTWFpbkFuaW0ucm5kLCBtLCBNYWluQW5pbS5ybmQuc2hhZGVyKTtcclxuICBwcmltMy5wcmltRHJhdyhNYWluQW5pbS5ybmQsIG04LCBNYWluQW5pbS5ybmQuc2hhZGVyKTtcclxuICBwcmltNC5wcmltRHJhdyhNYWluQW5pbS5ybmQsIG0xMCwgTWFpbkFuaW0ucm5kLnNoYWRlcik7XHJcbn0gLy8gRW5kIG9mICdBbmltUmVuZGVyJyBmdW5jdGlvblxyXG5cclxuLy8gRU5EIE9GICdhbmltLmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIGluY2x1ZGVzLmpzXHJcbi8vXHJcbi8vICAgICAgQ29weXJpZ2h0IChDKSBDR1NHIG9mIFBNTDMwLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vL1xyXG4vLyBiYXNlIGluY2x1ZGVzIG9mIHByb2plY3QuXHJcbi8vXHJcblxyXG4vKiBJbXBvcnRzICovXHJcbmltcG9ydCAqIGFzIG10aCBmcm9tIFwiLi9tdGgvbXRoLmpzXCI7XHJcbmltcG9ydCAqIGFzIGFuaW0gZnJvbSBcIi4vYW5pbS9hbmltLmpzXCI7XHJcbmltcG9ydCAqIGFzIHBsYXQgZnJvbSBcIi4vdXRpbHMvcGxhdC5qc1wiO1xyXG5cclxuLyogRXhwb3J0cyAqL1xyXG5leHBvcnQgKiBhcyBtdGggZnJvbSBcIi4vbXRoL210aC5qc1wiO1xyXG5leHBvcnQgKiBhcyBhbmltIGZyb20gXCIuL2FuaW0vYW5pbS5qc1wiO1xyXG5leHBvcnQgKiBhcyBwbGF0IGZyb20gXCIuL3V0aWxzL3BsYXQuanNcIjtcclxuXHJcbi8vIEVORCBPRiAnaW5jbHVkZXMuanMnIEZJTEVcclxuIiwiLy9cclxuLy8gbWFpbi5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gbWFpbiBmaWxlIG9mIHByb2plY3QgKGZvciByb2xsdXAgYW5kIGluY2x1ZGUgdG8gaHRtbCkuXHJcbi8vXHJcbi8vIFtQVUJMSUNdXHJcbi8vXHJcblxyXG5pbXBvcnQgKiBhcyBpcGdsIGZyb20gXCIuL3NyYy9pbmNsdWRlcy5qc1wiO1xyXG5leHBvcnQgKiBhcyBpcGdsIGZyb20gXCIuL3NyYy9pbmNsdWRlcy5qc1wiO1xyXG5cclxuLy8gRXhlY3V0YWJsZSBjb2RlXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgaXBnbC5hbmltLkFuaW1Jbml0KCk7XHJcbiAgY29uc3QgUmVuZGVyaW5nID0gKCkgPT4ge1xyXG4gICAgLy8gZHJhd2luZ1xyXG4gICAgaXBnbC5hbmltLkFuaW1SZW5kZXIoKTtcclxuICAgIC8vIGFuaW1hdGlvbiByZWdpc3RlclxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShSZW5kZXJpbmcpO1xyXG4gIH07XHJcbiAgUmVuZGVyaW5nKCk7XHJcbiAgLy8gb25DbGlja0J1dHRvbigpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrQnV0dG9uKCkge1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15SW5wdXRcIik7XHJcbiAgY29uc29sZS5sb2coZWxlbWVudC52YWx1ZSk7XHJcbn1cclxuXHJcbi8vd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGV2ZW50KSA9PiB7XHJcbi8vICBpcGdsLm9uQ2xpY2soZXZlbnQpO1xyXG4vL30pO1xyXG5cclxuLy93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbi8vICBpcGdsLm9uS2V5cyhldmVudCk7XHJcbi8vfSk7XHJcblxyXG4vLyBFTkQgT0YgJ21haW4uanMnIEZJTEUuXHJcbiJdLCJuYW1lcyI6WyJpcGdsLm10aC5tYXQ0IiwiaXBnbC5tdGgudmVjMyIsImlwZ2wubXRoXHJcbiAgICAgICAgLnZlYzMiLCJyZXMuc2hkLnNoYWRlciIsInJuZC5SZW5kZXIiLCJybmQucmVzLnNoZC5zaGFkZXIiLCJybmQucmVzLnByaW0uUHJpbSIsImlwZ2wucGxhdC5nZXRJY29WIiwiaXBnbC5wbGF0LmdldEljb0kiLCJpcGdsLnBsYXQuZ2V0VGV0cmFWIiwiaXBnbC5wbGF0LmdldFRldHJhSSIsImlwZ2wucGxhdC5nZXRPY3RhViIsImlwZ2wucGxhdC5nZXRPY3RhSSIsImlwZ2wuYW5pbS5BbmltSW5pdCIsImlwZ2wuYW5pbS5BbmltUmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNBO0VBQ0E7RUFDTyxNQUFNLEtBQUssQ0FBQztFQUNuQjtFQUNBLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3ZCLElBQUksSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0VBQ3pCLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakIsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNqQixNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFBRTtFQUNyQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7RUFDN0IsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckIsT0FBTyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsT0FBTyxNQUFNO0VBQ2IsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDbkIsT0FBTztFQUNQLEtBQUssTUFBTSxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7RUFDaEMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNqQixNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakIsS0FBSyxNQUFNO0VBQ1gsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNqQixNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakIsS0FBSztFQUNMLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxNQUFNLEdBQUc7RUFDWCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0MsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sR0FBRztFQUNYLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDckIsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNyQixJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3JCLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7RUFDaEMsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLFNBQVM7RUFDdkIsTUFBTSxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2pFLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtFQUNYLElBQUksT0FBTyxJQUFJO0VBQ2YsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2pDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFD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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5QixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5QixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5QixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5QixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQ2YsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUUsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7RUFDWCxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3hFLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFO0VBQ2IsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ25CLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDakIsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xCO0VBQ0EsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNyRSxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRTtFQUNiLElBQUksSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNuQixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQ2pCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsQjtFQUNBLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckUsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7RUFDYixJQUFJLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDbkIsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUNqQixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEI7RUFDQSxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JFLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNmLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNyQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0VBQzFCLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJO0VBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDUixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRTtFQUNoQixJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSTtFQUNqQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNSLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxNQUFNLEdBQUc7RUFDWCxJQUFJO0VBQ0osTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixRQUFRLFVBQVU7RUFDbEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsU0FBUztFQUNULE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsUUFBUSxVQUFVO0VBQ2xCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFNBQVM7RUFDVCxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLFFBQVEsVUFBVTtFQUNsQixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixTQUFTO0VBQ1QsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixRQUFRLFVBQVU7RUFDbEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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O0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVO0VBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVTtFQUNqQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVO0VBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVTtFQUNqQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVO0VBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVTtFQUNqQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVO0VBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVTtFQUNqQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDNUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUk7RUFDakIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN2QixNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3ZCLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDdkIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN2QixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDeEIsTUFBTSxDQUFDLENBQUM7RUFDUixNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFD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QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLEtBQUssQ0FBQztFQUNOLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDQTtFQUNPLFNBQVMsSUFBSTtFQUNwQixFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFF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RUFDQTtFQUNBLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtFQUNuQyxNQUFNLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDckIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0QixNQUFNLE1BQU0sRUFBRSxHQUFHQyxJQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN2RSxRQUFRLEVBQUUsR0FBR0EsSUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDbkUsUUFBUSxFQUFFLEdBQUdBLElBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ25FLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNyRDtFQUNBLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztFQUNuQjtFQUNBO0VBQ0EsUUFBUSxHQUFHLEdBQUcsQ0FBQztFQUNmLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNoQjtFQUNBO0VBQ0EsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDNUI7RUFDQTtFQUNBLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVCO0VBQ0E7RUFDQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUM1QixLQUFLO0FBQ0w7RUFDQTtFQUNBLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDaEMsTUFBTSxJQUFJLENBQUMsR0FBR0MsSUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3ZELFNBQVMsU0FBUyxFQUFFLENBQUM7QUFDckI7RUFDQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6QixLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBOzs7Ozs7Ozs7RUN2TUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtFQUNBO0VBQ0EsTUFBTSxRQUFRLEdBQUcsQ0FBQztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDO0FBQ0Y7RUFDQTtFQUNBLE1BQU0sUUFBUSxHQUFHLENBQUM7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDO0FBQ0Y7RUFDQTtFQUNBLFNBQVMs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LENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUTtFQUMvRSxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRO0VBQzNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRO0VBQ3pFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUTtFQUN6RSxJQUFJLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRztFQUM3RSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUTtFQUM5RSxJQUFJLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRztFQUMzRSxJQUFJLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVE7RUFDdEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUTtFQUN4RSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPO0VBQ3JFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHO0VBQzVFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRO0VBQ3RFLElBQUksUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUTtFQUNyRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTztFQUN0RSxJQUFJLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUc7RUFDNUUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVE7RUFDdkUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRO0VBQ3pFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVE7RUFDMUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRO0VBQzFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDeEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDdkUsSUFBSSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHO0VBQzFFLElBQUksUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxRQUFRO0VBQ3RFLElBQUksUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUTtFQUN0RSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUc7RUFDOUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRO0VBQzdFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDOUUsSUFBSSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDdkUsSUFBSSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztFQUN2RSxJQUFJLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDdEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPO0VBQzNFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHO0VBQzdFLElBQUksUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVE7RUFDckUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDMUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTztFQUN0RSxJQUFJLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRztFQUM1RSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVE7RUFDM0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUc7RUFDL0UsSUFBSSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRO0VBQzFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTztFQUMzRSxJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRztFQUMzRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUTtFQUN4RSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEdBQUc7RUFDdEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPO0VBQ2xELEdBQUcsQ0FBQztFQUNKLENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxPQUFPLEdBQUc7RUFDMUIsRUFBRSxPQUFPO0VBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDNUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQzlFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUM5RSxJQUFJLEVBQUU7RUFDTixHQUFHLENBQUM7RUFDSixDQUFDO0FBQ0Q7RUFDQTtFQUNPLFNBQVMsT0FBTyxHQUFHO0VBQzFCLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztFQUMxQixFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFDMUI7RUFDQSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNkO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDbEMsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNCLElBQUksTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDL0IsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMvQixJQUFJLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLElBQUksTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ25DLElBQUksTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ25DLElBQUksTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDbkMsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFD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QUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDM0QsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQjtFQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pDO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDbEMsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ25CLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEI7RUFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNoQjtFQUNBLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNaLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNaLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNaLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNaLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNaO0VBQ0EsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUMxQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUMxQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUMxQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUMxQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUMxQixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsR0FBRztBQUNIO0VBQ0E7RUFDQTtBQUNBO0VBQ0E7QUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNBO0VBQ0EsRUFBRSxPQUFPLElBQUksQ0FBQztFQUNkLENBQUM7QUFDRDtFQUNPLFNBQVMsU0FBUyxHQUFHO0VBQzVCLEVBQUUsT0FBTztFQUNULElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQzlFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7RUFDOUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUM5RSxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ1IsR0FBRyxDQUFDO0VBQ0osQ0FBQztBQUNEO0VBQ08sU0FBUyxTQUFTLEdBQUc7RUFDNUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNoRCxDQUFDO0FBQ0Q7RUFDTyxTQUFTLFFBQVEsR0FBRztFQUMzQixFQUFFLE9BQU87RUFDVCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUMzRDtFQUNBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUMxRDtFQUNBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDekQ7RUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDMUQ7RUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDMUQ7RUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3pEO0VBQ0EsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDeEQ7RUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ3pELEdBQUcsQ0FBQztFQUNKLENBQUM7QUFDRDtFQUNPLFNBQVMsUUFBUSxHQUFHO0VBQzNCLEVBQUUsT0FBTztFQUNULElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQzVFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQ2QsR0FBRyxDQUFDO0VBQ0osQ0FBQztBQUNEO0VBQ0E7Ozs7Ozs7Ozs7Ozs7O0VDblBBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0E7QUFXQTtFQUNBO0VBQ08sSUFBSSxRQUFRLENBQUM7QUFDcEI7RUFDQTtFQUNPLE1BQU0sSUFBSSxDQUFDO0VBQ2xCLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRTtFQUN4QixJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSUksTUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ3hDO0VBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7RUFDL0MsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7RUFDN0I7RUFDQSxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsTUFBTSxHQUFHO0VBQ1gsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0VBQ3JCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUNuQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7RUFDMUIsR0FBRztFQUNILENBQUM7QUFDRDtBQUNHLE1BQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQU0sS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTTtBQUMxQztFQUNBO0VBQ08sU0FBUyxRQUFRLEdBQUc7RUFDM0I7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0E7RUFDQSxFQUFFLElBQUksQ0FBQyxHQUFHO0VBQ1YsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO0VBQy9FLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHO0VBQzFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO0VBQzdFLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztFQUMvRSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRztFQUM3RSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7RUFDNUUsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztFQUMzRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7RUFDNUUsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO0VBQzVFLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztFQUMvRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO0VBQ3hCLEdBQUcsQ0FBQztBQUNKO0VBQ0EsRUFBRSxJQUFJLENBQUMsR0FBRztFQUNWLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMs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QyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLEVBQUVBLElBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3RCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN0QixFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUNBLElBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN0QixFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUNBLElBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pDLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QjtFQUNBLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3ZELEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3hELEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3ZELEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3hELEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3pELENBQUM7QUFDRDtFQUNBOzs7Ozs7Ozs7Ozs7RUNyTEE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtBQVVBO0VBQ0E7Ozs7Ozs7OztFQ2xCQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtBQUdBO0VBQ0E7RUFDQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU07RUFDdEMsRUFBRVksUUFBa0IsRUFBRSxDQUFDO0VBQ3ZCLEVBQUUsTUFBTSxTQUFTLEdBQUcsTUFBTTtFQUMxQjtFQUNBLElBQUlDLFVBQW9CLEVBQUUsQ0FBQztFQUMzQjtFQUNBLElBQUksTUFBTSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQzVDLEdBQUcsQ0FBQztFQUNKLEVBQUUsU0FBUyxFQUFFLENBQUM7RUFDZDtFQUNBLENBQUMsQ0FBQyxDQUFDO0FBQ0g7RUFDTyxTQUFTLGFBQWEsR0FBRztFQUNoQyxFQUFFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDckQsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUM3QixDQUFDO0FBQ0Q7RUFDQTtFQUNBO0VBQ0E7QUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNBO0VBQ0E7Ozs7Ozs7Ozs7OyJ9
