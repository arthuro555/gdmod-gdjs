/*!
 * @pixi/filter-reflection - v2.5.0
 * Compiled Wed, 10 Jan 2018 17:38:59 UTC
 *
 * @pixi/filter-reflection is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("pixi.js")):"function"==typeof define&&define.amd?define(["exports","pixi.js"],n):n(e.__filters={},e.PIXI)}(this,function(e,n){"use strict";var r="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",t="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n",o=function(e){function n(n){e.call(this,r,t),Object.assign(this,{mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0},n)}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var o={mirror:{configurable:!0},boundary:{configurable:!0},amplitude:{configurable:!0},waveLength:{configurable:!0},alpha:{configurable:!0}};return n.prototype.apply=function(e,n,r,t){this.uniforms.dimensions[0]=n.sourceFrame.width,this.uniforms.dimensions[1]=n.sourceFrame.height,this.uniforms.time=this.time,e.applyFilter(this,n,r,t)},o.mirror.set=function(e){this.uniforms.mirror=e},o.mirror.get=function(){return this.uniforms.mirror},o.boundary.set=function(e){this.uniforms.boundary=e},o.boundary.get=function(){return this.uniforms.boundary},o.amplitude.set=function(e){this.uniforms.amplitude[0]=e[0],this.uniforms.amplitude[1]=e[1]},o.amplitude.get=function(){return this.uniforms.amplitude},o.waveLength.set=function(e){this.uniforms.waveLength[0]=e[0],this.uniforms.waveLength[1]=e[1]},o.waveLength.get=function(){return this.uniforms.waveLength},o.alpha.set=function(e){this.uniforms.alpha[0]=e[0],this.uniforms.alpha[1]=e[1]},o.alpha.get=function(){return this.uniforms.alpha},Object.defineProperties(n.prototype,o),n}(n.Filter);e.ReflectionFilter=o,Object.defineProperty(e,"__esModule",{value:!0})}),Object.assign(PIXI.filters,this.__filters);
//# sourceMappingURL=filter-reflection.js.map
