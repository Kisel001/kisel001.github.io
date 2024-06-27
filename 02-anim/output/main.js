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
